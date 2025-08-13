import React from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MyStatusBarProps {
  backgroundColor: string;
  barStyle?: "default" | "light-content" | "dark-content";
}

export const MyStatusBar: React.FC<MyStatusBarProps> = ({ backgroundColor, barStyle = "default" }) => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === "ios") {
    return (
      <View style={[styles.statusBar, { backgroundColor, height: insets.top }]}>
        <StatusBar translucent backgroundColor="transparent" barStyle={barStyle} />
      </View>
    );
  }

  return <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />;
};

const styles = StyleSheet.create({
  statusBar: {
    width: "100%",
  },
});
