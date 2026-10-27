import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import estilo from "./logincss";
import { AuthContext } from "./utils/authContext";

export default function Login() {
  // const [variavel, setVariavel] = useState<tipagem>();
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();
  const auth = useContext(AuthContext);

  function onClicAcessar(text: string) {
    if (login === undefined) return;
    if (password == undefined) return;

    if (auth.logIn(login, password)) {
      router.navigate("/");
    } else {
      Alert.alert("Senha ou Usuário Invalido!!!");
    }

    return;
  }
  return (
    <View style={estilo.container}>
      <View style={estilo.header}>
        <Image
          style={estilo.logo}
          source={require("@/assets/images/favicon.png")}
        />
        <Text style={estilo.title}>Login de acesso</Text>
        <Text style={estilo.subtitle}> bem vindo ao sistema</Text>
      </View>

      <View style={estilo.main}>
        <Text style={estilo.inputTexto}>Usuário</Text>
        <TextInput
          style={estilo.input}
          onChangeText={(value) => {
            setLogin(value);
          }}
          maxLength={100}
          keyboardType="email-address"
          placeholder="informe o login de acesso..."
        />
        <Text style={estilo.inputTexto}>Senha</Text>
        <TextInput
          style={estilo.input}
          onChangeText={(value) => {
            setPassword(value);
          }}
          secureTextEntry
          maxLength={12}
          placeholder="informe a sua senha..."
        />
      </View>

      <View style={estilo.footer}>
        <Text style={estilo.subtitle}>
          {" "}
          caso não tenha cadastro,
          <Link
            style={{ color: "red", fontWeight: 700, fontSize: 14 }}
            href={"/register"}
          >
            <Text> faço o seu registro</Text>{" "}
          </Link>
        </Text>

        <TouchableOpacity
          style={estilo.button}
          onPress={() => {
            onClicAcessar("botao da tela");
          }}
        >
          <Ionicons name="checkmark-circle" size={32} color="#fff" />
          <Text style={estilo.buttonTexto}> Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
