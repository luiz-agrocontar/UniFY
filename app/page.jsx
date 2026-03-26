import { cookies } from 'next/headers';
import LoginView from '@/components/auth/login-view';
import { CAPTCHA_COOKIE_NAME } from '@/lib/auth/constants';

export default async function Page() {
  const cookieStore = await cookies();
  const initialCaptchaRequired = !cookieStore.get(CAPTCHA_COOKIE_NAME)?.value;

  return <LoginView initialCaptchaRequired={initialCaptchaRequired} />;
}
