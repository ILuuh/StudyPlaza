import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
} from "react-native";

import { styles } from "../(tabs)/estilo_sobre-nos";

export default function SobreNosScreen() {
    const [modalVisible, setModalVisible] = useState(null);

    return (
        <ScrollView style={styles.container}>
            {/* SOBRE */}
            <View style={styles.sectionSobre}>
                <Text style={styles.titulo}>
                    Sobre o Study Plaza
                </Text>

                <Text style={styles.texto}>
                    No Study Plaza, acreditamos que o aprendizado se torna
                    mais eficiente e motivador quando é compartilhado.
                    Sabemos que muitos estudantes enfrentam desafios ao
                    estudar sozinhos, como falta de organização, acesso a
                    bons materiais ou dificuldade em se conectar com outras
                    pessoas.

                    {"\n\n"}

                    Por isso, criamos uma plataforma que promove o
                    aprendizado colaborativo, onde os usuários podem
                    participar de grupos de estudo, compartilhar materiais,
                    trocar mensagens e crescer juntos em um ambiente
                    respeitoso e inclusivo.

                    {"\n\n"}

                    Além disso, contamos com o apoio de uma inteligência
                    artificial que analisa as postagens dos grupos e gera
                    quizzes personalizados.

                    {"\n\n"}

                    Nosso objetivo é construir uma comunidade ativa e
                    engajada no compartilhamento de conhecimento,
                    tornando o estudo mais acessível, dinâmico e eficiente
                    para todos.
                </Text>

                <Image
                    source={require("../../assets/images/Logo_Fundo_Roxa.png")}
                    style={styles.logo}
                />
            </View>

            {/* EQUIPE */}
            <View style={styles.equipeContainer}>
                <Text style={styles.equipeTitulo}>
                    Conheça nossa equipe
                </Text>

                {/* CARD LUIZ */}
                <View style={styles.card}>
                    <Image
                        source={require("../../assets/images/CartoonLuiz.png")}
                        style={styles.cardImagem}
                    />

                    <Text style={styles.cardNome}>
                        Luiz Gustavo
                    </Text>

                    <TouchableOpacity
                        onPress={() => setModalVisible("luiz")}
                        style={styles.botao}
                    >
                        <Text style={styles.botaoTexto}>
                            Ver sobre o integrante
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* CARD BIANCA */}
                <View style={styles.card}>
                    <Image
                        source={require("../../assets/images/CartoonBianca.png")}
                        style={styles.cardImagem}
                    />

                    <Text style={styles.cardNome}>
                        Bianca
                    </Text>

                    <TouchableOpacity
                        onPress={() => setModalVisible("bianca")}
                        style={styles.botao}
                    >
                        <Text style={styles.botaoTexto}>
                            Ver sobre o integrante
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* MODAL LUIZ */}
            <Modal
                visible={modalVisible === "luiz"}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(null)}
                            style={styles.fecharBotao}
                        >
                            <Text style={styles.fecharTexto}>
                                ✕
                            </Text>
                        </TouchableOpacity>

                        <Image
                            source={require("../../assets/images/CartoonLuiz.png")}
                            style={styles.modalImagem}
                        />

                        <Text style={styles.modalNome}>
                            Luiz Gustavo
                        </Text>

                        <Text style={styles.modalTexto}>
                            Sou Luiz Gustavo, estudante de TI que gosta muito
                            de desenvolvimento e inovação. Tenho foco em criar
                            soluções acessíveis, organizadas e elegantes, com
                            atenção especial à experiência do usuário.
                        </Text>
                    </View>
                </View>
            </Modal>

            {/* MODAL BIANCA */}
            <Modal
                visible={modalVisible === "bianca"}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(null)}
                            style={styles.fecharBotao}
                        >
                            <Text style={styles.fecharTexto}>
                                ✕
                            </Text>
                        </TouchableOpacity>

                        <Image
                            source={require("../../assets/images/CartoonBianca.png")}
                            style={styles.modalImagem}
                        />

                        <Text style={styles.modalNome}>
                            Bianca
                        </Text>

                        <Text style={styles.modalTexto}>
                            Sou a Bianca, estudante de TI, gosto de deixar tudo
                            mais intuitivo e bonito, pensando no público geral.
                        </Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}