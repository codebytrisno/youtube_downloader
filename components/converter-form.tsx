"use client";

import { useState } from "react";
import { MaterialIcon } from "./material-icon";
import { translations } from "@/lib/translations";

const MP3_QUALITIES = ["128", "192", "320"];
const MP4_QUALITIES = ["360", "480", "720", "1080", "1440", "4k"];

export function ConverterForm() {
  const t = translations.converterForm;
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"mp3" | "mp4">("mp3");
  const [quality, setQuality] = useState("320");
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error" | "downloading" | "done"
  >("idle");
  const [videoInfo, setVideoInfo] = useState<{
    title: string;
    duration: string;
    thumbnail: string;
  } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError(t.invalidUrl);
      return;
    }

    setStatus("loading");
    setVideoInfo(null);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.conversionFailed);
      }

      setVideoInfo({
        title: data.title,
        duration: data.duration,
        thumbnail: data.thumbnail,
      });
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.conversionFailed);
    }
  };

  const isValid = url.trim().length > 0;
  const isBusy = status === "loading" || status === "downloading";
  const isDownloading = status === "downloading";

  const handleDownload = async () => {
    if (!url.trim() || !videoInfo) return;
    setStatus("downloading");
    setError("");

    try {
      const params = new URLSearchParams({ url: url.trim(), type: format, quality });

      const res = await fetch(`/api/download?${params.toString()}`);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Download gagal");
      }

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const safeName = videoInfo.title.replace(/[<>:"/\\|?*]/g, "_").trim() || "video";
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${safeName}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Download gagal");
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-xl border border-zinc-200 bg-white/50 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input + Format Toggle */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MaterialIcon
                name="link"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xl"
              />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.placeholder}
                className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400"
              />
            </div>

            {/* Format Toggle */}
            <div className="flex rounded-lg border border-zinc-300 dark:border-zinc-700 overflow-hidden flex-shrink-0">
              <button
                type="button"
                onClick={() => { setFormat("mp3"); setQuality("320"); }}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  format === "mp3"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                MP3
              </button>
              <button
                type="button"
                onClick={() => { setFormat("mp4"); setQuality("720"); }}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  format === "mp4"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                MP4
              </button>
            </div>
          </div>

          {/* Quality Select */}
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-400"
          >
            {(format === "mp3" ? MP3_QUALITIES : MP4_QUALITIES).map((q) => (
              <option key={q} value={q}>
                {format === "mp3" ? `${q} kbps` : q === "4k" ? "4K" : `${q}p`}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isBusy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <MaterialIcon
              name={isBusy ? "hourglass_top" : "auto_awesome"}
              className="text-lg"
            />
            {isBusy ? "Memproses..." : t.submit}
          </button>
        </form>

        {/* Error */}
        {status === "error" && error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Loading state */}
        {status === "loading" && (
          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500" />
            </span>
            Mendapatkan info video...
          </div>
        )}
        {status === "downloading" && (
          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500" />
            </span>
            Mengunduh file...
          </div>
        )}

        {/* Video Info + Download */}
        {videoInfo && status === "ready" && (
          <div className="mt-4 space-y-3">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
              {videoInfo.thumbnail && (
                <img
                  src={videoInfo.thumbnail}
                  alt=""
                  className="w-full aspect-video object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                  {videoInfo.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1">
                    <MaterialIcon name="schedule" className="text-[14px]" />
                    {videoInfo.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MaterialIcon name="settings" className="text-[14px]" />
                    {format === "mp3" ? `${quality} kbps` : quality === "4k" ? "4K" : `${quality}p`} &middot; {format.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MaterialIcon name="download" className="text-lg" />
              {isDownloading ? "Mengunduh..." : t.downloadReady}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
