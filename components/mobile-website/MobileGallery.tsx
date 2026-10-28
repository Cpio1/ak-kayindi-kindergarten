"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf, Wave } from "@/components/shared/Decor";
import { Lightbox } from "@/components/shared/Lightbox";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { sectionIds } from "@/components/shared/sections";
import { useGallery } from "@/components/shared/useGallery";

type Photo = (typeof kindergarten.gallery)[number];

export function MobileGallery({ onLightboxChange }: { onLightboxChange: (open: boolean) => void }) {
  const { t } = useLanguage();
  const { initial, extra, expanded, toggle, lightboxIndex, setLightboxIndex, sectionRef } = useGallery();

  const setIndex = (index: number | null) => {
    setLightboxIndex(index);
    onLightboxChange(index !== null);
  };

  const tile = (photo: Photo, index: number) => (
    <button
      type="button"
      onClick={() => setIndex(index)}
      aria-label={`${t.gallery.open}: ${t.gallery.alts[photo.id]}`}
      className="relative block aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-sage-100 shadow-soft active:scale-[0.98]"
    >
      <Image
        src={photo.src}
        alt={t.gallery.alts[photo.id]}
        fill
        sizes="(max-width: 640px) 46vw, 300px"
        className="object-cover"
        style={{ objectPosition: photo.position }}
      />
    </button>
  );

  return (
    <section ref={sectionRef} id={sectionIds.gallery} tabIndex={-1} aria-labelledby="m-gallery-title" className="outline-none">
      <Wave className="block h-7 w-full" fill="var(--color-sage-50)" />
      <div className="bg-sage-50 pb-7 pt-2">
        <div className="container-mobile">
          <Reveal>
            <p className="eyebrow">
              <BirchLeaf className="size-3.5" />
              {t.gallery.eyebrow}
            </p>
            <h2 id="m-gallery-title" className="mt-1.5 text-[28px] font-semibold leading-tight text-forest">
              {t.gallery.title}
            </h2>
            <p className="mt-2 text-[16px] text-ink-soft">{t.gallery.lead}</p>
          </Reveal>

          <Stagger as="ul" className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
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
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul id="m-gallery-extra" className="grid grid-cols-2 gap-2 pt-2 sm:gap-3 sm:pt-3">
                  {extra.map((photo, i) => (
                    <li key={photo.id}>{tile(photo, initial.length + i)}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {extra.length > 0 && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls="m-gallery-extra"
              className="btn btn-ghost mt-4 min-h-[52px] w-full bg-white"
            >
              {expanded ? t.gallery.less : `${t.gallery.more} · ${extra.length}`}
              <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <Wave className="block h-7 w-full bg-sage-50" fill="var(--color-milk)" />

      <Lightbox index={lightboxIndex} onChange={setIndex} />
    </section>
  );
}
