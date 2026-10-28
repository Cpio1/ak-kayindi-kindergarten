"use client";

import Image from "next/image";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf, Wave } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";
import { valueIcons, valueKeys } from "@/components/shared/icons";

const { about, director } = kindergarten.images;
const factKeys = ["founded", "groups", "ages", "hours"] as const;

export function About() {
  const { t } = useLanguage();

  return (
    <section id={sectionIds.about} aria-labelledby="about-title" className="relative bg-sage-50">
      <div className="container-site grid grid-cols-12 items-center gap-10 py-14 xl:gap-14 xl:py-16">
        {/* Фото с подписью руководителя */}
        <Reveal className="relative col-span-5">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[36px] rounded-tl-[90px] shadow-lift">
            <Image
              src={about.src}
              alt={t.about.imageAlt}
              fill
              sizes="(max-width: 1280px) 40vw, 480px"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <figure className="absolute -bottom-8 right-6 flex items-center gap-3 rounded-[22px] bg-white p-2.5 pr-5 shadow-lift">
            <div className="relative size-16 overflow-hidden rounded-[18px]">
              <Image src={director.src} alt={t.about.directorAlt} fill sizes="64px" className="object-cover object-[50%_25%]" />
            </div>
            <figcaption className="leading-tight">
              <span className="block font-display text-[17px] font-semibold text-forest">{kindergarten.director}</span>
              <span className="mt-1 block text-[13px] font-semibold text-ink-soft">{t.about.directorRole}</span>
            </figcaption>
          </figure>
          <BirchLeaf className="absolute -left-4 -top-5 size-10 -rotate-[24deg] text-sage" />
        </Reveal>

        <div className="col-span-7">
          <Reveal>
            <p className="eyebrow">
              <BirchLeaf className="size-3.5" />
              {t.about.eyebrow}
            </p>
            <h2 id="about-title" className="mt-2 max-w-xl text-[34px] font-semibold leading-tight text-forest xl:text-[38px]">
              {t.about.title}
            </h2>
            <p className="mt-4 max-w-[38rem] text-[17px] leading-relaxed text-ink-soft">{t.about.text}</p>
          </Reveal>

          {/* Ключевые факты — компактной лентой */}
          <Stagger as="ul" className="mt-7 grid grid-cols-4 overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-sage-100">
            {factKeys.map((key, i) => (
              <StaggerItem
                as="li"
                key={key}
                className={`px-4 py-4 ${i > 0 ? "border-l border-dashed border-sage-100" : ""}`}
              >
                <span className="block font-display text-[22px] font-semibold leading-tight text-forest">
                  {t.about.facts[key].value}
                </span>
                <span className="mt-1 block text-[14px] leading-snug text-ink-soft">{t.about.facts[key].label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* Ценности — отдельной строкой под основным блоком */}
      <div className="container-site pb-14 xl:pb-16">
        <Reveal>
          <h3 className="text-[22px] font-semibold text-forest">{t.about.valuesTitle}</h3>
        </Reveal>
        <Stagger as="ul" className="mt-4 grid grid-cols-4 gap-4">
          {valueKeys.map((key) => {
            const Icon = valueIcons[key];
            return (
              <StaggerItem
                as="li"
                key={key}
                className="group flex gap-3 rounded-[22px] bg-milk/70 p-4 ring-1 ring-sage-100 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-forest transition group-hover:bg-sun">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold leading-snug text-ink">{t.about.values[key].title}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-ink-soft">{t.about.values[key].text}</span>
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <Wave className="block h-10 w-full" fill="var(--color-milk)" />
    </section>
  );
}
