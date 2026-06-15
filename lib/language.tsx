"use client";

import React, { useContext, useEffect, useState } from "react";

export type Language = "en" | "id";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const STORAGE_KEY = "yt-mp3-language";
const EVENT_NAME = "yt-mp3-language-change";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) === "id" ? "id" : "en";
}

function notifyLanguageChange(language: Language) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: language }));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    notifyLanguageChange(nextLanguage);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const contextValue = React.useContext(LanguageContext);

  if (!contextValue) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return contextValue;
}

export function useLanguageSync() {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;

    function handleLanguageChange(event: Event) {
      const nextLanguage = (event as CustomEvent<Language>).detail;
      setLanguageState(nextLanguage);
    }

    window.addEventListener(EVENT_NAME, handleLanguageChange);
    return () => window.removeEventListener(EVENT_NAME, handleLanguageChange);
  }, [language]);

  return language;
}

export const LanguageContext = React.createContext<LanguageContextValue | null>(null);
