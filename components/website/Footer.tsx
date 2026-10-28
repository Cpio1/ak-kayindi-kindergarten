"use client";

import Image from "next/image";
import { kindergarten } from "@/data/kindergarten";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { navItems } from "@/components/shared/sections";
import { Wave } from "@/components/shared/Decor";

const c = kindergarten.contacts;

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative" data-on-dark>
      <Wave className="block h-10 w-full" fill="var(--color-forest)" />
      <div className="bg-forest text-milk">
        <div className="container-site grid grid-cols-12 gap-8 py-10">
          <div className="col-span-4 flex items-start gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-milk/30">
              <Image src={kindergarten.images.logo.src} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-[24px] font-semibold leading-tight">«{t.name}»</p>
              <p className="text-[14px] text-milk/75">{t.kindergarten}</p>
              <p className="mt-2 font-display text-[15px] italic text-sun">{t.tagline}</p>
            </div>
          </div>

          <nav aria-label={t.ui.menu} className="col-span-3">
            <ul className="space-y-1.5">
              {navItems(t).map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="text-[15px] text-milk/85 hover:text-sun">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-5 space-y-1.5 text-[15px] text-milk/85">
            <p>{c.address[locale]}</p>
            <p>
              <a href={c.phoneHref} className="font-bold text-milk hover:text-sun">
                {c.phoneDisplay}
              </a>
            </p>
            <p>{t.contacts.hoursValue}</p>
            <p className="flex gap-4 pt-1">
              <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="underline decoration-milk/40 underline-offset-4 hover:text-sun">
                WhatsApp
              </a>
              <a href={c.twoGisHref} target="_blank" rel="noopener noreferrer" className="underline decoration-milk/40 underline-offset-4 hover:text-sun">
                2GIS
              </a>
              <a href={c.instagramReelHref} target="_blank" rel="noopener noreferrer" className="underline decoration-milk/40 underline-offset-4 hover:text-sun">
                Instagram
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-milk/15">
          <p className="container-site py-4 text-[13.5px] text-milk/65" suppressHydrationWarning>
            © {year} «{t.name}» — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
