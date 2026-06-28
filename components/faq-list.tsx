"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import { translations } from "@/lib/translations";

export function FaqList() {
  const t = translations.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto mt-12 max-w-xl">
      <h2 className="mb-6 text-center text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t.title}</h2>
      <div className="flex flex-col gap-2">
        {t.items.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="overflow-hidden rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50">
              <button
                className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-zinc-900 transition-colors hover:bg-white/50 dark:text-zinc-100 dark:hover:bg-zinc-800/50"
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{faq.question}</span>
                <MaterialIcon
                  name="expand_more"
                  className={`text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                <p className="border-t border-zinc-200 px-4 py-3.5 text-sm text-zinc-600 leading-relaxed dark:border-zinc-800 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
