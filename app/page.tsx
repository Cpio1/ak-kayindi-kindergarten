import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";
import { defaultLocale, isLocale, localeCookie } from "@/i18n";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { SiteRoot } from "@/components/shared/SiteRoot";

export default async function Page() {
  const cookieValue = (await cookies()).get(localeCookie)?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  // Первичный выбор версии по User-Agent: телефоны и планшеты получают мобильную
  // композицию сразу с сервера, дальше SiteRoot уточняет её по ширине окна.
  const { device } = userAgent({ headers: await headers() });
  const initialVariant = device.type === "mobile" || device.type === "tablet" ? "mobile" : "desktop";

  return (
    <LanguageProvider initialLocale={locale} hasSavedChoice={isLocale(cookieValue)}>
      <SiteRoot initialVariant={initialVariant} />
    </LanguageProvider>
  );
}
