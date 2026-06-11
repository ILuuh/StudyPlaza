import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

import { styles } from "./estilo_perfil";

type Usuario = {
    id: number;
    nome: string;
    email: string;
    tipo_usuario: string;
};

export default function PerfilScreen() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    async function carregarPerfil() {
        try {
            const usuarioStorage =
                await AsyncStorage.getItem("usuario");

            if (!usuarioStorage) {
                return;
            }

            const usuarioLogado = JSON.parse(usuarioStorage);

            const response = await api.get(
                `/usuarios/${usuarioLogado.id}`
            );

            setUsuario(response.data);
        } catch (error) {
            console.log("Erro ao carregar perfil:", error);
        }
    }

    async function handleLogout() {

        try {
            await AsyncStorage.removeItem("usuario");

            router.replace("../(auth)");
        } catch (error) {
            console.log("Erro ao sair:", error);
        }
    }
    function handleMeusCursos() {
        router.push("/meusCursos");
    }

    useEffect(() => {
        carregarPerfil();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* HEADER PERFIL */}
            <View style={styles.headerCard}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require("../../assets/images/icon-7797704_1280.png")}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.infoBasica}>
                    <Text style={styles.nome}>
                        {usuario?.nome || "Carregando..."}
                    </Text>

                    <Text style={styles.username}>
                        {usuario?.email || ""}
                    </Text>
                </View>
            </View>

            {/* CONTEÚDO */}
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>
                    Configurações da Conta
                </Text>

                <View style={styles.configView}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>
                            Nome Completo
                        </Text>

                        <View style={styles.fieldValue}>
                            <Text style={styles.fieldText}>
                                {usuario?.nome || ""}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>
                            E-mail
                        </Text>

                        <View style={styles.fieldValue}>
                            <Text style={styles.fieldText}>
                                {usuario?.email || ""}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>
                            Tipo de Usuário
                        </Text>

                        <View style={styles.fieldValue}>
                            <Text style={styles.fieldText}>
                                {usuario?.tipo_usuario || ""}
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.meusCursosButton}
                    onPress={handleMeusCursos}
                >
                    <Ionicons
                        name="book-outline"
                        size={22}
                        color="#fff"
                    />

                    <Text style={styles.meusCursosText}>
                        Ver Meus Cursos
                    </Text>
                </TouchableOpacity>

                {/* BOTÃO SAIR */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={22}
                        color="#fff"
                    />

                    <Text style={styles.logoutText}>
                        Sair da Conta
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}