import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  formContainer: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 25,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#231942",
    textAlign: "center",
    marginBottom: 10,
  },

  introText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
  },

  fieldset: {
    borderWidth: 1,
    borderColor: "#A88BEB",
    borderRadius: 8,
    padding: 15,
    marginBottom: 25,
  },

  legend: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6A4C93",
    marginBottom: 20,
  },

  formGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },

  submitButton: {
    backgroundColor: "#6A4C93",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
});