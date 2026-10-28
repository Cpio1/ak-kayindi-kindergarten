"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/kindergarten";
import { dictionaries, isLocale, localeCookie, type Dictionary } from "@/i18n";

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persist(locale: Locale) {
  // Cookie нужен серверу, чтобы сразу отдать страницу на выбранном языке
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem(localeCookie, locale);
  } catch {
    // localStorage может быть недоступен (приватный режим) — cookie достаточно
  }
}

export function LanguageProvider({
  initialLocale,
  hasSavedChoice,
  children,
}: {
  initialLocale: Locale;
  hasSavedChoice: boolean;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Если cookie нет, но выбор сохранён в localStorage — восстанавливаем его
  useEffect(() => {
    if (hasSavedChoice) return;
    try {
      const saved = localStorage.getItem(localeCookie);
      if (isLocale(saved) && saved !== initialLocale) {
        setLocaleState(saved);
        persist(saved);
      }
    } catch {
      // нет доступа к хранилищу — остаёмся на языке по умолчанию
    }
  }, [hasSavedChoice, initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = dictionaries[locale].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dictionaries[locale].meta.description);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persist(next);
  }, []);

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
