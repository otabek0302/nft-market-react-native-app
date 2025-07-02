import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NavigationThemeProvider, Theme } from "@react-navigation/native";
import { LightTheme, DarkTheme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "user-theme";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const useThemeSwitcher = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load saved theme on mount
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value !== null) setIsDark(value === "dark");
    });
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    AsyncStorage.setItem(STORAGE_KEY, newDarkMode ? "dark" : "light");
  };

  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <NavigationThemeProvider value={theme}>{children}</NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
