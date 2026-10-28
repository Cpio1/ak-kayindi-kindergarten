"use client";

import { ExternalLink, FolderOpen } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { hasDocuments, sectionIds } from "@/components/shared/sections";

// Карточка-ссылка на папку Google Диска; раздел скрыт, пока ссылка не задана
export function MobileDocuments() {
  const { t } = useLanguage();
  if (!hasDocuments) return null;

  return (
    <section id={sectionIds.documents} tabIndex={-1} aria-labelledby="m-documents-title" className="py-8 outline-none">
      <div className="container-mobile">
        <p className="eyebrow">
          <BirchLeaf className="size-3.5" />
          {t.documents.eyebrow}
        </p>
        <h2 id="m-documents-title" className="mt-1.5 text-[28px] font-semibold text-forest">{t.documents.title}</h2>
        <div className="mt-4 rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-sage-100">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage-50 text-forest">
              <FolderOpen className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[16px] font-semibold text-ink">{t.documents.folder}</span>
              <span className="block text-[14px] text-ink-soft">{t.documents.folderNote}</span>
            </span>
          </div>
          <a
            href={kindergarten.documentsFolderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-4 w-full"
          >
            {t.documents.view}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
