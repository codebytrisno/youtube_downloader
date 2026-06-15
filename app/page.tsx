"use client";

import { ConverterForm } from "@/components/converter-form";
import { FaqList } from "@/components/faq-list";
import { MaterialIcon } from "@/components/material-icon";
import { useLanguageSync } from "@/lib/language";
import { translations } from "@/lib/translations";

export default function HomePage() {
  const language = useLanguageSync();
  const t = translations[language];
  const home = t.home;

  return (
    <main className="flex-grow overflow-x-hidden">
      <section className="relative mx-auto flex w-full max-w-container-max flex-col items-center px-gutter pb-lg pt-[72px] text-center md:pb-[88px] md:pt-[96px]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-fixed/50 via-primary/20 to-transparent blur-[120px] lg:h-[520px] lg:w-[520px]" />
        <div className="pointer-events-none absolute right-1/2 top-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-tl from-tertiary-fixed/70 via-tertiary/20 to-transparent blur-[100px] lg:h-[500px] lg:w-[500px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(252,238,234,0.5),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-16 -z-10 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-xl lg:gap-[72px]">
          <div className="flex max-w-4xl flex-col items-center">

            <p className="mx-auto max-w-sm font-label-sm text-label-sm text-primary">
              {home.eyebrow}
            </p>

            <h1 className="mx-auto max-w-2xl font-headline-lg-mobile leading-[1.05] tracking-[-0.03em] text-on-surface md:max-w-3xl md:font-headline-lg md:text-headline-lg lg:max-w-none">
              {home.titlePrefix}
              <span className="bg-gradient-to-r from-primary via-primary-container to-tertiary bg-clip-text text-transparent">
                {home.titleHighlight}
              </span>
            </h1>
            <p className="mx-auto mt-lg max-w-2xl font-body-lg leading-relaxed text-on-surface-variant lg:max-w-2xl">
              {home.description}
            </p>

            <div id="convert" className="mx-auto mt-lg scroll-mt-28">
              <ConverterForm className="max-w-3xl" />
            </div>

            <div className="mt-lg grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              {home.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-surface/70 p-5 shadow-[0_24px_70px_-35px_rgba(188,1,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:bg-surface-container-low/70 hover:shadow-[0_28px_80px_-35px_rgba(188,1,0,0.34)]"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-fixed opacity-30 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-50" />
                  <div className="relative flex items-start gap-4 text-left">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-tertiary/10 text-primary shadow-[inset_0_0_0_1px_rgba(188,1,0,0.08)]">
                      {stat.value === "0" && <MaterialIcon name="person_off" className="text-[24px]" />}
                      {stat.value === "320kbps" && <MaterialIcon name="graphic_eq" className="text-[24px]" />}
                      {stat.value === "24/7" && <MaterialIcon name="schedule" className="text-[24px]" />}
                    </div>
                    <div>
                      <div className="font-headline-md text-headline-md text-primary">{stat.value}</div>
                      <div className="mt-1 text-base font-bold tracking-tight text-on-surface">{stat.label}</div>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{stat.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      <section className="border-y border-outline bg-surface/75 py-xl backdrop-blur-md">
        <div className="mx-auto grid max-w-container-max grid-cols-1 gap-5 px-gutter sm:grid-cols-2 lg:grid-cols-4">
          {home.features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-[1.5rem] border border-outline bg-surface px-5 py-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_-32px_rgba(188,1,0,0.22)]"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-fixed opacity-40 blur-[28px] transition-transform duration-500 group-hover:scale-125" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-tertiary/10 text-primary">
                  <MaterialIcon name={feature.icon} className="text-[28px]" />
                </div>
                <span className="rounded-full bg-surface-container-low px-3 py-1.5 text-caption font-label-sm text-primary">
                  {feature.metric}
                </span>
              </div>
              <h3 className="mt-4 font-headline-sm text-headline-sm text-on-surface">{feature.title}</h3>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-container-max px-gutter py-xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-outline bg-gradient-to-br from-surface via-surface-container-low to-white p-6 shadow-[0_28px_80px_-30px_rgba(188,1,0,0.18)] md:p-10">
          <div className="absolute -right-14 top-0 h-36 w-36 rounded-full bg-primary-fixed/40 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-tertiary-fixed/40 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mx-auto inline-flex rounded-full border border-outline bg-surface-container-low/60 px-4 py-1 font-label-sm text-label-sm text-primary">{home.howItWorks}</p>
            <h2 className="mt-5 font-headline-md text-headline-md text-on-surface">{home.stepsTitle}</h2>
            <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
              {home.stepsDescription}
            </p>
          </div>
          <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.steps.map((step, index) => (
              <div key={step.title} className="group relative overflow-hidden rounded-2xl border border-outline bg-white/80 p-6 shadow-[0_18px_55px_-22px_rgba(188,1,0,0.18)] transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary-fixed/40 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-sm">
                    <span className="font-button text-button">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{step.title}</h3>
                    <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqList />
    </main>
  );
}
