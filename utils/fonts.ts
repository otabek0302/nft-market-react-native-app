import * as Font from "expo-font";

export const FONTS = {
  SPACE_MONO: "SpaceMono",
} as const;

export const loadFonts = async () => {
  await Font.loadAsync({
    [FONTS.SPACE_MONO]: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
};

export const fontFamily = {
  spaceMono: FONTS.SPACE_MONO,
} as const;
