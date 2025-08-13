import React from "react";

import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "./text";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface MenuItem {
  label: string;
  href: string;
  icon?: string;
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { label: "Profile", href: "/profile", icon: "person" },
  { label: "Collections", href: "/collections", icon: "list" },
];

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const { theme } = useThemeSwitcher();
  const router = useRouter();

  const handleNavigation = (href: MenuItem["href"]) => {
    router.push(href as any);
    onClose();
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade" presentationStyle="overFullScreen" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.menuContainer, { backgroundColor: theme.colors.card }]}>
          <View style={styles.header}>
            <Text variant="heading" style={{ color: theme.colors.text, fontSize: 24 }}>
              Menu
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text variant="title" style={{ color: theme.colors.text }}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.menuItem, { borderBottomColor: theme.colors.background }]} onPress={() => handleNavigation(item.href)}>
                <Ionicons name={item.icon as any} size={16} color={theme.colors.primary} style={{ marginRight: 8 }} />
                <Text variant="body" style={{ color: theme.colors.text }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text variant="caption" style={{ color: theme.colors.text, textAlign: "center" }}>
              NFT Marketplace v1.0
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 280,
    height: "100%",
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 40,
  },
  closeButton: {
    padding: 8,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
});
