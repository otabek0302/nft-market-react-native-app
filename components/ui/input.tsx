import React from "react";
import { TextInput, TextInputProps, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "./text";

interface InputProps extends TextInputProps {
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({ error, containerStyle, ...props }) => {
  const { theme } = useThemeSwitcher();

  return (
    <View style={containerStyle}>
      <TextInput style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: error ? "#ef4444" : theme.colors.primary }, props.editable === false && styles.disabled, props.style]} placeholderTextColor={theme.colors.text + "99"} {...props} />
      {error ? (
        <Text variant="caption" style={{ color: "#ef4444", marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});
