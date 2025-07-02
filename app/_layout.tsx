import Animated from "react-native-reanimated";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useThemeSwitcher } from "@/context/theme-context";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import { loadFonts } from "@/utils/fonts";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { isDark } = useThemeSwitcher();
  const { theme } = useThemeSwitcher();

  useEffect(() => {
    async function loadAppFonts() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
        setFontsLoaded(true);
      }
    }

    loadAppFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        {/* <StatusBar backgroundColor={isDark ? "#000" : "#fff"} barStyle={isDark ? "light-content" : "dark-content"} /> */}
        <ThemeProvider>
          <Animated.View entering={FadeIn} exiting={FadeOut} style={{ flex: 1 }}>
            <Header />
            <Slot />
            <Footer />
          </Animated.View>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
