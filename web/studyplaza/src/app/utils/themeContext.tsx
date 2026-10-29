import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipo que representa as cores do aplicativo
export type ThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;

  background: string;
  surface: string;
  surfaceSecondary: string;

  text: string;
  textSecondary: string;
  textInverse: string;

  border: string;
  active: string;
  hover: string;
  focus: string;

  success: string;
  error: string;
};

// Tipo que representa o tema completo
export type Theme = {
  mode: "light" | "dark";
  colors: ThemeColors;
};

// Tipo para a preferência de tema
export type ThemeMode = "light" | "dark";

// Tipo dos valores disponibilizados pelo contexto
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  isThemeLoaded: boolean;
};

// Tipo das propriedades do Provider
type ThemeProviderProps = {
  children: ReactNode;
};

// Tema claro
const lightTheme: Theme = {
  mode: "light",

  colors: {
    primary: "#6a4c93",
    primaryLight: "#a88beb",
    primaryDark: "#231942",

    background: "#f9f9f9",
    surface: "#ffffff",
    surfaceSecondary: "#f3f0f8",

    text: "#333333",
    textSecondary: "#666666",
    textInverse: "#ffffff",

    border: "#dddddd",
    active: "#bfdfff",
    hover: "#231942",
    focus: "#a88beb",

    success: "#2e7d32",
    error: "#e63946",
  },
};

// Tema escuro
const darkTheme: Theme = {
  mode: "dark",

  colors: {
    primary: "#a88beb",
    primaryLight: "#cdb4db",
    primaryDark: "#231942",

    background: "#171421",
    surface: "#231942",
    surfaceSecondary: "#30234d",

    text: "#f5f5f5",
    textSecondary: "#c4c0cc",
    textInverse: "#231942",

    border: "#493b62",
    active: "#6a4c93",
    hover: "#a88beb",
    focus: "#cdb4db",

    success: "#81c784",
    error: "#ff6b6b",
  },
};

// Criando o contexto com tipagem
const ThemeContext = createContext<ThemeContextType | null>(null);

// Provider global
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false);

  // Carrega o tema salvo no dispositivo
  useEffect(() => {
    async function loadTheme(): Promise<void> {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");

        setIsDark(savedTheme === "dark");
      } catch (error) {
        console.error("Erro ao carregar o tema:", error);
      } finally {
        setIsThemeLoaded(true);
      }
    }

    loadTheme();
  }, []);

  // Alterna e salva o tema
  async function toggleTheme(): Promise<void> {
    const newTheme = !isDark;

    setIsDark(newTheme);

    try {
      await AsyncStorage.setItem("appTheme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Erro ao salvar o tema:", error);
    }
  }

  // Define o tema atual
  const theme: Theme = isDark ? darkTheme : lightTheme;

  // Valores compartilhados com os componentes
  const contextValue: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    isThemeLoaded,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme deve ser utilizado dentro de ThemeProvider");
  }

  return context;
}
