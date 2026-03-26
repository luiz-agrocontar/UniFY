import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/constants';

export function proxy(request) {
  const isAuthenticated = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;

  if ((pathname.startsWith('/modules') || pathname.startsWith('/tickets')) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/modules', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/modules/:path*', '/tickets/:path*'],
};
