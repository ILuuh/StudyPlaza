import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useAppTheme } from "../../hooks/use-theme-context";

// Importa o SVG como um componente React
import Logo from "../../assets/images/Logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { createStyles } from "@/styles/auth/login";

export default function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      // O signIn do AuthContext já faz o POST em /auth/login,
      // salva o token e redireciona para /(tabs)/dash
      await signIn({
        login: email.trim(),
        password,
      });

      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log("Erro no login:", error);
      alert(error.message || "Erro ao realizar login. Verifique as suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const { theme, toggleTheme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", flexDirection: "column" }}>
        <Logo width={130} height={130} style={styles.logoImage} />
        <Text style={styles.title}>Study Plaza</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.title2}>Bem-vindo a Nossa Plataforma!</Text>
        </View>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={theme.corFonteSecundaria}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.corFonteSecundaria}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, isSubmitting && { opacity: 0.7 }]}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <Link href="/register" style={styles.link}>
            Cadastre-se aqui
          </Link>
        </View>

        <TouchableOpacity onPress={toggleTheme} style={{ marginTop: 20 }}>
          <Text
            style={{
              color: theme.roxoClaro,
              textAlign: "center",
              fontSize: 13,
            }}
          >
            🔄 Alternar Tema
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
