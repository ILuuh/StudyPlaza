import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import AsyncStorage
  from "@react-native-async-storage/async-storage";

import api from "../services/api";

import { styles } from "./(tabs)/estilo_meusCursos";

type Curso = {
  id: number;
  id_inscricao: number;
  titulo: string;
  descricao: string;
  plataforma: string;
  modalidade: string;
  duracao_semestres: string;
};

export default function MeusCursosScreen() {

  const [cursos, setCursos] =
    useState<Curso[]>([]);

  async function buscarCursos() {

    try {

      const usuarioStorage =
        await AsyncStorage.getItem(
          "usuario"
        );

      if (!usuarioStorage) {
        return;
      }

      const usuario =
        JSON.parse(usuarioStorage);

      const response = await api.get(
        `/meusCursos/${usuario.id}`
      );
      setCursos(response.data);

    } catch (error) {

      console.log(
        "Erro ao buscar cursos:",
        error
      );

    }

  }

  async function cancelarInscricao(
    idInscricao: number
  ) {

    const confirmar = window.confirm(
      "Deseja realmente cancelar esta inscrição?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await api.delete(
        `/inscricoes/${idInscricao}`
      );

      alert("Inscrição cancelada com sucesso!");

      buscarCursos();

    } catch (error) {

      console.log(error);

      alert(
        "Não foi possível cancelar a inscrição."
      );

    }

  }

  useEffect(() => {
    buscarCursos();
  }, []);

  return (
    <ScrollView
      style={styles.container}
    >

      <Text style={styles.title}>
        Meus Cursos
      </Text>

      {cursos.length === 0 && (
        <Text style={styles.empty}>
          Você ainda não possui cursos inscritos.
        </Text>
      )}

      {cursos.map((curso) => (

        <View
          key={curso.id_inscricao}
          style={styles.card}
        >

          <Text style={styles.nomeCurso}>
            {curso.titulo}
          </Text>

          <Text style={styles.descricao}>
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
            style={styles.cancelButton}
            onPress={() => cancelarInscricao(curso.id_inscricao)}
          >
            <Text style={styles.cancelText}>
              Cancelar Inscrição
            </Text>
          </TouchableOpacity>
        </View>

      ))}

    </ScrollView>
  );
}