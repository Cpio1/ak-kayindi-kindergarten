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

export function MobileAbout() {
  const { t } = useLanguage();

  return (
    <section id={sectionIds.about} tabIndex={-1} aria-labelledby="m-about-title" className="bg-sage-50 outline-none">
      <div className="container-mobile py-9">
        <Reveal>
          <p className="eyebrow">
            <BirchLeaf className="size-3.5" />
            {t.about.eyebrow}
          </p>
          <h2 id="m-about-title" className="mt-1.5 text-[28px] font-semibold leading-tight text-forest">
            {t.about.title}
          </h2>
        </Reveal>

        <Reveal className="relative mt-5">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[28px] rounded-tl-[64px] shadow-lift">
            <Image src={about.src} alt={t.about.imageAlt} fill sizes="(max-width: 640px) 92vw, 600px" className="object-cover object-[50%_45%]" />
          </div>
          <figure className="relative -mt-8 ml-auto mr-3 flex w-fit max-w-[92%] items-center gap-3 rounded-[20px] bg-white p-2 pr-4 shadow-lift">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-[15px]">
              <Image src={director.src} alt={t.about.directorAlt} fill sizes="56px" className="object-cover object-[50%_25%]" />
            </div>
            <figcaption className="leading-tight">
              <span className="block font-display text-[16px] font-semibold text-forest">{kindergarten.director}</span>
              <span className="mt-0.5 block text-[13px] font-semibold text-ink-soft">{t.about.directorRole}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">{t.about.text}</p>
        </Reveal>

        <Stagger as="ul" className="mt-6 grid grid-cols-2 gap-2.5">
          {factKeys.map((key) => (
            <StaggerItem as="li" key={key} className="rounded-[20px] bg-white px-4 py-3.5 shadow-soft ring-1 ring-sage-100">
              <span className="block font-display text-[21px] font-semibold leading-tight text-forest">{t.about.facts[key].value}</span>
              <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{t.about.facts[key].label}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <h3 className="mt-8 text-[21px] font-semibold text-forest">{t.about.valuesTitle}</h3>
        <Stagger as="ul" className="mt-3 space-y-2.5">
          {valueKeys.map((key) => {
            const Icon = valueIcons[key];
            return (
              <StaggerItem as="li" key={key} className="flex items-start gap-3 rounded-[20px] bg-milk/80 p-3.5 ring-1 ring-sage-100">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-forest">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-ink">{t.about.values[key].title}</span>
                  <span className="block text-[16px] leading-snug text-ink-soft">{t.about.values[key].text}</span>
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
      <Wave className="block h-7 w-full" fill="var(--color-milk)" />
    </section>
  );
}
