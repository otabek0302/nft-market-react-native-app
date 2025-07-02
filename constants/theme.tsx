import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  ...NavLightTheme,
  colors: {
    ...NavLightTheme.colors,
    background: "#FFFFFF",
    primary: "#1B5FFE",
    text: "#1c1c1c",
    card: "#F5F5F5",
  },
};

export const DarkTheme: Theme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: "#000000",
    primary: "#1B5FFE",
    text: "#FFFFFF",
    card: "#1A1A1A",
  },
};
