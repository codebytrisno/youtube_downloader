"use client";

import { MaterialIcon } from "@/components/material-icon";
import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

export function FaqList() {
  const language = useLanguageSync();
  const t = translations[language].faq;

  return (
    <section id="faq" className="mx-auto w-full max-w-container-max px-gutter py-xl">
      <h2 className="mb-lg text-center font-headline-md text-headline-md text-on-surface">{t.title}</h2>
      <div className="mx-auto flex max-w-3xl flex-col gap-sm">
        {t.items.map((faq, index) => (
          <div key={faq.question} className="border-b border-[#E5E7EB]">
            <button
              className="flex w-full items-center justify-between py-md text-left font-headline-sm text-headline-sm text-on-surface transition-colors hover:text-primary focus:outline-none"
              type="button"
              onClick={(event) => {
                const button = event.currentTarget;
                const content = button.nextElementSibling;
                const chevron = button.querySelector(".chevron");

                document.querySelectorAll(".accordion-content").forEach((element) => {
                  if (element !== content && element.classList.contains("open")) {
                    element.classList.remove("open");
                    element.previousElementSibling?.querySelector(".chevron")?.classList.remove("rotated");
                  }
                });

                content?.classList.toggle("open");
                chevron?.classList.toggle("rotated");
              }}
            >
              {faq.question}
              <MaterialIcon name="expand_more" className="chevron text-secondary" />
            </button>
            <div
              className={`accordion-content font-body-md text-body-md text-on-surface-variant ${index === 0 ? "open" : ""}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
