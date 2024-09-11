import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AuthProvider from "./AuthContext";
import { useColorScheme } from "react-native";

const GlobalsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <AuthProvider>{children}</AuthProvider>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default GlobalsProvider;
