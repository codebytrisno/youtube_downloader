"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

export default function NotFound() {
  const language = useLanguageSync();
  const t = translations[language].notFound;

  return (
    <main className="flex flex-grow flex-col items-center justify-center px-gutter py-xl text-center">
      <div className="mb-lg relative group">
        <div className="absolute inset-0 rounded-full bg-primary opacity-5 blur-xl transition-transform duration-700 group-hover:scale-110" />
        <MaterialIcon name="map" className="relative z-10 block text-[120px] text-primary" />
      </div>
      <h1 className="mb-md font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
        {t.title}
      </h1>
      <p className="mb-xl max-w-[500px] font-body-lg text-body-lg text-on-surface-variant">
        {t.description}
      </p>
      <Link
        href="/"
        className="flex items-center gap-xs rounded-DEFAULT bg-primary px-lg py-sm font-button text-button text-on-primary shadow-sm transition-all duration-200 hover:bg-on-primary-fixed-variant hover:shadow-md active:scale-95"
      >
        <MaterialIcon name="arrow_back" className="text-[20px]" />
        {t.back}
      </Link>
    </main>
  );
}
