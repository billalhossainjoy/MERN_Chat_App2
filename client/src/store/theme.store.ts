import { create } from "zustand";

interface IThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
  theme: localStorage.getItem("chat-theme") || "night",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
