import {
  Bird,
  BookOpenText,
  Bus,
  Calculator,
  Cherry,
  Clock,
  Flower2,
  GraduationCap,
  Hand,
  HeartHandshake,
  MessageCircle,
  Palette,
  Shapes,
  ShieldCheck,
  Sprout,
  Utensils,
} from "lucide-react";

// Иконки для позиций из словаря — централизованно, чтобы обе версии совпадали
export const directionIcons = {
  literacy: BookOpenText,
  math: Calculator,
  speech: MessageCircle,
  creativity: Palette,
  motor: Hand,
  play: Shapes,
} as const;

export const valueIcons = {
  safety: ShieldCheck,
  care: HeartHandshake,
  growth: Sprout,
  school: GraduationCap,
} as const;

export const groupIcons = {
  bird: Bird,
  cherry: Cherry,
  flower: Flower2,
} as const;

export const infoIcons = {
  nutrition: Utensils,
  schedule: Clock,
  transport: Bus,
} as const;

export type DirectionKey = keyof typeof directionIcons;
export type ValueKey = keyof typeof valueIcons;
export const directionKeys = Object.keys(directionIcons) as DirectionKey[];
export const valueKeys = Object.keys(valueIcons) as ValueKey[];
