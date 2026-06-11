import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6A4C93",
  },

  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 30,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  nomeCurso: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#231942",
    marginBottom: 10,
  },

  descricao: {
    color: "#555",
    marginBottom: 10,
  },

  info: {
    color: "#333",
    marginBottom: 4,
  },

  cancelButton: {
    backgroundColor: "#E53935",
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelText: {
    color: "#FFF",
    fontWeight: "bold",
  },

});