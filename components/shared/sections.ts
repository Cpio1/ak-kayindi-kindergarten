import type { Dictionary } from "@/i18n";

// Якоря разделов — общие для обеих версий
export const sectionIds = {
  about: "about",
  life: "life",
  groups: "groups",
  gallery: "gallery",
  documents: "documents",
  contacts: "contacts",
} as const;

type NavKey = keyof Dictionary["nav"];

export function navItems(t: Dictionary, { withGroups = false } = {}) {
  const keys: NavKey[] = ["about", "life"];
  if (withGroups) keys.push("groups");
  keys.push("gallery", "documents", "contacts");
  return keys.map((key) => ({ key, href: `#${sectionIds[key]}`, label: t.nav[key] }));
}
