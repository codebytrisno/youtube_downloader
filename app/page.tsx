"use client";

import { ConverterForm } from "@/components/converter-form";
import { FaqList } from "@/components/faq-list";
import { MaterialIcon } from "@/components/material-icon";
import { translations } from "@/lib/translations";
import { useTheme } from "@/components/theme-provider";


export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const home = translations.home;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-12 dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-zinc-100">
              <MaterialIcon name="download" className="text-white dark:text-zinc-900 text-[28px]" fill />
            </div>
            <a
              href="/privacy"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              title={translations.header.faq}
            >
              <MaterialIcon name="description" className="text-zinc-700 dark:text-zinc-300 text-[22px]" />
            </a>
            <button
              onClick={toggleTheme}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              <MaterialIcon
                name={theme === "dark" ? "light_mode" : "dark_mode"}
                className="text-zinc-700 dark:text-zinc-300 text-[22px]"
              />
            </button>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            YouTube Downloader
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            {home.description}
          </p>
        </div>

        {/* Converter Form */}
        <ConverterForm />


        {/* FAQ */}
        <FaqList />

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-zinc-500 dark:text-zinc-500">
          <p>Gunakan dengan bijak. Hormati hak cipta YouTube.</p>
          <p className="mt-4 font-medium text-zinc-600 dark:text-zinc-400">
            &copy; 2026 Created By Trisno Sanjaya
          </p>
        </div>
      </div>
    </div>
  );
}
