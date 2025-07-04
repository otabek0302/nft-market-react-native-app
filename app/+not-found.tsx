import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useThemeSwitcher } from "@/context/theme-context";

export default function NotFound() {
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
      marginBottom: 20,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>❌ Oops! Page not found.</Text>
      <Button title="Go Home" onPress={() => router.replace("/")} />
    </View>
  );
}
