"use client";

import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { Life } from "./Life";
import { Gallery } from "./Gallery";
import { Documents } from "./Documents";
import { Contacts } from "./Contacts";
import { Footer } from "./Footer";

// Компьютерная версия (от 1024 px)
export function Website() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Life />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
