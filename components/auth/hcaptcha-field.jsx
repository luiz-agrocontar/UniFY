'use client';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

export function HCaptchaField({
  captchaRequired,
  siteKey,
  captchaRef,
  onVerify,
  onExpire,
  onError,
}) {
  if (!captchaRequired) {
    return (
      <div className="mt-2 mb-2 flex justify-center">
        <div className="flex items-center gap-3 w-[302px] min-h-[76px] bg-[#f6fffb] border border-[#b7ebd6] rounded-[6px] px-4 py-4 shadow-sm">
          <ShieldCheckIcon className="w-7 h-7 text-[#02b2b1]" />
          <div className="flex flex-col">
            <span className="text-[14px] text-[#222] font-medium">Captcha validado</span>
            <span className="text-[12px] text-[#5b6470]">Durante 1 hora nesta sessão do navegador.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 mb-2 flex justify-center">
      <div className="flex items-center justify-center w-[302px] min-h-[96px] bg-[#fafafa] border border-[#d3d3d3] rounded-[6px] px-3 py-3 shadow-sm overflow-hidden">
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
        />
      </div>
    </div>
  );
}
