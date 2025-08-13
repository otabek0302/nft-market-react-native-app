import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { ThemeProvider, useThemeSwitcher } from "@/context/theme-context";
import { AccountProvider } from "@/context/account-context";
import { MyStatusBar } from "@/context/status-bar";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { loadFonts } from "@/utils/fonts";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadAppFonts();
  }, []);

  const loadAppFonts = async () => {
    try {
      await loadFonts();
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
      setFontsLoaded(true);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AccountProvider>
          <AppContent />
        </AccountProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { theme, statusBarConfig } = useThemeSwitcher();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <MyStatusBar backgroundColor={statusBarConfig.backgroundColor} barStyle={statusBarConfig.barStyle} />
      <Header />
      <Slot />
      <Footer />
    </Animated.View>
  );
}
