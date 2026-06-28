"use client";

import Link from "next/link";
import { translations } from "@/lib/translations";
import { MaterialIcon } from "@/components/material-icon";

export function PrivacyContent() {
  const privacy = translations.privacy;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-50 to-zinc-100 px-4 py-12 dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <MaterialIcon name="arrow_back" className="text-[16px]" />
          Kembali
        </Link>
        <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{privacy.title}</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{privacy.updated}</p>
          </header>
          <div className="space-y-8">
            {privacy.sections.map((section, index) => (
              <section key={index}>
                <h2 className="mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100">{section.title}</h2>
                <div className="space-y-3 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {section.bullets.map((bullet, bIndex) => (
                        <li key={bIndex}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
