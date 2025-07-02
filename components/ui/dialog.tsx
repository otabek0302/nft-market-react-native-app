import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "./text";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, title, description, children, actions }) => {
  const { theme } = useThemeSwitcher();

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.dialog, { backgroundColor: theme.colors.card }]}>
          {title && (
            <Text variant="heading" style={{ marginBottom: 8 }}>
              {title}
            </Text>
          )}
          {description && (
            <Text variant="body" style={{ marginBottom: 12, opacity: 0.8 }}>
              {description}
            </Text>
          )}
          {children}
          {actions && <View style={styles.actions}>{actions}</View>}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    minWidth: 260,
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 8,
  },
});
