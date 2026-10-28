import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Lora, Nunito } from "next/font/google";
import { dictionaries, defaultLocale, isLocale, localeCookie } from "@/i18n";
import { kindergarten } from "@/data/kindergarten";
import "./globals.css";

// Оба шрифта поддерживают казахские буквы (подмножество cyrillic-ext)
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-lora",
  display: "swap",
  style: ["normal", "italic"],
});

async function getLocale() {
  const value = (await cookies()).get(localeCookie)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = dictionaries[await getLocale()];
  return {
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "Ақ қайың",
    icons: { icon: "/icon.svg", apple: kindergarten.images.logo.src },
    openGraph: {
      type: "website",
      title: t.meta.title,
      description: t.meta.description,
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      images: [{ url: kindergarten.images.hero.src, width: 1082, height: 1082 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FAF8F1",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${nunito.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
