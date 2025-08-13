import React, { useState } from "react";
import { Modal, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "./text";
import { Button } from "./button";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onValueChange, placeholder = "Select...", label, disabled = false }) => {
  const { theme } = useThemeSwitcher();
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View style={{ marginVertical: 8 }}>
      {label && (
        <Text variant="subtitle" style={{ marginBottom: 4 }}>
          {label}
        </Text>
      )}
      <Button variant="outline" onPress={() => setVisible(true)} disabled={disabled} style={{ justifyContent: "flex-start", minWidth: 120 }}>
        {selectedOption ? (
          <Text variant="body" style={{ color: theme.colors.text }}>
            {selectedOption.label}
          </Text>
        ) : (
          <Text variant="body" style={{ color: theme.colors.text + "99" }}>
            {placeholder}
          </Text>
        )}
      </Button>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setVisible(false)}>
          <View style={[styles.modal, { backgroundColor: theme.colors.card }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}>
                  <Text variant={item.value === value ? "heading" : "body"} style={{ color: theme.colors.text }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    minWidth: 220,
    borderRadius: 12,
    padding: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
