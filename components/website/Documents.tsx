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
        <Stagger as="ul" className="mt-6 grid grid-cols-2 gap-3">
          {kindergarten.documents.map((doc) => (
            <StaggerItem as="li" key={doc.id}>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[20px] bg-white px-5 py-4 shadow-soft ring-1 ring-sage-100 transition hover:-translate-y-0.5"
              >
                <FileText className="size-6 shrink-0 text-forest" aria-hidden="true" />
                <span className="flex-1 font-semibold text-ink">{doc.title[locale]}</span>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-forest">
                  {t.documents.open}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
