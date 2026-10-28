"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, CalendarHeart, Clock } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchBranch, BirchLeaf, Cloud, Sun, Wave } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { sectionIds } from "@/components/shared/sections";

const ease = [0.22, 1, 0.36, 1] as const;
const { hero } = kindergarten.images;

export function MobileHero() {
  const { t } = useLanguage();

  return (
    <section id="top" tabIndex={-1} className="relative overflow-hidden pt-14 outline-none">
      <Cloud className="pointer-events-none absolute -left-6 top-20 w-20 opacity-80" />

      <div className="container-mobile pb-8 pt-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <p className="eyebrow rounded-full bg-sage-50 px-3 py-1 ring-1 ring-sage-100">
            <BirchLeaf className="size-3.5" />
            {t.kindergarten}
          </p>
          <h1 className="mt-3">
            <span className="block font-display text-[44px] font-semibold leading-none text-forest sm:text-[52px]">
              {t.name}
            </span>
            <span className="mt-2.5 block font-display text-[24px] font-medium italic leading-tight text-ink sm:text-[28px]">
              {t.hero.title}
            </span>
          </h1>
        </motion.div>

        {/* Фото на первом экране — сразу после заголовка */}
        <motion.div
          className="relative mx-auto mt-5 aspect-square w-[min(80%,400px)]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
        >
          <div className="blob-alt absolute -inset-2.5 rotate-6 bg-sage/45" aria-hidden="true" />
          <div className="blob absolute inset-0 overflow-hidden shadow-lift ring-4 ring-white">
            <Image
              src={hero.src}
              alt={t.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 92vw, 420px"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <Sun className="absolute -right-2 -top-4 size-16" />
          <BirchBranch className="pointer-events-none absolute -bottom-6 -left-8 w-36 -rotate-6" />
          <span className="absolute left-0 top-5 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 text-[13px] font-bold text-forest shadow-soft">
            <CalendarHeart className="size-4" aria-hidden="true" />
            {t.hero.since}
          </span>
          <span className="absolute bottom-7 right-0 flex items-center gap-1.5 rounded-xl bg-sun px-2.5 py-1.5 text-[13px] font-bold text-ink shadow-soft">
            <Clock className="size-4" aria-hidden="true" />
            {t.hero.hours}
          </span>
        </motion.div>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <a href={`#${sectionIds.contacts}`} className="btn btn-primary min-h-[52px] w-full sm:w-auto">
            {t.hero.primary}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a href={`#${sectionIds.about}`} className="btn btn-ghost min-h-[52px] w-full sm:w-auto">
            {t.hero.secondary}
          </a>
        </div>

        <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">{t.hero.lead}</p>
      </div>

      <Wave className="block h-7 w-full" fill="var(--color-sage-50)" />
    </section>
  );
}
