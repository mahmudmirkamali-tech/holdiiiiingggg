import { create } from "zustand";

export type Lang = "fa" | "en";

type LangState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

export const useLang = create<LangState>((set, get) => ({
  lang: "fa",
  setLang: (lang) => {
    try {
      localStorage.setItem("parvaz-lang", lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    }
    set({ lang });
  },
  toggle: () => {
    const next = get().lang === "fa" ? "en" : "fa";
    get().setLang(next);
  },
}));

export function hydrateLang() {
  try {
    const stored = localStorage.getItem("parvaz-lang");
    if (stored === "en" || stored === "fa") {
      useLang.getState().setLang(stored);
    } else {
      useLang.getState().setLang("fa");
    }
  } catch {
    /* ignore */
  }
}
