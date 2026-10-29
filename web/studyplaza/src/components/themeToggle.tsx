import React from "react";

import { Pressable, Text, StyleSheet } from "react-native";

import { useTheme } from "@/app/utils/themeContext";

export default function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.primary,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: theme.colors.textInverse,
          },
        ]}
      >
        {isDark ? "☀️ Tema claro" : "🌙 Tema escuro"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});