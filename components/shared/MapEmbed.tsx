"use client";

import { mapEmbedSrc } from "@/data/kindergarten";
import { useLanguage } from "./LanguageProvider";

export function MapEmbed({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`overflow-hidden bg-sage-50 ${className}`}>
      <iframe
        src={mapEmbedSrc}
        title={t.contacts.mapTitle}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
