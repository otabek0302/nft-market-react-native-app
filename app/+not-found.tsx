import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

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
      fontSize: 20,
      marginBottom: 20,
      color: theme.colors.text,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={120} color={theme.colors.primary} />
      <Text style={styles.text}>Page not found.</Text>
      <Button onPress={() => router.replace("/")} style={styles.button}>
        <Text variant="button" style={{color: theme.colors.background}}>Go Home</Text>
      </Button>
    </View>
  );
}
