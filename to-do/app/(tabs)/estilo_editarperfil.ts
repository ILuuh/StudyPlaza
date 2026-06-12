import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },

    content: {
        padding: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 25,
        textAlign: "center",
    },

    formGroup: {
        marginBottom: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },

    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: "#111827",
    },

    salvarButton: {
        backgroundColor: "#2563EB",
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 3,
    },

    salvarText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,

        elevation: 2,
    },
});