import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f4f6f9',
    },

    /* HEADER */
    headerCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 4,
        marginBottom: 20,
    },

    avatarContainer: {
        marginBottom: 15,
    },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },

    infoBasica: {
        alignItems: 'center',
    },

    nome: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
    },

    username: {
        fontSize: 16,
        color: '#777',
        marginTop: 5,
    },

    /* NAV */
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },

    navItemActive: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4f46e5',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        gap: 10,
    },

    navTextActive: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

    /* CONTENT */
    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#222',
    },

    configView: {
        gap: 18,
    },

    formGroup: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 15,
        elevation: 2,
    },

    label: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },

    fieldValue: {
        backgroundColor: '#f1f3f5',
        padding: 12,
        borderRadius: 10,
    },

    fieldText: {
        fontSize: 16,
        color: '#222',
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#ef4444',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        gap: 10,
    },

    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    meusCursosButton: {
        backgroundColor: "#6A4C93",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
    },

    meusCursosText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },

    salvarButton: {
        backgroundColor: "#28a745",
        borderRadius: 10,
        padding: 14,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    salvarText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
});
