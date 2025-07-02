import { View, StyleSheet } from "react-native";
import { useThemeSwitcher } from "@/context/theme-context";
import { Text } from "@/components/ui";

export default function HomeTab() {
  const { theme } = useThemeSwitcher();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="subtitle">
        Welcome to NFT Marketplace
      </Text>
    </View>
  );
}
