"use client";

import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf, Sun } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";
import { directionIcons, directionKeys, groupIcons, infoIcons } from "@/components/shared/icons";

export function MobileLife() {
  const { t } = useLanguage();
  const { schedule } = kindergarten;
  const ScheduleIcon = infoIcons.schedule;
  const NutritionIcon = infoIcons.nutrition;
  const TransportIcon = infoIcons.transport;

  return (
    <section id={sectionIds.life} tabIndex={-1} aria-labelledby="m-life-title" className="py-9 outline-none">
      <div className="container-mobile">
        <Reveal>
          <p className="eyebrow">
            <BirchLeaf className="size-3.5" />
            {t.life.eyebrow}
          </p>
          <h2 id="m-life-title" className="mt-1.5 text-[28px] font-semibold leading-tight text-forest">
            {t.life.title}
          </h2>
          <p className="mt-3 text-[16.5px] leading-relaxed text-ink-soft">{t.life.lead}</p>
        </Reveal>

        {/* Направления — компактный список: иконка слева, текст справа */}
        <Stagger as="ul" className="mt-6 grid gap-x-6 sm:grid-cols-2">
          {directionKeys.map((key, i) => {
            const Icon = directionIcons[key];
            return (
              <StaggerItem as="li" key={key} className="flex gap-3.5 border-t border-sage-100 py-4">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-[14px] ${
                    i % 3 === 1 ? "bg-sun-50 text-[#8a6d1d]" : "bg-sage-50 text-forest"
                  }`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[17px] font-bold leading-snug text-ink">{t.life.directions[key].title}</span>
                  <span className="mt-0.5 block text-[16px] leading-snug text-ink-soft">{t.life.directions[key].text}</span>
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Группы — вертикальная «берёзовая» шкала возраста */}
        <div id={sectionIds.groups} tabIndex={-1} className="mt-8 outline-none">
          <Reveal>
            <h3 className="text-[24px] font-semibold text-forest">{t.life.groupsTitle}</h3>
            <p className="mt-1 text-[16px] text-ink-soft">{t.life.groupsLead}</p>
          </Reveal>
          <div className="relative mt-5 pl-7">
            <span className="absolute bottom-3 left-[9px] top-3 w-[5px] rounded-full bg-white shadow-[inset_0_0_0_1px_rgb(41_53_46/0.12)]" aria-hidden="true">
              {[12, 30, 52, 74, 90].map((top) => (
                <span key={top} className="absolute left-0 h-[3px] w-full rounded-full bg-bark" style={{ top: `${top}%` }} />
              ))}
            </span>
            <Stagger as="ul" className="space-y-4">
            {kindergarten.groups.map((group) => {
              const Icon = groupIcons[group.icon];
              const copy = t.life.groups[group.id];
              return (
                <StaggerItem as="li" key={group.id} className="relative">
                    <span className="absolute -left-7 top-6 size-[23px] rounded-full border-4 border-milk bg-forest" aria-hidden="true" />
                    <div className="rounded-[24px] bg-white p-4.5 shadow-soft ring-1 ring-sage-100">
                      <div className="flex items-center gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sage-50 text-forest">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-display text-[21px] font-semibold leading-tight text-forest">«{group.name}»</h4>
                          <p className="text-[14px] font-semibold text-ink-soft">{copy.level}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-forest px-3 py-1.5 font-display text-[15px] font-semibold text-milk">
                          {t.life.ages(group.ages.from, group.ages.to)}
                        </span>
                      </div>
                      <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{copy.text}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {copy.tags.map((tag) => (
                          <li key={tag} className="rounded-full bg-sage-50 px-2.5 py-1 text-[13.5px] font-semibold text-forest">
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

        {/* Режим — заметный блок, питание и развозка — компактная пара */}
        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
          <StaggerItem className="relative overflow-hidden rounded-[24px] bg-forest p-5 text-milk sm:col-span-2" data-on-dark>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-milk/12 text-sun">
                <ScheduleIcon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-[21px] font-semibold">{t.life.schedule.title}</h3>
            </div>
            <p className="mt-3 text-[16px] text-milk/85">{t.life.schedule.days}</p>
            <p className="font-display text-[30px] font-semibold leading-tight text-sun">
              {schedule.open}–{schedule.close}
            </p>
            <p className="mt-1 text-[15px] text-milk/75">{t.life.schedule.weekend}</p>
          </StaggerItem>
          <StaggerItem className="relative overflow-hidden rounded-[24px] bg-sun-50 p-5">
            <Sun className="absolute -right-5 -top-5 size-20 opacity-70" />
            <span className="relative flex size-10 items-center justify-center rounded-xl bg-white text-[#8a6d1d]">
              <NutritionIcon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-[21px] font-semibold text-ink">{t.life.nutrition.title}</h3>
            <p className="mt-1 text-[16px] leading-relaxed text-ink-soft">{t.life.nutrition.text}</p>
          </StaggerItem>
          <StaggerItem className="rounded-[24px] bg-sage-50 p-5 ring-1 ring-sage-100">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white text-forest">
              <TransportIcon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-display text-[21px] font-semibold text-ink">{t.life.transport.title}</h3>
            <p className="mt-1 text-[16px] leading-relaxed text-ink-soft">{t.life.transport.text}</p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
