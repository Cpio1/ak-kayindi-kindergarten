"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navigation, Phone } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { WhatsAppIcon } from "@/components/shared/BrandIcons";
import { useLanguage } from "@/components/shared/LanguageProvider";

const c = kindergarten.contacts;

// Нижняя панель быстрых действий: появляется после первого экрана,
// прячется под открытым меню (lightbox и так лежит выше по z-index)
export function MobileActionBar({ hidden }: { hidden: boolean }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-[13px] font-bold";

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <nav
            aria-label={t.contacts.eyebrow}
            className="mx-auto flex max-w-md gap-1.5 rounded-[22px] bg-white/95 p-1.5 shadow-lift ring-1 ring-sage-100 backdrop-blur"
          >
            <a href={c.phoneHref} className={`${item} bg-forest text-milk`}>
              <Phone className="size-5" aria-hidden="true" />
              {t.ui.call}
            </a>
            <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${item} bg-sage-50 text-forest`}>
              <WhatsAppIcon className="size-5" />
              {t.ui.whatsapp}
            </a>
            <a href={c.twoGisHref} target="_blank" rel="noopener noreferrer" className={`${item} bg-sun-50 text-ink`}>
              <Navigation className="size-5" aria-hidden="true" />
              {t.ui.route}
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
