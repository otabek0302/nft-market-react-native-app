import React from "react";
import { Text } from "./text";
import { TextStyle } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";

export type LabelVariant = "default" | "secondary" | "error" | "success";

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  variant?: LabelVariant;
  style?: TextStyle;
}

export const Label: React.FC<LabelProps> = ({ children, htmlFor, variant = "default", style }) => {
  const { theme } = useThemeSwitcher();

  const getColor = () => {
    switch (variant) {
      case "secondary":
        return theme.colors.card;
      case "error":
        return "#ef4444";
      case "success":
        return "#22c55e";
      default:
        return theme.colors.text;
    }
  };

  return (
    <Text variant="subtitle" accessibilityLabel={htmlFor} style={[{ color: getColor(), marginBottom: 4 }, style]}>
      {children}
    </Text>
  );
};
