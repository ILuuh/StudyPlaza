import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
} from "react-native";

import api from "../../services/api";
import { styles } from "../(tabs)/estilo_cursos";
import { Link } from "expo-router";

type Curso = {
    id: number;
    titulo: string;
    descricao: string;
    url: string;
    plataforma: string;
    modalidade: string;
    duracao_semestres: string;
};

export default function CursosScreen() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function buscarCursos() {
        try {
            const response = await api.get("/cursos");
            setCursos(response.data);
        } catch (error) {
            console.log("Erro ao buscar cursos:", error);
        }
    }

    useEffect(() => {
        buscarCursos().finally(() => {
            setCarregando(false);
        });
    }, []);

    const abrirLink = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.introSection}>
                <Text style={styles.titulo}>
                    Explore os Melhores Cursos Complementares
                </Text>

                <Text style={styles.texto}>
                    Na Study Plaza, reunimos cursos de nossos parceiros
                    para que você possa acompanhar seu progresso
                    em um só lugar.
                </Text>

                <Text style={styles.texto}>
                    Aqui, você visualiza seu andamento, recebe
                    recomendações e descobre novas formações
                    para continuar evoluindo.
                </Text>

                <Text style={styles.texto}>
                    Veja nossos cursos oferecidos abaixo:
                </Text>
            </View>

            <View style={styles.cursosContainer}>
                <Text style={styles.cursosTitulo}>
                    Cursos
                </Text>

                {carregando ? (
                    <ActivityIndicator size="large" color="#b30000" />
                ) : (
                    cursos.map((curso) => (
                        <View key={curso.id} style={styles.card}>
                            <Text style={styles.cardTitulo}>
                                {curso.titulo}
                            </Text>

                            <Text style={styles.cardTexto}>
                                {curso.descricao}
                            </Text>

                            <Text style={styles.info}>
                                Instituição: {curso.plataforma}
                            </Text>

                            <Text style={styles.info}>
                                Modalidade: {curso.modalidade}
                            </Text>

                            <Text style={styles.info}>
                                Duração: {curso.duracao_semestres}
                            </Text>

                            <TouchableOpacity
                                style={styles.botao}
                                onPress={() => abrirLink(curso.url)}
                            >
                                <Text style={styles.botaoTexto}>
                                    Ver curso
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.botao}
                            >
                                <Link
                                    style={styles.botaoTexto}
                                    href="/inscricao"
                                >
                                    Inscrever-se
                                </Link>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

            <View style={styles.ctaContainer}>
                <Text style={styles.ctaTitulo}>
                    Quer saber mais?
                </Text>

                <Text style={styles.ctaTexto}>
                    Se quiser saber mais sobre nossos cursos,
                    grupos de estudo e recursos disponíveis,
                    cadastre-se no nosso site e tenha acesso
                    completo à plataforma Study Plaza.
                </Text>

                <TouchableOpacity style={styles.ctaBotao}>
                    <Text style={styles.ctaBotaoTexto}>
                        Quero me cadastrar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}