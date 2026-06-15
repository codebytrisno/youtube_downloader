"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";
import { useLanguage } from "@/lib/language";
import { translations } from "@/lib/translations";

const headerTranslations = translations;

export function Header() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const labels = headerTranslations[language].header;

  const navItems = [
    { href: "/", label: labels.home },
    { href: "/#faq", label: labels.faq },
    { href: "/privacy", label: labels.privacy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-border/60 bg-cyber-surface/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between px-gutter">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full px-1 py-2 text-headline-sm font-headline-sm font-bold tracking-tight text-cyber-text transition-all hover:bg-cyber-surface-light/60"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyber-primary via-cyber-secondary to-cyber-accent p-[1px] shadow-[0_0_28px_rgba(0,212,255,0.32)] transition-transform group-hover:scale-105 group-hover:shadow-[0_0_38px_rgba(123,45,255,0.42)]">
            <span className="flex h-full w-full items-center justify-center rounded-2xl bg-cyber-surface text-cyber-primary">
              <MaterialIcon name="play_circle" className="text-[22px]" fill />
            </span>
          </span>
          <span className="bg-gradient-to-r from-cyber-text via-cyber-primary to-cyber-accent bg-clip-text text-transparent">
            YT-MP3
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-cyber-border/80 bg-cyber-surface-light/50 p-1 shadow-2xl shadow-black/20 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href === "/#faq" && pathname === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 text-cyber-text shadow-[inset_0_0_0_1px_rgba(0,212,255,0.18)]"
                    : "text-cyber-text-dim hover:bg-cyber-primary/10 hover:text-cyber-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#convert"
          className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-surface-light/70 px-2 py-2 text-sm font-bold tracking-wide text-on-primary shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_34px_rgba(188,1,0,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(188,1,0,0.42),0_0_46px_rgba(255,45,123,0.36)] md:inline-flex"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-red-600 opacity-95 transition-opacity group-hover:opacity-100" />
          <span className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-white/25 blur-xl transition-all duration-500 group-hover:right-0 group-hover:top-0" />
          <MaterialIcon name="bolt" className="relative z-10 text-[18px] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill />
          <span className="relative z-10">{labels.convert}</span>
        </Link>

        <button
          type="button"
          aria-label={language === "id" ? labels.switchToEnglish : labels.switchToIndonesian}
          onClick={() => setLanguage(language === "id" ? "en" : "id")}
          className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-full border border-primary/20 bg-primary/10 px-3 text-sm font-bold tracking-wide text-primary shadow-[0_0_24px_rgba(188,1,0,0.18)] transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-on-primary md:inline-flex"
        >
          <MaterialIcon name="language" className="text-[18px]" />
          <span>{language === "id" ? "EN" : "ID"}</span>
        </button>

        <button
          type="button"
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyber-border/80 bg-cyber-surface-light/60 text-cyber-text transition-all hover:border-cyber-primary/50 hover:bg-cyber-primary/10 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <span className="relative h-5 w-5">
            <span
              className={`absolute left-1/2 top-1 h-0.5 w-5 rounded-full bg-cyber-text transition-all duration-300 ${
                menuOpen ? "translate-x-[-50%] translate-y-2 rotate-45" : "translate-x-[-50%] translate-y-0"
              }`}
            />
            <span
              className={`absolute left-1/2 top-2.5 h-0.5 w-5 rounded-full bg-cyber-text transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-4 h-0.5 w-5 rounded-full bg-cyber-text transition-all duration-300 ${
                menuOpen ? "translate-x-[-50%] -translate-y-2 -rotate-45" : "translate-x-[-50%] translate-y-0"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-cyber-border/60 bg-cyber-surface/95 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-container-max flex-col gap-2 px-gutter py-4">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href === "/#faq" && pathname === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 text-cyber-text shadow-[inset_0_0_0_1px_rgba(0,212,255,0.18)]"
                    : "text-cyber-text-dim hover:bg-cyber-primary/10 hover:text-cyber-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#convert"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent px-4 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,212,255,0.24)]"
          >
            <MaterialIcon name="bolt" className="text-[18px]" fill />
            <span>{labels.convertNow}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
