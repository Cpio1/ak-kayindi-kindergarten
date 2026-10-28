"use client";

import { ExternalLink, FolderOpen } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { BirchLeaf } from "@/components/shared/Decor";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { Reveal } from "@/components/shared/Reveal";
import { hasDocuments, sectionIds } from "@/components/shared/sections";

// Одна карточка-ссылка на папку Google Диска; выводится, только если ссылка задана в data/kindergarten.ts
export function Documents() {
  const { t } = useLanguage();
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
        <Reveal>
          <div className="mt-6 flex max-w-2xl items-center gap-5 rounded-[24px] bg-white px-6 py-5 shadow-soft ring-1 ring-sage-100">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sage-50 text-forest">
              <FolderOpen className="size-6" aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-[18px] font-semibold text-ink">{t.documents.folder}</span>
              <span className="mt-0.5 block text-[15px] text-ink-soft">{t.documents.folderNote}</span>
            </span>
            <a
              href={kindergarten.documentsFolderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shrink-0"
            >
              {t.documents.view}
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
