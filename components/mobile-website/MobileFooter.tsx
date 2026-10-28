"use client";

import Image from "next/image";
import { kindergarten } from "@/data/kindergarten";
import { Wave } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { navItems } from "@/components/shared/sections";
import { scrollToSection } from "./scrollToSection";

const c = kindergarten.contacts;

export function MobileFooter() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer data-on-dark>
      <Wave className="block h-7 w-full" fill="var(--color-forest)" />
      {/* Нижний отступ — под панель быстрых действий */}
      <div className="bg-forest pb-28 text-milk">
        <div className="container-mobile pt-6">
          <div className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-milk/30">
              <Image src={kindergarten.images.logo.src} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-[22px] font-semibold leading-tight">«{t.name}»</p>
              <p className="font-display text-[15px] italic text-sun">{t.tagline}</p>
            </div>
          </div>

          <nav aria-label={t.ui.menu} className="mt-6">
            <ul className="grid grid-cols-2 gap-x-4">
              {navItems(t, { withGroups: true }).map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="flex min-h-11 items-center text-[16px] text-milk/85"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 space-y-1 border-t border-milk/15 pt-5 text-[16px] text-milk/85">
            <p>{c.address[locale]}</p>
            <p>
              <a href={c.phoneHref} className="font-bold text-milk">
                {c.phoneDisplay}
              </a>
            </p>
            <p>{t.contacts.hoursValue}</p>
          </div>
          <p className="mt-5 text-[14px] text-milk/60" suppressHydrationWarning>
            © {year} «{t.name}» — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
