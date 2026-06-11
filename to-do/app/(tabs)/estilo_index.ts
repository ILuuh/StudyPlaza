import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  /* 🔥 BANNER */
  banner: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },

  bannerText: {
    marginBottom: 20,
  },

  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },

  bannerDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },

  bannerImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  /* 🚀 SEÇÕES */
  section: {
    padding: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  /* FUNCIONALIDADES */
  stepsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  step: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },

  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#231942',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  stepText: {
    textAlign: 'center',
    fontWeight: '600',
  },

  /* BENEFÍCIOS */
  benefitsList: {
    gap: 15,
  },

  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  benefitText: {
    fontSize: 14,
    flex: 1,
  }
});