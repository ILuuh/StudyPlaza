import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import {styles} from "./estilo_index";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* 🔥 BANNER */}
      <View style={styles.banner}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>
            Descubra o futuro do aprendizado colaborativo!
          </Text>

          <Text style={styles.bannerDescription}>
            Na Study Plaza, você se conecta com estudantes como você, compartilha
            materiais, participa de grupos e aprende com quizzes gerados por IA.
          </Text>
        </View>

        <Image
          source={require('../../assets/images/ElfaEstudando2.png')}
          style={styles.bannerImage}
        />
      </View>

      {/* 🚀 FUNCIONALIDADES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Funcionalidades em Destaque
        </Text>

        <View style={styles.stepsContainer}>

          <View style={styles.step}>
            <View style={styles.icon}>
              <FontAwesome5 name="users" size={24} color="#fff" />
            </View>
            <Text style={styles.stepText}>Grupos de estudo</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.icon}>
              <FontAwesome5 name="file-pdf" size={24} color="#fff" />
            </View>
            <Text style={styles.stepText}>Compartilhamento de PDFs</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.icon}>
              <Ionicons name="chatbubbles" size={24} color="#fff" />
            </View>
            <Text style={styles.stepText}>Chat em tempo real</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.icon}>
              <MaterialIcons name="psychology" size={24} color="#fff" />
            </View>
            <Text style={styles.stepText}>Quizzes com IA</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.icon}>
              <Ionicons name="laptop" size={24} color="#fff" />
            </View>
            <Text style={styles.stepText}>Acesso em qualquer dispositivo</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.icon}>
              <Ionicons name="book" size={24} color="#fff" />
            </View>
            <Text style={styles.stepText}>Sugestão de cursos</Text>
          </View>

        </View>
      </View>

      {/* 💡 BENEFÍCIOS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Benefícios</Text>

        <View style={styles.benefitsList}>

          <View style={styles.benefitItem}>
            <FontAwesome5 name="handshake" size={18} />
            <Text style={styles.benefitText}>
              Aprendizado colaborativo e personalizado
            </Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="time" size={18} />
            <Text style={styles.benefitText}>
              Flexibilidade para estudar
            </Text>
          </View>

          <View style={styles.benefitItem}>
            <MaterialIcons name="auto-awesome" size={18} />
            <Text style={styles.benefitText}>
              IA para reforço com quizzes
            </Text>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="school" size={18} />
            <Text style={styles.benefitText}>
              Sugestão de cursos
            </Text>
          </View>

          <View style={styles.benefitItem}>
            <FontAwesome5 name="users-cog" size={18} />
            <Text style={styles.benefitText}>
              Ambiente interativo e inclusivo
            </Text>
          </View>

        </View>
      </View>

    </ScrollView>
  );
}