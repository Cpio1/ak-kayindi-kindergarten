"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { kindergarten } from "@/data/kindergarten";
import { useLanguage } from "./LanguageProvider";
import { trapFocus, useScrollLock } from "./useScrollLock";

const photos = kindergarten.gallery;

type Props = {
  index: number | null;
  onChange: (index: number | null) => void;
};

// Полноэкранный просмотр фото: стрелки, Escape, свайп, ловушка фокуса
export function Lightbox({ index, onChange }: Props) {
  const { t } = useLanguage();
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const directionRef = useRef(0);

  useScrollLock(open);

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      directionRef.current = step;
      onChange((index + step + photos.length) % photos.length);
    },
    [index, onChange],
  );

  const close = useCallback(() => onChange(null), [onChange]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => returnFocusRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else trapFocus(e, dialogRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.dialog}
          data-on-dark
          className="fixed inset-0 z-[80] flex flex-col bg-[#1d2620]/95 text-milk backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-[15px] font-bold tabular-nums text-milk/80" aria-live="polite">
              {t.gallery.counter(index + 1, photos.length)}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-milk/10 px-4 font-bold text-milk ring-1 ring-milk/20 transition hover:bg-milk/20"
            >
              <X className="size-5" aria-hidden="true" />
              {t.gallery.close}
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={close}>
            <AnimatePresence mode="popLayout" initial={false} custom={directionRef.current}>
              <motion.div
                key={photo.id}
                className="relative h-full w-full max-w-5xl touch-pan-y"
                custom={directionRef.current}
                initial={{ opacity: 0, x: directionRef.current * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: directionRef.current * -40 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -400) go(1);
                  else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={photo.src}
                  alt={t.gallery.alts[photo.id]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="pointer-events-none select-none object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label={t.gallery.prev}
              className="absolute left-3 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full bg-milk/10 ring-1 ring-milk/20 transition hover:bg-milk/20 sm:flex"
            >
              <ChevronLeft className="size-7" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label={t.gallery.next}
              className="absolute right-3 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full bg-milk/10 ring-1 ring-milk/20 transition hover:bg-milk/20 sm:flex"
            >
              <ChevronRight className="size-7" aria-hidden="true" />
            </button>
          </div>

          <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
            <p className="mx-auto max-w-3xl text-center text-[15px] text-milk/85">{t.gallery.alts[photo.id]}</p>
            {/* На телефоне — крупные кнопки снизу, под большим пальцем */}
            <div className="mt-3 flex justify-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.gallery.prev}
                className="flex size-14 items-center justify-center rounded-full bg-milk/10 ring-1 ring-milk/20 active:bg-milk/25"
              >
                <ChevronLeft className="size-7" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.gallery.next}
                className="flex size-14 items-center justify-center rounded-full bg-milk/10 ring-1 ring-milk/20 active:bg-milk/25"
              >
                <ChevronRight className="size-7" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
