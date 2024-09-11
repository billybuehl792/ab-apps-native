import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import GlobalsProvider from "@/context/GlobalContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  /** Effects */

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded || error) return;
  return (
    <GlobalsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="sign-in"
          options={{ gestureDirection: "vertical" }}
        />
        <Stack.Screen name="(app)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalsProvider>
  );
};

export default RootLayout;
