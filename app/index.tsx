import { View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { useThemeSwitcher } from "@/context/theme-context";
import { Button, Text } from "@/components/ui";

export default function HomeScreen() {
  const { theme } = useThemeSwitcher();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: 200,
      padding: 8,
      backgroundColor: theme.colors.background,
      borderWidth: 1.2,
      borderColor: theme.colors.primary,
      borderRadius: 100,
      overflow: "hidden",
    },
    image: {
      width: 150,
      height: 150,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("@/assets/images/logo.png")} style={styles.image} resizeMode="contain" />
      </View>
      <Text variant="subtitle" style={{ marginVertical: 20 }}>
        Welcome to NFT Marketplace
      </Text>
      <Link href="/home" asChild>
        <Button variant="outline" size="sm">
          <Text variant="button" style={{ color: theme.colors.text }}>
            Get Started
          </Text>
        </Button>
      </Link>
    </View>
  );
}
