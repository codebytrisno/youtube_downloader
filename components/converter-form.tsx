"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";
import { isYouTubeUrl } from "@/lib/youtube";
import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

type ConvertResponse = {
  message?: string;
  url?: string;
  title?: string;
  thumbnailUrl?: string;
  duration?: string;
  quality?: string;
  size?: string;
  format?: string;
};

type ConverterFormProps = {
  className?: string;
};

export function ConverterForm({ className = "" }: ConverterFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const language = useLanguageSync();
  const t = translations[language].converterForm;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUrl = url.trim();

    if (!isYouTubeUrl(trimmedUrl)) {
      setError(t.invalidUrl);
      return;
    }

    setLoading(true);
    setError("");
    setProgress(8);

    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + Math.floor(Math.random() * 12) + 5, 88));
    }, 280);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: trimmedUrl, format }),
      });

      const data: ConvertResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.conversionFailed);
      }

      localStorage.setItem(
        "yt-mp3-result",
        JSON.stringify({
          ...data,
          format,
          sourceUrl: trimmedUrl,
        }),
      );

      router.push("/download");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.conversionFailed);
    } finally {
      window.clearInterval(interval);
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-outline-variant/60 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className="relative flex flex-1 items-center gap-3 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                <MaterialIcon name="link" className="text-[20px]" />
              </span>
              <input
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                className="h-12 flex-1 border-none bg-transparent px-1 font-body-lg text-body-lg text-on-surface outline-none placeholder:text-outline focus:ring-0"
                placeholder={t.placeholder}
                required
                type="url"
              />
              <div className="hidden shrink-0 md:flex">
                <button
                  type="button"
                  onClick={() => setFormat("mp3")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    format === "mp3"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <MaterialIcon name="music_note" className="text-[15px]" fill={format === "mp3"} />
                  {t.mp3}
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("mp4")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    format === "mp4"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <MaterialIcon name="videocam" className="text-[15px]" fill={format === "mp4"} />
                  {t.mp4}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-outline-variant/40 px-4 py-3 md:border-t-0 md:border-l md:py-3 md:pl-0 md:pr-3">
              <div className="flex gap-1 md:hidden">
                <button
                  type="button"
                  onClick={() => setFormat("mp3")}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    format === "mp3"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <MaterialIcon name="music_note" className="text-[14px]" fill={format === "mp3"} />
                  {t.mp3}
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("mp4")}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    format === "mp4"
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <MaterialIcon name="videocam" className="text-[14px]" fill={format === "mp4"} />
                  {t.mp4}
                </button>
              </div>
              <button
                className="flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-primary to-primary-container px-5 font-button text-button text-on-primary shadow-xs transition-all duration-200 hover:shadow-sm hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 md:flex-initial"
                type="submit"
                disabled={loading}
              >
                {loading ? t.converting : t.submit}
                <MaterialIcon name={loading ? "hourglass_empty" : "download"} className="text-[18px]" />
              </button>
            </div>
          </div>
        </form>
      </div>
      {loading && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-outline-variant/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-primary-container to-tertiary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && (
        <p className="mt-3 flex items-center gap-2 rounded-lg border border-error/30 bg-error-container/50 px-3 py-2 text-left font-label-sm text-label-sm text-error">
          <MaterialIcon name="error" className="text-[16px]" />
          <span>{error}</span>
        </p>
      )}
      <p className="mt-3 text-left font-caption text-caption text-secondary">
        {t.terms}
      </p>
    </div>
  );
}
