import { create } from "zustand";

export const useThemeStore = create(set => ({
  darkMode: false,
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
  setDarkMode: value => set({ darkMode: value }),
}));
