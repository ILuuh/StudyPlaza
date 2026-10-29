import { useContext } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { AuthContext } from "@/app/utils/authContext";
import { useTheme } from "@/app/utils/themeContext";

// Conteúdo apresentado nos cards.
const funcionalidades = [
  { icone: "users", texto: "Grupos de estudo públicos e privados" },
  { icone: "file-pdf", texto: "Compartilhe materiais e conteúdos facilmente" },
  { icone: "comments", texto: "Chat em tempo real com outros estudantes" },
  {
    icone: "brain",
    texto: "Quizzes personalizados com inteligência artificial",
  },
  { icone: "laptop", texto: "Acesse de qualquer dispositivo" },
  { icone: "book", texto: "Descubra cursos ideais para continuar evoluindo" },
];

const etapas = [
  "Crie ou entre em um grupo de estudos",
  "Compartilhe materiais e conteúdos",
  "Receba quizzes gerados por IA",
  "Acompanhe seu progresso",
];

const beneficios = [
  { icone: "handshake", texto: "Aprendizado colaborativo" },
  { icone: "clock", texto: "Flexibilidade para estudar" },
  { icone: "magic", texto: "IA que reforça seu aprendizado" },
  { icone: "graduation-cap", texto: "Sugestão de cursos" },
  { icone: "users-cog", texto: "Ambiente interativo" },
];

export default function Home() {
  const auth = useContext(AuthContext);
  const { theme, isDark, toggleTheme, isThemeLoaded } = useTheme();
  const cores = theme.colors;

  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((erro) => {
      console.error("Não foi possível abrir o link:", erro);
    });
  };

  if (!isThemeLoaded) {
    return (
      <SafeAreaView
        style={[estilos.container, { backgroundColor: cores.background }]}
      >
        <ActivityIndicator size="large" color={cores.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[estilos.container, { backgroundColor: cores.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={[estilos.header, { backgroundColor: cores.primary }]}>
          <View style={estilos.logoContainer}>
            <Image
              source={require("@/assets/images/Logo_Fundo_Roxa.png")}
              style={estilos.logo}
              resizeMode="contain"
            />
            <Text style={[estilos.logoTexto, { color: cores.textInverse }]}>
              Study Plaza
            </Text>
          </View>

          <View style={estilos.menu}>
            <TouchableOpacity
              onPress={() => auth?.logOut()}
              style={estilos.menuItem}
              accessibilityRole="button"
              accessibilityLabel="Sair da conta"
            >
              <Ionicons name="power" size={20} color={cores.textInverse} />
              <Text style={[estilos.menuTexto, { color: cores.textInverse }]}>
                Sair
              </Text>
            </TouchableOpacity>

            <Link href="/graficos" asChild>
              <TouchableOpacity
                style={estilos.menuItem}
                accessibilityRole="link"
              >
                <Ionicons
                  name="trending-up"
                  size={20}
                  color={cores.textInverse}
                />
                <Text style={[estilos.menuTexto, { color: cores.textInverse }]}>
                  Gráficos
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Alternância de tema */}
        <View
          style={[estilos.acessibilidade, { backgroundColor: cores.surface }]}
        >
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              estilos.botaoTema,
              {
                backgroundColor: cores.surface,
                borderColor: cores.border,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={
              isDark ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={24}
              color={cores.primaryLight}
            />
          </TouchableOpacity>
        </View>

        {/* Banner principal */}
        <View style={[estilos.banner, { backgroundColor: cores.surface }]}>
          <Text style={[estilos.tituloBanner, { color: cores.text }]}>
            Estude melhor, junto com outras pessoas 🚀
          </Text>

          <Text style={[estilos.descricao, { color: cores.textSecondary }]}>
            Crie grupos, compartilhe conteúdos e aprenda com quizzes
            inteligentes gerados por IA — tudo em um só lugar.
          </Text>

          <View style={estilos.botoesBanner}>
            <TouchableOpacity
              style={[
                estilos.botaoPrincipal,
                { backgroundColor: cores.primary },
              ]}
              onPress={() => abrirLink("http://localhost:9000")}
            >
              <Text style={[estilos.textoBotao, { color: cores.textInverse }]}>
                Começar agora
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                estilos.botaoSecundario,
                { borderColor: cores.primaryLight },
              ]}
              onPress={() => abrirLink("https://www.instagram.com/studyplaza_")}
            >
              <Text
                style={[estilos.textoBotaoSecundario, { color: cores.primary }]}
              >
                Saiba mais
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("@/assets/images/ElfaEstudando2.png")}
            style={estilos.mascote}
            resizeMode="contain"
          />
        </View>

        {/* Funcionalidades */}
        <View style={estilos.secao}>
          <Text style={[estilos.tituloSecao, { color: cores.text }]}>
            Como a Study Plaza transforma seu jeito de estudar
          </Text>

          <View style={estilos.listaFuncionalidades}>
            {funcionalidades.map((item) => (
              <View
                key={item.texto}
                style={[
                  estilos.card,
                  {
                    backgroundColor: cores.surface,
                    borderColor: cores.border,
                  },
                ]}
              >
                <View
                  style={[
                    estilos.iconeCard,
                    { backgroundColor: cores.primary },
                  ]}
                >
                  <FontAwesome5
                    name={item.icone}
                    size={25}
                    color={cores.textInverse}
                  />
                </View>

                <Text style={[estilos.textoCard, { color: cores.text }]}>
                  {item.texto}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Como funciona */}
        <View style={estilos.secao}>
          <Text style={[estilos.tituloSecao, { color: cores.text }]}>
            Como funciona?
          </Text>

          {etapas.map((etapa, indice) => (
            <View
              key={etapa}
              style={[
                estilos.etapa,
                {
                  backgroundColor: cores.surface,
                  borderColor: cores.border,
                },
              ]}
            >
              <View
                style={[
                  estilos.numeroEtapa,
                  { backgroundColor: cores.primary },
                ]}
              >
                <Text
                  style={[estilos.numeroTexto, { color: cores.textInverse }]}
                >
                  {indice + 1}
                </Text>
              </View>

              <Text style={[estilos.textoEtapa, { color: cores.text }]}>
                {etapa}
              </Text>
            </View>
          ))}

          <Text style={[estilos.destaqueIA, { color: cores.textSecondary }]}>
            Nossa IA analisa os conteúdos compartilhados e cria quizzes
            personalizados para você aprender mais rápido.
          </Text>
        </View>

        {/* Benefícios */}
        <View style={estilos.secao}>
          <Text style={[estilos.tituloSecao, { color: cores.text }]}>
            Benefícios
          </Text>

          {beneficios.map((item) => (
            <View key={item.texto} style={estilos.beneficio}>
              <FontAwesome5
                name={item.icone}
                size={22}
                color={cores.primaryLight}
              />

              <Text style={[estilos.textoBeneficio, { color: cores.text }]}>
                {item.texto}
              </Text>
            </View>
          ))}
        </View>

        {/* Chamada final */}
        <View style={estilos.cta}>
          <Text style={[estilos.tituloSecao, { color: cores.text }]}>
            Pronto para transformar sua forma de estudar?
          </Text>

          <TouchableOpacity
            style={[estilos.botaoPrincipal, { backgroundColor: cores.primary }]}
            onPress={() => abrirLink("http://localhost:9000")}
          >
            <Text style={[estilos.textoBotao, { color: cores.textInverse }]}>
              Começar agora
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={[estilos.footer, { backgroundColor: cores.primaryDark }]}>
          <Text style={[estilos.footerTitulo, { color: cores.textInverse }]}>
            Study Plaza
          </Text>

          <Text style={[estilos.footerTexto, { color: cores.textInverse }]}>
            Transformando o jeito como você estuda. Conecte-se, compartilhe e
            aprenda em uma comunidade vibrante.
          </Text>

          <TouchableOpacity
            onPress={() => abrirLink("https://www.instagram.com/studyplaza_")}
            style={estilos.instagram}
            accessibilityRole="link"
            accessibilityLabel="Visitar Instagram da Study Plaza"
          >
            <FontAwesome5
              name="instagram"
              size={20}
              color={cores.textInverse}
            />
            <Text style={[estilos.footerTexto, { color: cores.textInverse }]}>
              {" "}
              Instagram
            </Text>
          </TouchableOpacity>

          <Text style={[estilos.copyright, { color: cores.textInverse }]}>
            © {new Date().getFullYear()} Study Plaza - Todos os direitos
            reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  logo: {
    width: 55,
    height: 55,
  },
  logoTexto: {
    fontSize: 23,
    fontWeight: "bold",
    marginLeft: 8,
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
  },
  menuTexto: {
    fontWeight: "600",
  },
  acessibilidade: {
    alignItems: "flex-end",
    padding: 12,
  },
  botaoTema: {
    padding: 12,
    borderRadius: 30,
    elevation: 3,
    borderWidth: 1,
  },
  banner: {
    padding: 25,
    alignItems: "center",
  },
  tituloBanner: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },
  descricao: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 25,
  },
  botoesBanner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  botaoPrincipal: {
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    fontWeight: "bold",
  },
  botaoSecundario: {
    borderWidth: 2,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotaoSecundario: {
    fontWeight: "bold",
  },
  mascote: {
    width: "100%",
    height: 230,
    marginTop: 25,
  },
  secao: {
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  tituloSecao: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  listaFuncionalidades: {
    gap: 15,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    elevation: 2,
  },
  iconeCard: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  textoCard: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
  etapa: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 15,
    elevation: 2,
  },
  numeroEtapa: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  numeroTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textoEtapa: {
    flex: 1,
    fontSize: 15,
  },
  destaqueIA: {
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "600",
    marginTop: 15,
  },
  beneficio: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  textoBeneficio: {
    flex: 1,
    fontSize: 16,
  },
  cta: {
    padding: 30,
    alignItems: "center",
  },
  footer: {
    padding: 25,
    alignItems: "center",
  },
  footerTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  footerTexto: {
    textAlign: "center",
    lineHeight: 23,
  },
  instagram: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 25,
  },
});
