"use client";

import type { Locale } from "@/data/kindergarten";
import { useLanguage } from "./LanguageProvider";

const options: { value: Locale; label: string; full: string }[] = [
  { value: "kk", label: "ҚАЗ", full: "Қазақша" },
  { value: "ru", label: "РУС", full: "Русский" },
];

export function LanguageSwitch({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const { locale, setLocale, t } = useLanguage();
  const pad = size === "lg" ? "min-h-11 px-4 text-[15px]" : "min-h-9 px-3 text-[13px]";

  return (
    <div
      role="group"
      aria-label={t.ui.language}
      className={`inline-flex items-center rounded-full bg-sage-50 p-1 ring-1 ring-sage-100 ${className}`}
    >
      {options.map((o) => {
        const active = o.value === locale;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLocale(o.value)}
            className={`${pad} rounded-full font-bold tracking-wide transition-colors ${
              active ? "bg-forest text-milk shadow-sm" : "text-forest hover:bg-sage-100"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
