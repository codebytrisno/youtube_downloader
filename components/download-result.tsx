"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

type DownloadResultState = {
  url: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  quality: string;
  size: string;
};

const fallbackResult: DownloadResultState = {
  url: "",
  title: "Lofi Hip Hop Radio - Beats to Relax/Study to",
  thumbnailUrl: "https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg",
  duration: "4:32",
  quality: "320kbps",
  size: "10.4 MB",
};

export function DownloadResult() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<DownloadResultState>(fallbackResult);
  const language = useLanguageSync();
  const t = translations[language].download;

  useEffect(() => {
    const stored = localStorage.getItem("yt-mp3-result");
    const titleFromQuery = searchParams.get("title");

    if (stored) {
      setResult({ ...fallbackResult, ...JSON.parse(stored) });
    }

    if (titleFromQuery) {
      setResult((current) => ({ ...current, title: titleFromQuery }));
    }
  }, [searchParams]);

  const hasDownloadUrl = result.url.length > 0;

  return (
    <div className="flex w-full max-w-[800px] flex-col gap-lg">
      <div className="space-y-sm text-center">
        <div className="mb-sm inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-primary">
          <MaterialIcon name="check_circle" className="text-[32px]" fill />
        </div>
        <h1 className="text-on-surface font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg">
          {t.pageTitle}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{t.description}</p>
      </div>

      <div className="flex flex-col overflow-hidden rounded-lg border border-outline bg-surface-container-lowest transition-shadow duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] group md:flex-row">
        <div className="relative h-[180px] shrink-0 bg-surface-container-highest md:h-auto md:w-[320px]">
          <Image
            alt={result.title}
            className="absolute inset-0 h-full w-full object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 320px"
            src={result.thumbnailUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex flex-grow flex-col justify-between gap-md p-md">
          <div className="space-y-xs">
            <h2 className="line-clamp-2 font-headline-sm text-headline-sm text-on-surface">{result.title}</h2>
            <div className="mt-xs flex flex-wrap items-center gap-sm">
              <div className="flex items-center gap-base font-label-sm text-label-sm text-secondary">
                <MaterialIcon name="schedule" className="text-[16px]" />
                {t.duration}: {result.duration}
              </div>
              <span className="h-1 w-1 rounded-full bg-outline-variant" />
              <div className="flex items-center gap-base font-label-sm text-label-sm text-secondary">
                <MaterialIcon name="high_quality" className="text-[16px]" />
                {t.quality}: {result.quality}
              </div>
              <span className="h-1 w-1 rounded-full bg-outline-variant" />
              <div className="flex items-center gap-base font-label-sm text-label-sm text-secondary">
                <MaterialIcon name="folder_zip" className="text-[16px]" />
                {t.size}: {result.size}
              </div>
            </div>
          </div>
          <a
            className={`flex h-14 items-center justify-center gap-xs rounded bg-primary font-button text-button text-on-primary transition-colors hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              !hasDownloadUrl ? "pointer-events-none opacity-50" : ""
            }`}
            href={result.url || "#"}
            aria-disabled={!hasDownloadUrl}
          >
            <MaterialIcon name="download" className="text-[20px]" fill />
            {t.download}
          </a>
        </div>
      </div>

      <div className="flex justify-center mt-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-xs rounded border border-outline px-md py-sm font-button text-button text-on-surface transition-colors hover:bg-surface-container"
        >
          <MaterialIcon name="refresh" />
          {t.convertAnother}
        </Link>
      </div>
    </div>
  );
}
