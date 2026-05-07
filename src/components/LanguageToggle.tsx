"use client";

import { useLanguage } from "@/src/components/LanguageProvider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed right-3 top-3 z-50 inline-flex rounded-full border border-pink-100 bg-pink-50 p-1 shadow-sm">
      <button
        type="button"
        onClick={() => setLanguage("ko")}
        className={`rounded-full px-3 py-1 text-xs transition ${
          language === "ko"
            ? "bg-white font-semibold text-purple-600 shadow-sm"
            : "text-gray-500 hover:text-purple-500"
        }`}
      >
        Korean
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-xs transition ${
          language === "en"
            ? "bg-white font-semibold text-purple-600 shadow-sm"
            : "text-gray-500 hover:text-purple-500"
        }`}
      >
        English
      </button>
    </div>
  );
}
