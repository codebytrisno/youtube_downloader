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
  format: string;
};

const fallbackResult: DownloadResultState = {
  url: "",
  title: "Lofi Hip Hop Radio - Beats to Relax/Study to",
  thumbnailUrl: "https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg",
  duration: "4:32",
  quality: "320kbps",
  size: "10.4 MB",
  format: "mp3",
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

  const isMp4 = result.format === "mp4";
  const formatLabel = isMp4 ? "MP4" : "MP3";
  const qualityIcon = isMp4 ? "videocam" : "high_quality";
  const hasDownloadUrl = result.url.length > 0;

  return (
    <div className="flex w-full max-w-[640px] flex-col items-center gap-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high text-primary">
          <MaterialIcon name="check_circle" className="text-[28px]" fill />
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
          {t.pageTitle}
        </h1>
        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{t.description}</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-outline-variant/60 bg-white shadow-xs">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-44 shrink-0 bg-surface-container-highest md:h-auto md:w-56">
            <Image
              alt={result.title}
              className="absolute inset-0 h-full w-full object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 224px"
              src={result.thumbnailUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            <span className={`absolute bottom-2 left-2 rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
              isMp4
                ? "bg-tertiary/90 text-white"
                : "bg-primary/90 text-white"
            }`}>
              {formatLabel}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h2 className="line-clamp-2 font-headline-sm text-headline-sm text-on-surface leading-snug">
              {result.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-label-sm text-secondary">
              <span className="flex items-center gap-1">
                <MaterialIcon name="schedule" className="text-[15px]" />
                {t.duration}: {result.duration}
              </span>
              <span className="h-1 w-1 rounded-full bg-outline-variant" />
              <span className="flex items-center gap-1">
                <MaterialIcon name={qualityIcon} className="text-[15px]" />
                {t.quality}: {result.quality}
              </span>
              <span className="h-1 w-1 rounded-full bg-outline-variant" />
              <span className="flex items-center gap-1">
                <MaterialIcon name="folder_zip" className="text-[15px]" />
                {t.size}: {result.size}
              </span>
            </div>
            <a
              className={`flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-container font-button text-button text-on-primary shadow-xs transition-all duration-200 hover:shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                !hasDownloadUrl ? "pointer-events-none opacity-50" : ""
              }`}
              href={result.url || "#"}
              aria-disabled={!hasDownloadUrl}
            >
              <MaterialIcon name="download" className="text-[18px]" fill />
              {t.download} {formatLabel}
            </a>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2.5 font-button text-button text-on-surface transition-colors hover:bg-surface-container"
      >
        <MaterialIcon name="refresh" className="text-[18px]" />
        {t.convertAnother}
      </Link>
    </div>
  );
}
