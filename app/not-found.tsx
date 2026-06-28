"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { translations } from "@/lib/translations";

export default function NotFound() {
  const t = translations.notFound;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 dark:from-zinc-950 dark:to-zinc-900">
      <div className="flex max-w-md flex-col items-center text-center">
        <MaterialIcon name="search_off" className="text-[80px] text-zinc-300 dark:text-zinc-700" />
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{t.title}</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{t.description}</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <MaterialIcon name="arrow_back" className="text-[16px]" />
          {t.back}
        </Link>
      </div>
    </div>
  );
}
