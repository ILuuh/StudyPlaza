import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  sectionSobre: {
    marginBottom: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  texto: {
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    marginBottom: 25,
  },

  logo: {
    width: 220,
    height: 220,
    alignSelf: "center",
    resizeMode: "contain",
  },

  equipeContainer: {
    marginBottom: 40,
  },

  equipeTitulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f4f4f4",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  cardImagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  cardNome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#6d28d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "100%",
  },

  fecharBotao: {
    alignSelf: "flex-end",
  },

  fecharTexto: {
    fontSize: 24,
    fontWeight: "bold",
  },

  modalImagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15,
  },

  modalNome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  modalTexto: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});