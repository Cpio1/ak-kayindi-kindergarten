"use client";

import { Bus, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/BrandIcons";
import { BirchBranch, BirchLeaf } from "@/components/shared/Decor";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";

const c = kindergarten.contacts;

export function Contacts() {
  const { t, locale } = useLanguage();

  return (
    <section id={sectionIds.contacts} aria-labelledby="contacts-title" className="relative overflow-hidden py-14 xl:py-16">
      <BirchBranch className="pointer-events-none absolute -left-10 top-6 w-56 rotate-[8deg] opacity-80" />

      <div className="container-site grid grid-cols-12 items-stretch gap-10">
        <Reveal className="col-span-5 flex flex-col">
          <p className="eyebrow">
            <BirchLeaf className="size-3.5" />
            {t.contacts.eyebrow}
          </p>
          <h2 id="contacts-title" className="mt-2 text-[34px] font-semibold leading-tight text-forest xl:text-[38px]">
            {t.contacts.title}
          </h2>
          <p className="mt-3 text-[16.5px] text-ink-soft">{t.contacts.lead}</p>

          <dl className="mt-6 space-y-3">
            <Row icon={<MapPin className="size-5" />} label={t.contacts.address}>
              <address className="not-italic">{c.address[locale]}</address>
            </Row>
            <Row icon={<Phone className="size-5" />} label={t.contacts.phone}>
              <a href={c.phoneHref} className="text-[20px] font-bold tabular-nums text-forest hover:underline">
                {c.phoneDisplay}
              </a>
            </Row>
            <Row icon={<Clock className="size-5" />} label={t.contacts.hours}>
              {t.contacts.hoursValue}
              <span className="block text-[14.5px] font-normal text-ink-soft">{t.contacts.weekend}</span>
            </Row>
            <Row icon={<Bus className="size-5" />} label={t.life.transport.title}>
              {t.contacts.transport}
            </Row>
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <a href={c.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <WhatsAppIcon className="size-5" />
              {t.contacts.whatsapp}
            </a>
            <a href={c.phoneHref} className="btn btn-ghost">
              <Phone className="size-4.5" aria-hidden="true" />
              {t.ui.call}
            </a>
            <a href={c.instagramReelHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <InstagramIcon className="size-4.5" />
              {t.contacts.instagram}
            </a>
          </div>
        </Reveal>

        <Reveal className="col-span-7" delay={0.1}>
          <div className="relative h-full min-h-[440px] overflow-hidden rounded-[36px] rounded-br-[90px] shadow-lift ring-1 ring-sage-100">
            <MapEmbed className="absolute inset-0" />
            <a
              href={c.twoGisHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sun absolute bottom-5 left-5 shadow-lift"
            >
              <Navigation className="size-4.5" aria-hidden="true" />
              {t.contacts.route}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3.5 rounded-[20px] bg-sage-50/70 px-4 py-3">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-forest shadow-sm" aria-hidden="true">
        {icon}
      </span>
      <div>
        <dt className="text-[13px] font-bold text-ink-soft">{label}</dt>
        <dd className="text-[17px] font-semibold text-ink">{children}</dd>
      </div>
    </div>
  );
}
