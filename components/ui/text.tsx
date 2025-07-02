import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { fontFamily } from "@/utils/fonts";
import { useThemeSwitcher } from "@/context/theme-context";

export type TextVariant = "display" | "heading" | "title" | "subtitle" | "body" | "caption" | "button" | "small" | "tiny";

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
}

export const Text: React.FC<CustomTextProps> = ({ variant = "body", style, children, ...props }) => {
  const { theme } = useThemeSwitcher();

  const getVariantStyle = () => {
    switch (variant) {
      case "display":
        return styles.display;
      case "heading":
        return styles.heading;
      case "title":
        return styles.title;
      case "subtitle":
        return styles.subtitle;
      case "caption":
        return styles.caption;
      case "small":
        return styles.small;
      case "tiny":
        return styles.tiny;
      case "button":
        return styles.button;
      default:
        return styles.body;
    }
  };

  return (
    <RNText style={[styles.base, getVariantStyle(), { color: theme.colors.text }, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: fontFamily.spaceMono,
  },
  display: {
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.85,
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    opacity: 0.7,
  },
  small: {
    fontSize: 12,
  },
  tiny: {
    fontSize: 10,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
