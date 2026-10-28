"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, CalendarHeart, Clock } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchBranch, BirchLeaf, BirchTrunk, Cloud, Sun, Wave } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { sectionIds } from "@/components/shared/sections";

const ease = [0.22, 1, 0.36, 1] as const;
const { hero } = kindergarten.images;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <Cloud className="pointer-events-none absolute left-[3%] top-24 w-24 opacity-80" />
      <BirchTrunk className="pointer-events-none absolute -left-1 bottom-16 h-72 w-5 opacity-70" />

      <div className="container-site grid grid-cols-12 items-center gap-8 pb-16 pt-8 xl:pb-20 xl:pt-10">
        <motion.div
          className="col-span-6 xl:col-span-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="eyebrow rounded-full bg-sage-50 px-3.5 py-1.5 ring-1 ring-sage-100">
            <BirchLeaf className="size-3.5 text-forest" />
            {t.kindergarten}
          </p>

          <h1 className="mt-5">
            <span className="block font-display text-[56px] font-semibold leading-none text-forest xl:text-[64px]">
              {t.name}
            </span>
            <span className="mt-4 block max-w-[30rem] font-display text-[30px] font-medium italic leading-[1.2] text-ink xl:text-[34px]">
              {t.hero.title}
            </span>
          </h1>

          <p className="mt-5 max-w-[32rem] text-[17px] leading-relaxed text-ink-soft">{t.hero.lead}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={`#${sectionIds.contacts}`} className="btn btn-primary">
              {t.hero.primary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href={`#${sectionIds.about}`} className="btn btn-ghost">
              {t.hero.secondary}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative col-span-6 justify-self-end xl:col-span-6"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <div className="relative size-[min(440px,40vw)] xl:size-[470px]">
            <div className="blob-alt absolute -inset-4 rotate-6 bg-sage/45" aria-hidden="true" />
            <div className="blob absolute inset-0 overflow-hidden shadow-lift ring-[6px] ring-white">
              <Image
                src={hero.src}
                alt={t.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 40vw, 470px"
                className="object-cover object-[50%_45%]"
              />
            </div>
            <Sun className="absolute -right-5 -top-6 size-20" />
            <BirchBranch className="pointer-events-none absolute -bottom-10 -left-24 w-52 -rotate-6" />

            <div className="absolute -left-10 top-10 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[14px] font-bold text-forest shadow-soft">
              <CalendarHeart className="size-4.5 text-forest" aria-hidden="true" />
              {t.hero.since}
            </div>
            <div className="absolute -right-6 bottom-12 flex items-center gap-2 rounded-2xl bg-sun px-3.5 py-2.5 text-[14px] font-bold text-ink shadow-soft">
              <Clock className="size-4.5" aria-hidden="true" />
              {t.hero.hours}
            </div>
          </div>
        </motion.div>
      </div>

      <Wave className="block h-10 w-full text-sage-50 xl:h-14" fill="var(--color-sage-50)" />
    </section>
  );
}
