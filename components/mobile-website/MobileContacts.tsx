"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/BrandIcons";
import { BirchLeaf } from "@/components/shared/Decor";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";

const c = kindergarten.contacts;

export function MobileContacts() {
  const { t, locale } = useLanguage();

  return (
    <section id={sectionIds.contacts} tabIndex={-1} aria-labelledby="m-contacts-title" className="py-9 outline-none">
      <div className="container-mobile">
        <Reveal>
          <p className="eyebrow">
            <BirchLeaf className="size-3.5" />
            {t.contacts.eyebrow}
          </p>
          <h2 id="m-contacts-title" className="mt-1.5 text-[28px] font-semibold leading-tight text-forest">
            {t.contacts.title}
          </h2>
          <p className="mt-2 text-[16px] text-ink-soft">{t.contacts.lead}</p>
        </Reveal>

        {/* Главные действия — сразу, крупными кнопками */}
        <Reveal className="mt-5 grid grid-cols-2 gap-2.5">
          <a href={c.phoneHref} className="btn btn-primary min-h-14">
            <Phone className="size-5" aria-hidden="true" />
            {t.ui.call}
          </a>
          <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-14 bg-white">
            <WhatsAppIcon className="size-5" />
            {t.ui.whatsapp}
          </a>
        </Reveal>

        <Reveal className="mt-4 overflow-hidden rounded-[24px] bg-white shadow-soft ring-1 ring-sage-100">
          <dl className="divide-y divide-sage-100">
            <div className="flex gap-3 p-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <dt className="text-[13px] font-bold text-ink-soft">{t.contacts.address}</dt>
                <dd className="text-[17px] font-semibold text-ink">
                  <address className="not-italic">{c.address[locale]}</address>
                </dd>
              </div>
            </div>
            <div className="flex gap-3 p-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <dt className="text-[13px] font-bold text-ink-soft">{t.contacts.phone}</dt>
                <dd>
                  <a href={c.phoneHref} className="text-[18px] font-bold tabular-nums text-forest underline decoration-sage underline-offset-4">
                    {c.phoneDisplay}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3 p-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
              <div>
                <dt className="text-[13px] font-bold text-ink-soft">{t.contacts.hours}</dt>
                <dd className="text-[17px] font-semibold text-ink">
                  {t.contacts.hoursValue}
                  <span className="block text-[15px] font-normal text-ink-soft">{t.contacts.weekend}</span>
                </dd>
              </div>
            </div>
          </dl>
        </Reveal>

        <Reveal className="relative mt-4 overflow-hidden rounded-[24px] shadow-soft ring-1 ring-sage-100">
          <MapEmbed className="h-[260px]" />
        </Reveal>
        <a href={c.twoGisHref} target="_blank" rel="noopener noreferrer" className="btn btn-sun mt-3 min-h-14 w-full">
          <Navigation className="size-5" aria-hidden="true" />
          {t.contacts.route}
        </a>
        <a
          href={c.instagramReelHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex min-h-12 items-center justify-center gap-2 text-[16px] font-semibold text-forest underline decoration-sage underline-offset-4"
        >
          <InstagramIcon className="size-5" />
          {t.contacts.instagram}
        </a>
      </div>
    </section>
  );
}
