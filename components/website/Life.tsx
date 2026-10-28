"use client";

import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf, BirchTrunk, Sun } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";
import { directionIcons, directionKeys, groupIcons, infoIcons } from "@/components/shared/icons";

// Цвет «пятна» за иконкой группы — чтобы три карточки не были одинаковыми
const groupTone = {
  balapan: "bg-sun-50 text-[#8a6d1d]",
  klubnichka: "bg-sage-100 text-forest",
  romashka: "bg-white text-forest ring-1 ring-sage-100",
} as const;

export function Life() {
  const { t } = useLanguage();
  const { schedule } = kindergarten;

  return (
    <section id={sectionIds.life} aria-labelledby="life-title" className="relative overflow-hidden py-14 xl:py-16">
      <BirchTrunk className="pointer-events-none absolute -right-1 top-24 h-64 w-5 opacity-60" />

      <div className="container-site">
        {/* Заголовок с асимметричным вступлением */}
        <Reveal className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-5">
            <p className="eyebrow">
              <BirchLeaf className="size-3.5" />
              {t.life.eyebrow}
            </p>
            <h2 id="life-title" className="mt-2 text-[34px] font-semibold leading-tight text-forest xl:text-[38px]">
              {t.life.title}
            </h2>
          </div>
          <p className="col-span-6 col-start-7 text-[17px] leading-relaxed text-ink-soft">{t.life.lead}</p>
        </Reveal>

        {/* Направления занятий — текстовая композиция без тяжёлых карточек */}
        <Stagger as="ul" className="mt-9 grid grid-cols-3 gap-x-10 gap-y-7">
          {directionKeys.map((key, i) => {
            const Icon = directionIcons[key];
            return (
              <StaggerItem as="li" key={key} className="group flex gap-4 border-t border-sage-100 pt-5">
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-[16px] transition-transform group-hover:-rotate-6 ${
                    i % 3 === 1 ? "bg-sun-50 text-[#8a6d1d]" : "bg-sage-50 text-forest"
                  }`}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[18px] font-bold leading-snug text-ink">{t.life.directions[key].title}</span>
                  <span className="mt-1 block text-[15.5px] leading-snug text-ink-soft">{t.life.directions[key].text}</span>
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Группы на «возрастной ветке» */}
        <div id={sectionIds.groups} className="mt-14 scroll-mt-20">
          <Reveal className="flex items-end justify-between gap-6">
            <h3 className="text-[28px] font-semibold text-forest">{t.life.groupsTitle}</h3>
            <p className="text-[16px] text-ink-soft">{t.life.groupsLead}</p>
          </Reveal>

          <div className="relative mt-6">
            <div className="birch-line absolute inset-x-6 top-[30px]" aria-hidden="true" />
            <Stagger as="ul" className="relative grid grid-cols-3 gap-6">
              {kindergarten.groups.map((group) => {
                const Icon = groupIcons[group.icon];
                const copy = t.life.groups[group.id];
                return (
                  <StaggerItem as="li" key={group.id} className="flex flex-col">
                    <span className="ml-5 inline-flex h-[60px] w-fit items-center gap-2 rounded-full bg-forest px-5 font-display text-[19px] font-semibold text-milk shadow-soft">
                      {t.life.ages(group.ages.from, group.ages.to)}
                    </span>
                    <div className="mt-4 flex flex-1 flex-col rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-sage-100 transition hover:-translate-y-1 hover:shadow-lift">
                      <div className="flex items-center gap-3">
                        <span className={`flex size-12 items-center justify-center rounded-2xl ${groupTone[group.id]}`}>
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="font-display text-[22px] font-semibold leading-tight text-forest">«{group.name}»</h4>
                          <p className="text-[14px] font-semibold text-ink-soft">{copy.level}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">{copy.text}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {copy.tags.map((tag) => (
                          <li key={tag} className="rounded-full bg-sage-50 px-2.5 py-1 text-[13px] font-semibold text-forest">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>

        {/* Питание, режим, развозка — три разных по характеру блока */}
        <Stagger className="mt-10 grid grid-cols-[1fr_1.15fr_1fr] gap-5">
          <StaggerItem className="relative overflow-hidden rounded-[28px] bg-sun-50 p-6">
            <Sun className="absolute -right-6 -top-6 size-24 opacity-70" />
            <InfoIcon icon="nutrition" className="bg-white text-[#8a6d1d]" />
            <h3 className="mt-4 font-display text-[22px] font-semibold text-ink">{t.life.nutrition.title}</h3>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-soft">{t.life.nutrition.text}</p>
          </StaggerItem>

          <StaggerItem className="relative overflow-hidden rounded-[28px] bg-forest p-6 text-milk" data-on-dark>
            <BirchLeaf className="absolute -bottom-3 right-6 size-16 rotate-12 text-milk/10" />
            <InfoIcon icon="schedule" className="bg-milk/12 text-sun" />
            <h3 className="mt-4 font-display text-[22px] font-semibold">{t.life.schedule.title}</h3>
            <p className="mt-1.5 text-[15.5px] text-milk/85">{t.life.schedule.days}</p>
            <p className="font-display text-[30px] font-semibold leading-tight text-sun">
              {schedule.open}–{schedule.close}
            </p>
            <p className="mt-1 text-[14.5px] text-milk/75">{t.life.schedule.weekend}</p>
          </StaggerItem>

          <StaggerItem className="relative overflow-hidden rounded-[28px] bg-sage-50 p-6 ring-1 ring-sage-100">
            <InfoIcon icon="transport" className="bg-white text-forest" />
            <h3 className="mt-4 font-display text-[22px] font-semibold text-ink">{t.life.transport.title}</h3>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-soft">{t.life.transport.text}</p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function InfoIcon({ icon, className }: { icon: keyof typeof infoIcons; className: string }) {
  const Icon = infoIcons[icon];
  return (
    <span className={`relative flex size-11 items-center justify-center rounded-2xl ${className}`}>
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}
