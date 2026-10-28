"use client";

import { ExternalLink, FileText } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { hasDocuments, sectionIds } from "@/components/shared/sections";

// Компактные карточки; раздел скрыт, пока в данных нет реальных ссылок
export function MobileDocuments() {
  const { t, locale } = useLanguage();
  if (!hasDocuments) return null;

  return (
    <section id={sectionIds.documents} tabIndex={-1} aria-labelledby="m-documents-title" className="py-8 outline-none">
      <div className="container-mobile">
        <p className="eyebrow">
          <BirchLeaf className="size-3.5" />
          {t.documents.eyebrow}
        </p>
        <h2 id="m-documents-title" className="mt-1.5 text-[28px] font-semibold text-forest">{t.documents.title}</h2>
        <ul className="mt-4 grid gap-2.5">
          {kindergarten.documents.map((doc) => (
            <li key={doc.id} className="flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 shadow-soft ring-1 ring-sage-100">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage-50 text-forest">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <span className="flex-1 text-[16px] font-semibold text-ink">{doc.title[locale]}</span>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.documents.open}: ${doc.title[locale]}`}
                className="btn btn-ghost min-h-10 shrink-0 px-3.5 text-[15px]"
              >
                {t.documents.open}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
