import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "@/components/ui";

export default function Footer() {
  const { theme } = useThemeSwitcher();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingTop: 2,
      paddingBottom: 16,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderColor: theme.colors.border,
    },
    copyright: {
      textAlign: "center",
      paddingTop: 16,
      paddingBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.copyright}>
        <Text variant="small" style={{ color: theme.colors.text }}>© 2025 NFT Marketplace. All rights reserved.</Text>
      </View>
    </View>
  );
}
