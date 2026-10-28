import type { Locale } from "@/data/kindergarten";
import { kk, type Dictionary } from "./kk";
import { ru } from "./ru";

export const dictionaries: Record<Locale, Dictionary> = { kk, ru };
export const defaultLocale: Locale = "kk";
export const localeCookie = "akkayin-lang";

export function isLocale(value: unknown): value is Locale {
  return value === "kk" || value === "ru";
}

export type { Dictionary };
