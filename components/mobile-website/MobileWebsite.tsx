"use client";

import { useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileAbout } from "./MobileAbout";
import { MobileLife } from "./MobileLife";
import { MobileGallery } from "./MobileGallery";
import { MobileDocuments } from "./MobileDocuments";
import { MobileContacts } from "./MobileContacts";
import { MobileFooter } from "./MobileFooter";
import { MobileActionBar } from "./MobileActionBar";

// Мобильная версия (до 1024 px): своя композиция, общие данные и язык
export function MobileWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <MobileHeader open={menuOpen} setOpen={setMenuOpen} />
      <main id="main">
        <MobileHero />
        <MobileAbout />
        <MobileLife />
        <MobileGallery onLightboxChange={setLightboxOpen} />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <MobileFooter />
      <MobileActionBar hidden={menuOpen || lightboxOpen} />
    </>
  );
}
