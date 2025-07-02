import { View, Text, StyleSheet } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";

export default function ProfileTab() {
  const { theme } = useThemeSwitcher();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: 24,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile Tab Screen</Text>
    </View>
  );
}
