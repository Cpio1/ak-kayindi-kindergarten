"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { BrandMark } from "@/components/shared/Decor";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { navItems, sectionIds } from "@/components/shared/sections";

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-milk/90 shadow-[0_1px_0_rgb(41_53_46/0.08)] backdrop-blur-md" : "bg-milk/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-site flex h-16 items-center gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 rounded-xl">
          <BrandMark className="size-10" />
          <span className="leading-none">
            <span className="block font-display text-[21px] font-semibold text-forest">{t.name}</span>
            <span className="mt-1 block text-[12px] font-semibold text-ink-soft">{t.kindergarten}</span>
          </span>
        </a>

        <nav aria-label={t.ui.menu} className="mx-auto">
          <ul className="flex items-center gap-1">
            {navItems(t).map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-[15px] font-semibold text-ink/85 transition-colors hover:bg-sage-50 hover:text-forest xl:px-3.5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitch />
          <a href={`#${sectionIds.contacts}`} className="btn btn-primary min-h-10 px-4 text-[15px]">
            <Phone className="size-4" aria-hidden="true" />
            {t.ui.contact}
          </a>
        </div>
      </div>
    </header>
  );
}
