import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding: 20,
    },

    introSection: {
        marginBottom: 30,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#6A4C93",
        marginBottom: 20,
        textAlign: "center",
    },

    texto: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
        marginBottom: 12,
        textAlign: "justify",
    },

    cursosContainer: {
        marginBottom: 40,
    },

    cursosTitulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6A4C93",
        marginBottom: 20,
        textAlign: "center",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
        borderTopWidth: 5,
        borderTopColor: "#A88BEB",
    },

    cardTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#6A4C93",
        marginBottom: 12,
    },

    cardTexto: {
        fontSize: 15,
        color: "#333",
        lineHeight: 22,
        marginBottom: 12,
        textAlign: "justify",
    },

    info: {
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
    },

    botao: {
        marginTop: 14,
        backgroundColor: "#6A4C93",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    botaoTexto: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },

    ctaContainer: {
        backgroundColor: "#6A4C93",
        padding: 25,
        borderRadius: 20,
        marginBottom: 40,
    },

    ctaTitulo: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },

    ctaTexto: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 20,
    },

    ctaBotao: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },

    ctaBotaoTexto: {
        color: "#6A4C93",
        fontWeight: "bold",
        fontSize: 16,
    },

});