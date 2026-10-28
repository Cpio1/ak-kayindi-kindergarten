"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { InstagramIcon } from "./BrandIcons";
import { BirchLeaf, Sun } from "./Decor";
import { useLanguage } from "./LanguageProvider";

const { instagramReelEmbed, instagramReelHref } = kindergarten.contacts;

// Встраивание ролика по клику: iframe Instagram не грузится заранее и
// никогда не запускается сам. Ссылка на оригинал доступна всегда.
export function InstagramReel({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-white shadow-lift ring-1 ring-sage-100 ${className}`}>
      {loaded ? (
        <iframe
          src={instagramReelEmbed}
          title={t.video.frameTitle}
          className="h-full w-full"
          loading="lazy"
          allow="encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center gap-5 bg-sage-50 p-6 text-center">
          <Sun className="absolute -right-4 -top-4 size-24 opacity-90" />
          <BirchLeaf className="absolute bottom-6 left-5 size-10 -rotate-12 text-sage" />
          <BirchLeaf className="absolute bottom-16 left-14 size-6 rotate-12 text-forest/70" />
          <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-forest shadow-soft">
            <InstagramIcon className="size-7" />
          </span>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group flex flex-col items-center gap-3 rounded-3xl p-2"
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-forest text-milk shadow-lift transition group-hover:scale-105">
              <Play className="ml-1 size-8 fill-current" aria-hidden="true" />
            </span>
            <span className="text-base font-bold text-forest">{t.video.play}</span>
          </button>
          <a
            href={instagramReelHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-ink-soft underline decoration-sage underline-offset-4 hover:text-forest"
          >
            {t.video.open}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}
