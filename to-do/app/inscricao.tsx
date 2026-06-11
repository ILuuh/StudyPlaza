import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

import { Picker } from "@react-native-picker/picker";

import { styles } from "./(tabs)/estilo_inscricao";
import { router } from "expo-router";

type Curso = {
    id: number;
    titulo: string;
};

export default function InscricaoScreen() {
    const [curso, setCurso] = useState("");

    const [cursos, setCursos] =
        useState<Curso[]>([]);

    async function buscarCursos() {
        try {

            const response =
                await api.get("/cursos");

            setCursos(response.data);

        } catch (error) {

            console.log(
                "Erro ao buscar cursos:",
                error
            );

        }
    }

    async function finalizarInscricao() {

        if (!curso) {

            alert("Selecione um curso.");

            return;
        }

        try {

            const usuarioStorage =
                await AsyncStorage.getItem(
                    "usuario"
                );

            if (!usuarioStorage) {

                alert(
                    "Usuário não encontrado."
                );

                return;
            }

            const usuario =
                JSON.parse(usuarioStorage);

            await api.post(
                "/inscricoes",
                {
                    id_usuario: usuario.id,
                    id_curso: Number(curso)
                }
            );

            alert(
                "Inscrição realizada com sucesso!"
            );

            router.push("/meusCursos");

            setCurso("");



        } catch (error) {

            console.log(error);

            alert(
                "Erro ao realizar inscrição."
            );

        }
    }

    useEffect(() => {
        buscarCursos();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>
                    Inscrição para o Curso
                </Text>

                <Text style={styles.introText}>
                    Preencha o formulário abaixo para garantir sua vaga
                    e iniciar seu processo de matrícula.
                </Text>

                <View style={styles.fieldset}>
                    <Text style={styles.legend}>
                        Seleção do Curso
                    </Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>
                            Curso Escolhido *
                        </Text>

                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={curso}
                                onValueChange={(itemValue) =>
                                    setCurso(itemValue)
                                }
                            >
                                <Picker.Item
                                    label="Selecione um curso"
                                    value=""
                                />

                                {cursos.map((item) => (
                                    <Picker.Item
                                        key={item.id}
                                        label={item.titulo}
                                        value={item.id.toString()}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={finalizarInscricao}
                >
                    <Text style={styles.submitButtonText}>
                        Finalizar Inscrição
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}