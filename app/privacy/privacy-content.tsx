"use client";

import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

export function PrivacyContent() {
  const language = useLanguageSync();
  const privacy = translations[language].privacy;

  return (
    <main className="flex w-full flex-grow px-gutter py-xl">
      <article className="mx-auto max-w-[800px] rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
        <header className="mb-xl text-center md:text-left">
          <h1 className="mb-xs font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
            {privacy.title}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">{privacy.updated}</p>
        </header>
        <div className="space-y-xl">
          {privacy.sections.map((section, index) => (
            <section key={index}>
              <h2 className="mb-md font-headline-md text-headline-md text-on-surface">{section.title}</h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant space-y-sm">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-sm list-disc space-y-xs pl-md">
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
    </main>
  );
}
