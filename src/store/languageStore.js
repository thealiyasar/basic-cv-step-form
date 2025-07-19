import { create } from "zustand";
import en from "../locales/en";
import tr from "../locales/tr";

const resources = { en, tr };

export const useLanguageStore = create((set, get) => ({
  language: "en",
  setLanguage: lang => set({ language: lang }),
  t: key => {
    const { language } = get();
    return resources[language][key] || key;
  },
}));
