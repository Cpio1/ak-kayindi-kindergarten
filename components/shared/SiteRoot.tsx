"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { Website } from "@/components/website/Website";
import { MobileWebsite } from "@/components/mobile-website/MobileWebsite";
import { useLanguage } from "./LanguageProvider";

type Variant = "desktop" | "mobile";

// Граница между мобильной и компьютерной композицией
const MOBILE_QUERY = "(max-width: 1023.98px)";

export function SiteRoot({ initialVariant }: { initialVariant: Variant }) {
  const [variant, setVariant] = useState<Variant>(initialVariant);
  const { t } = useLanguage();

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setVariant(mq.matches ? "mobile" : "desktop");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:font-bold focus:text-milk"
      >
        {t.ui.skipToContent}
      </a>
      {variant === "mobile" ? <MobileWebsite /> : <Website />}
    </MotionConfig>
  );
}
