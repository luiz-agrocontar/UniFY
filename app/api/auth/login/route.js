import { NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE,
  CAPTCHA_COOKIE_NAME,
  CAPTCHA_MAX_AGE,
} from '@/lib/auth/constants';
import { authenticateUser } from '@/lib/auth/server';
import { verifyHCaptchaToken } from '@/lib/captcha/server';

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 });
  }

  const email = String(payload?.email ?? '').trim();
  const password = String(payload?.password ?? '');
  const captchaToken = typeof payload?.captchaToken === 'string' ? payload.captchaToken : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Informe utilizador e senha.' }, { status: 400 });
  }

  const now = Date.now();
  const captchaCookieValue = Number(request.cookies.get(CAPTCHA_COOKIE_NAME)?.value ?? 0);
  const hasValidCaptchaCookie = Number.isFinite(captchaCookieValue) && captchaCookieValue > now;

  if (!hasValidCaptchaCookie) {
    const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const captchaIsValid = await verifyHCaptchaToken({ token: captchaToken, remoteIp });

    if (!captchaIsValid) {
      return NextResponse.json(
        {
          error: 'Valide o captcha para continuar.',
          captchaRequired: true,
        },
        { status: 400 },
      );
    }
  }

  const authResult = await authenticateUser({ email, password });

  if (!authResult.success) {
    return NextResponse.json(
      {
        error: authResult.error,
        captchaRequired: !hasValidCaptchaCookie,
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    ok: true,
    captchaVerifiedUntil: hasValidCaptchaCookie ? captchaCookieValue : now + CAPTCHA_MAX_AGE * 1000,
    source: authResult.user.source,
  });

  response.cookies.set(AUTH_COOKIE_NAME, authResult.user.email, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_SESSION_MAX_AGE,
  });

  if (!hasValidCaptchaCookie) {
    response.cookies.set(CAPTCHA_COOKIE_NAME, String(now + CAPTCHA_MAX_AGE * 1000), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: CAPTCHA_MAX_AGE,
    });
  }

  return response;
}
