'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { HCaptchaField } from '@/components/auth/hcaptcha-field';
import { BrandLogo } from '@/components/ui/brand-logo';
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from '@/lib/auth/constants';
import { HCAPTCHA_SITE_KEY } from '@/lib/captcha/config';

export default function LoginView({ initialCaptchaRequired }) {
  const router = useRouter();
  const captchaRef = useRef(null);

  const [email, setEmail] = useState(DEFAULT_USER_EMAIL);
  const [password, setPassword] = useState(DEFAULT_USER_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaRequired, setCaptchaRequired] = useState(initialCaptchaRequired);
  const [captchaToken, setCaptchaToken] = useState('');

  const isFormFilled = email.trim() !== '' && password.trim() !== '';
  const isError = status === 'error';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const resetCaptcha = () => {
    setCaptchaToken('');
    captchaRef.current?.resetCaptcha();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormFilled || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          captchaToken: captchaRequired ? captchaToken : undefined,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(payload.error ?? 'Não foi possível iniciar sessão.');

        if (payload.captchaRequired) {
          setCaptchaRequired(true);
          resetCaptcha();
        }

        return;
      }

      setCaptchaRequired(false);
      router.push('/modules');
    } catch {
      setStatus('error');
      setErrorMessage('Falha de comunicação com o servidor.');
      if (captchaRequired) resetCaptcha();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative font-sans overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full pointer-events-none -z-0"
        style={{
          height: '150px',
          background:
            'linear-gradient(90deg, rgba(136, 0, 255, 0.45) 15.86%, rgba(0, 102, 255, 0.45) 62.17%, rgba(0, 178, 191, 0.45) 93.26%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      ></div>

      <div
        className={`fixed top-6 right-6 z-50 flex items-center justify-between min-w-[380px] px-4 py-3 rounded-lg bg-[#fdf3f3] border border-[#f5c2c7] text-[#e53935] shadow-sm transition-all duration-300 ease-in-out ${
          isError ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1.5C12.5 1.5 13 1.7 13.4 2L20.4 6.2C21.1 6.6 21.5 7.4 21.5 8.2V15.8C21.5 16.6 21.1 17.4 20.4 17.8L13.4 22C12.6 22.5 11.4 22.5 10.6 22L3.6 17.8C2.9 17.4 2.5 16.6 2.5 15.8V8.2C2.5 7.4 2.9 6.6 3.6 6.2L10.6 2C11 1.7 11.5 1.5 12 1.5Z" fill="#F44336" />
            <path d="M12 7V13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17.5" r="1.25" fill="white" />
          </svg>
          <span className="text-[14px]">{errorMessage}</span>
        </div>
        <button onClick={() => setStatus('idle')} className="ml-4 text-[#e53935] hover:bg-[#f8e0e0] p-1 rounded transition-colors">
          <XMarkIcon className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>
      </div>

      <main className="flex-1 flex flex-col items-center pt-24 pb-6 px-6 z-10">
        <div className="w-full max-w-[380px] flex flex-col items-center">
          <BrandLogo className="w-16 h-auto mb-4" />

          <h1 className="text-[20px] font-bold text-gray-900 mb-6 tracking-tight">
            Bem-vindo(a) de volta!
          </h1>

          <form className="w-full flex flex-col gap-[18px]" onSubmit={handleLogin}>
            <div className="relative mt-2">
              <label
                className={`absolute -top-2.5 left-3 bg-white px-1 text-[12px] font-medium transition-colors z-10 ${
                  isError ? 'text-[#d32f2f]' : 'text-gray-500'
                }`}
              >
                Login
              </label>
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3.5 bg-transparent rounded-[6px] border text-[14px] outline-none transition-colors relative z-0 ${
                  isError
                    ? 'border-[#d32f2f] focus:border-[#d32f2f] text-gray-900'
                    : 'border-gray-300 focus:border-[#673AB7] text-gray-900'
                }`}
                required
              />
            </div>

            <div className="relative mt-2">
              <label
                className={`absolute -top-2.5 left-3 bg-white px-1 text-[12px] font-medium transition-colors z-10 ${
                  isError ? 'text-[#d32f2f]' : 'text-gray-500'
                }`}
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder=""
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3.5 pr-11 bg-transparent rounded-[6px] border text-[14px] outline-none transition-colors relative z-0 text-gray-900 ${
                    isError
                      ? 'border-[#d32f2f] focus:border-[#d32f2f]'
                      : 'border-gray-300 focus:border-[#673AB7]'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                  {showPassword ? <EyeSlashIcon className="w-[18px] h-[18px]" /> : <EyeIcon className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <HCaptchaField
              captchaRequired={captchaRequired}
              siteKey={HCAPTCHA_SITE_KEY}
              captchaRef={captchaRef}
              onVerify={handleCaptchaVerify}
              onExpire={() => setCaptchaToken('')}
              onError={() => {
                setStatus('error');
                setErrorMessage('Não foi possível validar o captcha.');
                setCaptchaToken('');
              }}
            />

            <button
              type="submit"
              disabled={status === 'loading' || (captchaRequired && !captchaToken)}
              className={`w-full py-3.5 rounded-md font-semibold text-[15px] flex items-center justify-center transition-all duration-300 mt-2 ${
                isFormFilled && !isError && (!captchaRequired || captchaToken)
                  ? 'bg-[#673AB7] hover:bg-[#512DA8] text-white'
                  : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
              } ${status === 'loading' ? 'cursor-wait opacity-90' : ''}`}
            >
              {status === 'loading' ? (
                <ArrowPathIcon className="w-[18px] h-[18px] animate-spin text-gray-500" />
              ) : (
                'Acessar'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
