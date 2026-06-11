import api from "../../services/api";

import { Link, useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./estilo_index";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleLogin() {
    let valid = true;

    if (!email.trim()) {
      setEmailError("O campo E-mail é obrigatório.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("O campo Senha é obrigatório.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "A senha deve ter no mínimo 6 caracteres."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      const response = await api.post("/login", {
        email: email,
        senha: password,
      });

      console.log(response.data);

      if (response.data.sucesso) {

        await AsyncStorage.setItem(
          "usuario",
          JSON.stringify(response.data.usuario)
        );

        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.log(error);

      setLoginError(
        error.response?.data?.mensagem ||
        "E-mail ou senha inválidos."
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>
          Bem-vindo ao Study Plaza
        </Text>

        {loginError ? (
          <Text style={styles.error}>
            {loginError}
          </Text>
        ) : null}

        <Text style={styles.label}>
          Email:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {emailError ? (
          <Text style={styles.error}>
            {emailError}
          </Text>
        ) : null}

        <Text style={styles.label}>
          Senha:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {passwordError ? (
          <Text style={styles.error}>
            {passwordError}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Link
            style={styles.link}
            href="/register"
          >
            Cadastre-se aqui
          </Link>
        </Text>
      </View>
    </View>
  );
}