"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink, Expand } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { InstagramIcon } from "@/components/shared/BrandIcons";
import { BirchLeaf, Cloud, Wave } from "@/components/shared/Decor";
import { InstagramReel } from "@/components/shared/InstagramReel";
import { Lightbox } from "@/components/shared/Lightbox";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";
import { useGallery } from "@/components/shared/useGallery";

type Photo = (typeof kindergarten.gallery)[number];

export function Gallery() {
  const { t } = useLanguage();
  const { initial, extra, expanded, toggle, lightboxIndex, setLightboxIndex, sectionRef } = useGallery();

  const tile = (photo: Photo, index: number) => (
    <button
      type="button"
      onClick={() => setLightboxIndex(index)}
      aria-label={`${t.gallery.open}: ${t.gallery.alts[photo.id]}`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[26px] bg-sage-100 shadow-soft"
    >
      <Image
        src={photo.src}
        alt={t.gallery.alts[photo.id]}
        fill
        sizes="(max-width: 1280px) 31vw, 380px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ objectPosition: photo.position }}
      />
      <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/90 text-forest opacity-0 shadow-soft transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4.5" aria-hidden="true" />
      </span>
    </button>
  );

  return (
    <section
      ref={sectionRef}
      id={sectionIds.gallery}
      aria-labelledby="gallery-title"
      className="relative"
    >
      <Wave className="block h-10 w-full" fill="var(--color-sage-50)" />
      <div className="relative bg-sage-50 pb-14 pt-6 xl:pb-16">
        <Cloud className="pointer-events-none absolute right-[6%] top-0 w-28 opacity-90" />

        <div className="container-site">
          <Reveal className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">
                <BirchLeaf className="size-3.5" />
                {t.gallery.eyebrow}
              </p>
              <h2 id="gallery-title" className="mt-2 text-[34px] font-semibold leading-tight text-forest xl:text-[38px]">
                {t.gallery.title}
              </h2>
            </div>
            <p className="max-w-sm pb-1 text-[16px] text-ink-soft">{t.gallery.lead}</p>
          </Reveal>

          <Stagger as="ul" className="mt-7 grid grid-cols-3 gap-5">
            {initial.map((photo, i) => (
              <StaggerItem as="li" key={photo.id}>
                {tile(photo, i)}
              </StaggerItem>
            ))}
          </Stagger>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="extra"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul id="gallery-extra" className="grid grid-cols-3 gap-5 pt-5">
                  {extra.map((photo, i) => (
                    <li key={photo.id}>{tile(photo, initial.length + i)}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {extra.length > 0 && (
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={toggle}
                aria-expanded={expanded}
                aria-controls="gallery-extra"
                className="btn btn-ghost bg-white"
              >
                {expanded ? t.gallery.less : `${t.gallery.more} · ${extra.length}`}
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}

          {/* Видео из Instagram — отдельным спокойным блоком */}
          <div className="mt-14 grid grid-cols-12 items-center gap-10 rounded-[36px] bg-milk p-8 shadow-soft ring-1 ring-sage-100 xl:p-10">
            <Reveal className="col-span-6 col-start-1">
              <p className="eyebrow">
                <InstagramIcon className="size-4" />
                {t.video.eyebrow}
              </p>
              <h3 className="mt-2 text-[30px] font-semibold leading-tight text-forest">{t.video.title}</h3>
              <p className="mt-3 max-w-md text-[16.5px] leading-relaxed text-ink-soft">{t.video.text}</p>
              <a
                href={kindergarten.contacts.instagramReelHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-6"
              >
                <InstagramIcon className="size-4.5" />
                {t.video.open}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal className="col-span-5 col-start-8 flex justify-center" delay={0.1}>
              <InstagramReel className="h-[560px] w-[330px]" />
            </Reveal>
          </div>
        </div>
      </div>
      <Wave className="block h-10 w-full bg-sage-50" fill="var(--color-milk)" />

      <Lightbox index={lightboxIndex} onChange={setLightboxIndex} />
    </section>
  );
}
