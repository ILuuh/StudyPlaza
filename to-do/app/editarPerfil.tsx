import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import api from "../services/api";


import { styles } from "./(tabs)/estilo_editarperfil";

export default function EditarPerfil() {
    const [id, setId] = useState<number | null>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        const usuarioStorage =
            await AsyncStorage.getItem("usuario");

        if (!usuarioStorage) return;

        const usuario = JSON.parse(usuarioStorage);

        setId(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
    }

    async function handleSalvar() {
        try {
            if (!id) return;

            await api.put(`/usuarios/${id}`, {
                nome,
                email,
            });

            router.back();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Editar Perfil
                </Text>

                <View style={styles.card}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>
                            Nome
                        </Text>

                        <TextInput
                            value={nome}
                            onChangeText={setNome}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>
                            E-mail
                        </Text>

                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSalvar}
                        style={styles.salvarButton}
                    >
                        <Text style={styles.salvarText}>
                            Salvar Alterações
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}