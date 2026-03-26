'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const LogoIcon = ({ className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 111" fill="none" className={className}>
    <path d="M44.75 27.15C45.38 26.87 46.9 26.69 47.57 26.62C52.23 26.11 56.87 27.31 61.01 30.48C66.26 34.51 70.01 41.33 71.7 49.59C72.18 51.96 72.61 54.98 72.74 57.46C72.97 60.03 72.94 63.26 72.94 65.87L72.94 75.94L72.93 109.06C70.27 109.22 67.88 108.47 65.6 106.37C62.58 103.6 60.23 98.43 60.19 93.13C60.06 92.63 60.12 86.31 60.12 85.38L60.13 69.58C60.13 64.81 60.24 61.15 59.83 56.42C59.78 56.01 59.72 55.6 59.65 55.2C58.88 50.77 57.43 47.84 54.75 45.51C54.5 45.36 54.05 45.02 53.78 44.83C52.92 44.34 52.26 43.99 51.33 43.75C47.55 42.79 42.88 43.92 39.39 46.13C38.94 46.42 38.5 46.72 38.06 47.02L38.02 47.06C37.62 47.44 37.16 47.75 36.75 48.12C32.46 52.00 29.64 58.08 27.46 64.57C26.89 66.26 26.41 68.12 25.80 69.78C25.76 69.35 25.72 69.04 25.73 68.61C25.64 63.17 25.68 59.14 26.53 53.73C27.62 46.74 29.72 40.44 33.34 35.48C34.03 34.54 35.00 33.35 35.79 32.61C35.90 32.45 36.72 31.68 36.88 31.53C38.98 29.63 42.29 27.61 44.76 27.15Z" fill="url(#tealGradient)" />
    <path d="M81.29 43.31C81.31 42.97 81.35 42.55 81.39 42.21C81.86 37.98 83.48 34.21 85.88 31.73C88.04 29.50 91.34 27.95 93.99 28.62C93.93 29.24 93.96 32.57 93.97 33.42L93.97 44.22L93.96 75.67L93.96 85.85C93.96 87.63 94.00 89.78 93.94 91.55C94.05 96.06 92.92 100.45 90.79 103.73C88.56 107.21 85.70 108.98 82.45 109.10C82.15 109.11 81.84 109.11 81.54 109.11C81.40 108.96 81.23 108.72 81.10 108.54L81.10 64.87L81.11 52.06C81.11 49.29 81.06 46.02 81.29 43.31Z" fill="url(#tealGradient)" />
    <path d="M80.63 12.97C80.42 11.58 80.63 9.50 80.91 8.16C81.52 5.30 83.12 2.62 84.94 1.25C86.75 -0.12 88.86 -0.37 90.80 0.53C92.75 1.46 94.27 3.43 95.19 6.09C96.10 8.75 96.25 11.82 95.61 14.65C95.16 16.58 94.10 18.90 92.94 20.04C92.42 20.62 91.23 21.68 90.60 21.90C89.19 22.75 87.05 22.78 85.63 21.98C83.23 21.18 80.71 16.54 80.63 12.97Z" fill="url(#tealGradient)" />
    <path d="M0.02 28.45C0.57 28.41 1.13 28.35 1.68 28.36C4.74 28.48 7.64 30.35 9.77 33.56C10.42 34.54 11.73 37.12 11.89 38.42C12.11 39.09 12.35 40.20 12.45 40.94C12.58 41.70 12.72 42.78 12.74 43.56C12.88 44.79 12.90 46.72 12.91 47.98C12.92 50.11 12.93 52.25 12.92 54.38C12.92 61.41 12.86 68.59 12.92 75.60C12.95 79.91 13.15 82.47 14.42 86.43C14.83 87.45 15.14 88.13 15.65 89.07C15.85 89.38 16.06 89.69 16.26 90.00C17.35 91.45 17.56 91.43 18.70 92.49C23.41 95.42 29.42 94.30 32.39 87.73C32.64 87.18 32.86 86.60 33.09 86.03C33.10 85.83 33.52 84.45 33.61 84.11C33.82 83.29 34.00 82.45 34.17 81.61C34.55 79.70 34.89 77.63 35.30 75.75C36.93 68.30 39.62 59.83 43.46 54.25C44.87 52.17 46.55 50.50 48.39 49.34C48.59 49.21 49.23 48.80 49.42 48.80L49.37 48.89C48.76 50.48 48.17 52.08 47.79 53.83C46.93 57.81 47.04 61.64 47.01 65.71C46.97 70.68 47.17 76.23 46.84 81.15C46.35 88.34 44.56 94.91 41.24 100.30C38.47 104.74 34.90 107.96 30.94 109.58C29.82 110.05 27.68 110.72 26.51 110.77C26.06 110.97 24.01 111.02 23.46 110.99C22.99 111.00 22.56 110.98 22.08 110.95C21.45 110.95 20.22 110.78 19.60 110.62C19.05 110.57 18.05 110.26 17.50 110.10C13.70 108.99 9.26 105.75 6.56 101.60C6.11 101.01 5.67 100.27 5.28 99.61C4.90 98.99 4.55 98.33 4.23 97.64C3.94 97.21 3.19 95.34 2.99 94.80C2.79 94.29 2.66 93.92 2.48 93.39C2.27 92.76 2.06 92.04 1.87 91.40C-0.18 83.09 0.00 78.66 0.01 69.98L0.01 57.15L0.02 28.45Z" fill="url(#tealGradient)" />
    <defs>
      <linearGradient id="tealGradient" x1="0" y1="0" x2="96" y2="111" gradientUnits="userSpaceOnUse">
        <stop stopColor="#02b2b1" />
        <stop offset="1" stopColor="#0d6d67" />
      </linearGradient>
    </defs>
  </svg>
);

const LogoFull = ({ className = '' }) => (
  <div className={`flex items-end gap-1.5 ${className}`}>
    <LogoIcon className="h-10 w-auto" />
    <span className="text-[#0d6d67] font-bold tracking-[0.03em] text-[22px] leading-[1.1] mb-[3px] font-sans">ATEND</span>
  </div>
);

export default function ModuleSelector() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-['Open_Sans',_sans-serif] relative overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
        `}
      </style>

      <div
        className="absolute top-0 left-0 w-full pointer-events-none -z-0"
        style={{
          height: '240px',
          background:
            'linear-gradient(90deg, rgba(136, 0, 255, 0.25) 15.86%, rgba(0, 102, 255, 0.25) 62.17%, rgba(0, 178, 191, 0.25) 93.26%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      ></div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <div className="w-10"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors bg-white/50 hover:bg-white px-4 py-2 rounded-full shadow-sm backdrop-blur-sm border border-gray-100"
        >
          <ArrowLeftOnRectangleIcon className="w-4 h-4" />
          Sair
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pb-20">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Olá, Luiz!</h1>
          <p className="text-gray-500 text-[15px]">
            Selecione o módulo que deseja acessar para continuar.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 w-full max-w-[340px] animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#02b2b1]/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center">
            <div className="absolute -inset-10 bg-gradient-to-br from-[#02b2b1]/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 mb-6 mt-2 transform group-hover:scale-105 transition-transform duration-300">
              <LogoFull />
            </div>

            <p className="relative z-10 text-gray-500 text-[13px] leading-relaxed mb-8">
              Gestão centralizada de tickets, solicitações e atendimento ao cliente da plataforma.
            </p>

            <div
              onClick={() => router.push('/tickets')}
              className="relative z-10 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 text-[#02b2b1] font-semibold text-sm group-hover:bg-[#02b2b1] group-hover:text-white transition-colors duration-300"
            >
              Acessar Módulo
              <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 left-0 w-full flex justify-center opacity-50 pointer-events-none z-10">
        <p className="text-[11px] font-medium text-gray-500">Plataforma Unifica © 2026</p>
      </footer>
    </div>
  );
}
