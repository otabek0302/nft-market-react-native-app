import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, Theme } from "@react-navigation/native";

// Extend the Theme type to include our custom colors
export interface CustomTheme extends Theme {
  colors: Theme['colors'] & {
    error: string;
    border: string;
    shadow: string;
  };
}

// Light theme colors
export const LightTheme: CustomTheme = {
  ...NavLightTheme,
  colors: {
    ...NavLightTheme.colors,
    background: "#FFFFFF",
    primary: "#1B5FFE",
    text: "#1C1C1C",
    card: "#F5F5F5",
    error: "#FF3B30",
    border: "#E5E5E5",
    shadow: "#000000",
  },
};

// Dark theme colors
export const DarkTheme: CustomTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: "#000000",
    primary: "#1B5FFE",
    text: "#FFFFFF",
    card: "#1A1A1A",
    error: "#FF453A",
    border: "#333333",
    shadow: "#FFFFFF",
  },
};
