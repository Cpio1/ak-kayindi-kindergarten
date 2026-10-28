"use client";

import { ExternalLink, FileText } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { hasDocuments, sectionIds } from "@/components/shared/sections";

// Выводится только при наличии реальных ссылок в data/kindergarten.ts
export function Documents() {
  const { t, locale } = useLanguage();
  if (!hasDocuments) return null;

  return (
    <section id={sectionIds.documents} aria-labelledby="documents-title" className="py-12">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">
            <BirchLeaf className="size-3.5" />
            {t.documents.eyebrow}
          </p>
          <h2 id="documents-title" className="mt-2 text-[34px] font-semibold text-forest">{t.documents.title}</h2>
        </Reveal>
        <Stagger as="ul" className="mt-6 grid grid-cols-3 gap-3">
          {kindergarten.documents.map((doc) => (
            <StaggerItem as="li" key={doc.id}>
              <div className="flex h-full items-center gap-4 rounded-[20px] bg-white px-5 py-4 shadow-soft ring-1 ring-sage-100">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-50 text-forest">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <span className="flex-1 font-semibold text-ink">{doc.title[locale]}</span>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.documents.open}: ${doc.title[locale]}`}
                  className="btn btn-ghost min-h-10 shrink-0 px-4 text-[15px]"
                >
                  {t.documents.open}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
