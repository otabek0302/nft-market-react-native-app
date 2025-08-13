import React from "react";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Menu } from "@/components/ui/menu";
import { useRouter } from "expo-router";
import { Button } from "../ui";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { theme, isDark, toggleTheme } = useThemeSwitcher();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 4,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.card,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 48,
      height: 48,
      marginRight: 8,
    },
    icon: {
      width: 24,
      height: 24,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => router.push("/")}>
          <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
        <View style={styles.row}>
          <Button variant="ghost" size="icon" onPress={toggleTheme} style={{ backgroundColor: theme.colors.card, borderRadius: 8 }}>
            {isDark ? <Ionicons name="sunny" size={18} color={theme.colors.primary} /> : <Ionicons name="moon" size={18} color={theme.colors.primary} />}
          </Button>
          <Button variant="ghost" size="icon" onPress={() => setIsMenuOpen(true)} style={{ backgroundColor: theme.colors.card, borderRadius: 8 }}>
            <Ionicons name="menu" size={24} color={theme.colors.primary} />
          </Button>
        </View>
      </View>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}


