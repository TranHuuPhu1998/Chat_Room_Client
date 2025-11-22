// path: src/components/BeautifulFullscreenLoader.jsx
import React from "react";
import { MessageCircle } from "lucide-react";

export default function BeautifulFullscreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-colors">
      
      {/* Soft glow & floating icon */}
      <div className="relative flex items-center justify-center">
        
        {/* Soft glow behind icon */}
        <div className="absolute h-20 w-20 rounded-full bg-sky-500/10 blur-xl animate-pulse" />

        {/* Chat Icon */}
        <MessageCircle
          className="h-12 w-12 text-sky-600 dark:text-sky-300 animate-[float_2.2s_ease-in-out_infinite,fade_1.6s_ease-in-out_infinite]"
          strokeWidth={1.6}
        />
      </div>

      {/* Message */}
      <p className="mt-5 text-base font-medium text-slate-700 dark:text-slate-300 tracking-wide">
        Đang tải…
      </p>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fade {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(0.98); }
        }
      `}</style>
    </div>
  );
}
