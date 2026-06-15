import type { Metadata } from "next";
import { Suspense } from "react";
import { DownloadResult } from "@/components/download-result";

export const metadata: Metadata = {
  title: "YT-MP3 - Conversion Complete",
};

export default function DownloadPage() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center px-gutter py-xl">
      <Suspense
        fallback={
          <div className="h-16 w-16 animate-pulse rounded-full bg-surface-container-high" aria-label="Loading conversion result" />
        }
      >
        <DownloadResult />
      </Suspense>
    </main>
  );
}
