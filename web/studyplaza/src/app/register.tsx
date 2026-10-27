import { Text, TextInput, View, Image, Button, TouchableOpacity, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import estilo  from "./logincss";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

export default function Register() {
  // const [variavel, setVariavel] = useState<tipagem>();
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, SetName] = useState<string>();
  const router = useRouter();

  function onClicAcessar( text:string){
    console.log( text, login, password);
    if ( login == "teste" && password == "123") {
        router.navigate("/_sitemap")
    } else {
      Alert.alert("Senha ou Usuário Invalido!!!")
    }
    return
  }
  return (
    <View style={estilo.container}>
      <View style={estilo.header}>
          <Image style={estilo.logo} source={require("@/assets/images/favicon.png")} />
          <Text style={estilo.title}>Registro de Usuário</Text>
          <Text style={estilo.subtitle}>Agradecemos seu apoio, por favor preencha  os dados</Text>
      </View>

      <View style={estilo.main}>

        <Text style={estilo.inputTexto}>Nome Completo</Text>
        <TextInput style={estilo.input} 
          onChangeText={ (value)=>{SetName(value)} }
          maxLength={70}
          keyboardType="ascii-capable"
          placeholder="informe o nome completo ..."
        />

        <Text style={estilo.inputTexto}>Login/Email</Text>
        <TextInput style={estilo.input} 
          onChangeText={ (value)=>{setLogin(value)} }
          maxLength={100}
          keyboardType="email-address"
          placeholder="informe o login/email de acesso..."
        />
        <Text style={estilo.inputTexto}>Senha</Text>
        <TextInput style={estilo.input} 
          onChangeText={ (value)=>{ setPassword(value) } } 
          secureTextEntry
          maxLength={12}
          placeholder="informe a sua senha..."
        />
      </View>

      <View style={estilo.footer}>
        <Text style={estilo.subtitle} > Já possui cadastro,
          <Link 
            style={{color:"red", fontWeight:700, fontSize: 14}}
            href={"/login"}
            >
              <Text > faça o login aqui !</Text> </Link>
          </Text>
        <TouchableOpacity 
          style={estilo.button}
          onPress={ ()=>{ onClicAcessar("botao da tela")} }
          >
           <Ionicons name="checkmark-circle" size={32} color="#fff" />
          <Text style={estilo.buttonTexto}> Acessar</Text>
        </TouchableOpacity>
      </View>    

    </View>
  );
}