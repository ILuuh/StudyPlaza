import { Link } from "expo-router";
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from "./estilo_register";
import { router } from "expo-router";

import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profession, setProfession] = useState('estudante');


  async function handleRegister() {

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert("Preencha todos os campos.");
      return;

    }

    if (password !== confirmPassword) {

      alert("As senhas não coincidem.");
      return;

    }

    try {

      const response = await api.post(
        "/register",
        {
          nome: name,
          email,
          senha: password,
          tipo_usuario: profession
        }
      );

      alert(
        response.data.mensagem
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      alert("Cadastro realizado com sucesso!");

      router.replace("/");
    } catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.mensagem ||
        "Erro ao cadastrar usuário."
      );

    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>

        <Text style={styles.title}>
          Venha fazer parte do Study Plaza
        </Text>

        {/* NOME */}
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* EMAIL */}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* SENHA */}
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* CONFIRMAR SENHA */}
        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* SELECT (PROFISSÃO) */}
        <Text style={styles.label}>Qual é sua profissão:</Text>
        <View style={styles.select}>
          <Picker
            selectedValue={profession}
            onValueChange={(itemValue) => setProfession(itemValue)}
          >
            <Picker.Item label="Estudante" value="estudante" />
            <Picker.Item label="Professor" value="professor" />
          </Picker>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* VOLTAR */}
        <TouchableOpacity>
          <Link href={"/"} style={styles.link}>Voltar</Link>
        </TouchableOpacity>

      </View>
    </View>
  );
}