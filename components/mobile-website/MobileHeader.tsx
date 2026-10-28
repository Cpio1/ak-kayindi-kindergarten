"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Navigation, Phone, X } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { WhatsAppIcon } from "@/components/shared/BrandIcons";
import { BirchLeaf, BrandMark } from "@/components/shared/Decor";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { navItems } from "@/components/shared/sections";
import { trapFocus, useScrollLock } from "@/components/shared/useScrollLock";
import { scrollToSection } from "./scrollToSection";

const c = kindergarten.contacts;

export function MobileHeader({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      } else trapFocus(e, panelRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <div ref={panelRef}>
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-sage-100/70 bg-milk/92 backdrop-blur-md">
        <div className="container-mobile flex h-14 items-center gap-2">
          <a href="#top" onClick={(e) => go(e, "#top")} className="flex min-w-0 items-center gap-2 rounded-xl">
            <BrandMark className="size-9 shrink-0" />
            <span className="truncate font-display text-[20px] font-semibold text-forest">{t.name}</span>
          </a>
          <LanguageSwitch className="ml-auto" />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-milk"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[55] bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.nav
            key="menu"
            id="mobile-menu"
            aria-label={t.ui.menu}
            className="fixed inset-x-0 top-14 z-[58] max-h-[calc(100dvh-3.5rem)] overflow-y-auto rounded-b-[28px] bg-milk shadow-lift"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <div className="container-mobile pb-6 pt-3">
              <ul>
                {navItems(t, { withGroups: true }).map((item) => (
                  <li key={item.key} className="border-b border-sage-100 last:border-0">
                    <a
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      className="flex min-h-[54px] items-center gap-3 text-[18px] font-semibold text-ink"
                    >
                      <BirchLeaf className="size-3.5 text-sage" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a href={c.phoneHref} className="btn btn-primary">
                  <Phone className="size-4.5" aria-hidden="true" />
                  {t.ui.call}
                </a>
                <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost bg-white">
                  <WhatsAppIcon className="size-5" />
                  {t.ui.whatsapp}
                </a>
                <a href={c.twoGisHref} target="_blank" rel="noopener noreferrer" className="btn btn-sun col-span-2">
                  <Navigation className="size-4.5" aria-hidden="true" />
                  {t.contacts.route}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
