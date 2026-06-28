import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download",
};

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <p className="text-zinc-600 dark:text-zinc-400">Download page</p>
    </div>
  );
}
