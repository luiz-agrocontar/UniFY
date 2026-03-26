import { HCAPTCHA_SECRET_KEY } from '@/lib/captcha/config';

export async function verifyHCaptchaToken({ token, remoteIp }) {
  if (!token) return false;

  const formData = new URLSearchParams();
  formData.set('secret', HCAPTCHA_SECRET_KEY);
  formData.set('response', token);

  if (remoteIp) {
    formData.set('remoteip', remoteIp);
  }

  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
    cache: 'no-store',
  });

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.success === true;
}
