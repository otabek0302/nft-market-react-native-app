import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { LightTheme, DarkTheme } from "@/constants/theme";
import type { CustomTheme } from "@/constants/theme";

const STORAGE_KEY = "user-theme";

type ThemeContextType = {
  theme: CustomTheme;
  isDark: boolean;
  toggleTheme: () => void;
  statusBarConfig: {
    backgroundColor: string;
    barStyle: "light-content" | "dark-content";
  };
};

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  isDark: false,
  toggleTheme: () => {},
  statusBarConfig: {
    backgroundColor: LightTheme.colors.background,
    barStyle: "dark-content",
  },
});

export const useThemeSwitcher = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(savedTheme === "dark");
      }
    } catch (error) {
      console.warn("Failed to load saved theme:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newDarkMode = !isDark;
      setIsDark(newDarkMode);
      await AsyncStorage.setItem(STORAGE_KEY, newDarkMode ? "dark" : "light");
    } catch (error) {
      console.warn("Failed to save theme:", error);
    }
  };

  const theme = isDark ? DarkTheme : LightTheme;

  const statusBarConfig = {
    backgroundColor: theme.colors.background,
    barStyle: isDark ? "light-content" : "dark-content",
  } as const;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, statusBarConfig }}>
      <NavigationThemeProvider value={theme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
