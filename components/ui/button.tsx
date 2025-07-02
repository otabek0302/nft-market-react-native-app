import React from "react";
import { TouchableOpacity, ViewStyle, StyleSheet, ActivityIndicator, GestureResponderEvent, FlexAlignType } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "./text";

export type ButtonVariant = "default" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(({ children, onPress, variant = "default", size = "md", loading = false, disabled = false, style }, ref) => {
  const { theme } = useThemeSwitcher();

  const getVariantStyle = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
        };
      case "destructive":
        return {
          backgroundColor: "#ef4444",
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
        };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 18, minWidth: 64, minHeight: 40 };
      case "lg":
        return { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 28, minWidth: 64, minHeight: 40 };
      case "icon":
        return { width: 40, height: 40, borderRadius: 12, alignItems: "center" as FlexAlignType, justifyContent: "center" as ViewStyle["justifyContent"], padding: 0 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, minWidth: 64, minHeight: 40 };
    }
  };

  return (
    <TouchableOpacity ref={ref} style={[styles.base, getVariantStyle(), getSizeStyle(), disabled && styles.disabled, style]} onPress={onPress} activeOpacity={0.85} disabled={disabled || loading}>
      {loading ? <ActivityIndicator color={variant === "outline" || variant === "ghost" ? theme.colors.primary : "#fff"} /> : children}
    </TouchableOpacity>
  );
});

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});
