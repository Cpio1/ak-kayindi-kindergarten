"use client";

import { useCallback, useRef, useState } from "react";
import { kindergarten } from "@/data/kindergarten";

export const INITIAL_PHOTOS = 6;

// Общая логика галереи: раскрытие, сворачивание и индекс открытого фото
export function useGallery() {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const photos = kindergarten.gallery;
  const initial = photos.slice(0, INITIAL_PHOTOS);
  const extra = photos.slice(INITIAL_PHOTOS);

  const toggle = useCallback(() => {
    // При сворачивании возвращаем к началу галереи, если её верх ушёл за экран
    if (expanded) {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) sectionRef.current?.scrollIntoView({ block: "start" });
    }
    setExpanded(!expanded);
  }, [expanded]);

  return { photos, initial, extra, expanded, toggle, lightboxIndex, setLightboxIndex, sectionRef };
}
