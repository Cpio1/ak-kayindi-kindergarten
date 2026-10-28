"use client";

import { ChevronRight, FileText } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { hasDocuments, sectionIds } from "@/components/shared/sections";

// Компактный список; раздел скрыт, пока в данных нет реальных ссылок
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
        <ul className="mt-4 divide-y divide-sage-100 overflow-hidden rounded-[22px] bg-white shadow-soft ring-1 ring-sage-100">
          {kindergarten.documents.map((doc) => (
            <li key={doc.id}>
              <a href={doc.href} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center gap-3 px-4 py-3">
                <FileText className="size-5 shrink-0 text-forest" aria-hidden="true" />
                <span className="flex-1 text-[16px] font-semibold text-ink">{doc.title[locale]}</span>
                <span className="flex items-center text-[15px] font-bold text-forest">
                  {t.documents.open}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
