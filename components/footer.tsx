"use client";

import Link from "next/link";
import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

export function Footer() {
  const language = useLanguageSync();
  const t = translations[language].footer;

  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-low transition-opacity duration-150">
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-md px-gutter py-lg md:flex-row md:justify-between">
        <div className="text-headline-sm font-headline-sm font-bold text-primary">YT-MP3</div>
        <nav className="flex flex-wrap justify-center gap-md font-body-md text-body-md">
          <Link href="/privacy" className="text-on-surface-variant transition-colors hover:underline hover:text-primary">
            {t.privacy}
          </Link>
          <Link href="/" className="text-on-surface-variant transition-colors hover:underline hover:text-primary">
            {t.terms}
          </Link>
          <Link href="/" className="text-on-surface-variant transition-colors hover:underline hover:text-primary">
            {t.contact}
          </Link>
        </nav>
        <div className="text-center font-body-md text-body-md text-on-surface-variant md:text-right">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
