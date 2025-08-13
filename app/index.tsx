import { View, StyleSheet, Image, TextInput } from "react-native";
import { router } from "expo-router";
import { useThemeSwitcher } from "@/context/theme-context";
import { useAccount } from "@/context/account-context";
import { Button, Text } from "@/components/ui";
import { useState } from "react";
import { getAccount } from "@/lib/opensea";

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.colors.background,
      paddingHorizontal: 24,
    },
    content: {
      width: "100%",
      justifyContent: "flex-start",
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: 280,
      borderRadius: 100,
      overflow: "hidden",
    },
    image: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
    },
    input: {
      width: "100%",
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      marginTop: 20,
      color: theme.colors.text,
      backgroundColor: theme.colors.card,
    },
    error: {
      width: "100%",
      marginTop: 4,
      paddingStart: 4,
      fontSize: 12,
      color: theme.colors.error,
      textAlign: "left",
    },
    button: {
      marginTop: 14,
      borderRadius: 12,
    },
    footer: {
      paddingVertical: 20,
    },
    footerText: {
      color: theme.colors.text,
      fontSize: 12,
      textAlign: "center",
      opacity: 0.7,
    },
  });

export default function HomeScreen() {
  const { theme } = useThemeSwitcher();
  const { setAccount, clearAccount } = useAccount();
  const styles = createStyles(theme);
  
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    try {
      if (!username.trim()) {
        setError("Please enter a username");
        return;
      }

      setLoading(true);
      setError("");
      clearAccount();

      const account = await getAccount(username.trim());

      if (!account?.address) {
        setError("No account found");
        return;
      }

      setAccount(account);
      router.push("/collections");
    } catch (error) {
      setError("Error fetching account");
      console.error("Error fetching account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={require("@/assets/images/open-sea.png")} 
            style={styles.image} 
            resizeMode="cover" 
          />
        </View>

        <Text variant="subtitle" style={{ marginTop: 20, color: theme.colors.text, textAlign: "center" }}>
          Welcome to NFT Marketplace
        </Text>

        <TextInput 
          placeholder="Enter OpenSea username" 
          placeholderTextColor={theme.colors.text} 
          value={username} 
          onChangeText={setUsername} 
          autoCapitalize="none" 
          autoCorrect={false} 
          style={styles.input} 
          returnKeyType="go" 
        />
        
        {error && (
          <Text variant="error" style={styles.error}>
            {error}
          </Text>
        )}

        <Button 
          variant="outline" 
          size="sm" 
          onPress={handleStart} 
          disabled={loading} 
          style={styles.button}
        >
          <Text variant="button" style={{ color: theme.colors.primary }}>
            {loading ? "Loading..." : "Get Started"}
          </Text>
        </Button>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by OpenSea. Enter your OpenSea username above to get started.
        </Text>
      </View>
    </View>
  );
}
