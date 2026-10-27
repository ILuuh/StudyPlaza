/*
  ============================================================
  STUDY PLAZA — PÁGINA INICIAL
  ============================================================

  Este arquivo demonstra conceitos que podem ser reutilizados
  em outras páginas do aplicativo:

  1. Imports e dependências.
  2. Organização das cores.
  3. Listas de dados.
  4. Estado com useState.
  5. Componentes do React Native.
  6. Renderização dinâmica com map().
  7. Eventos com onPress.
  8. Navegação para links externos.
  9. Estilização com StyleSheet.
*/

// useState permite guardar informações que podem mudar na tela.
import { useState } from "react";

// Componentes básicos para construir interfaces no React Native.
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  StatusBar,
} from "react-native";

// SafeAreaView ajuda a respeitar as áreas seguras do dispositivo.
import { SafeAreaView } from "react-native-safe-area-context";

// Biblioteca de ícones.
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

/*
  ============================================================
  1. CONSTANTES E CORES
  ============================================================

  Constantes armazenam valores que serão utilizados em várias
  partes do código.

  Vantagem: se quiser alterar a cor principal do aplicativo,
  você pode modificá-la aqui, sem procurar em todo o arquivo.
*/

const roxo = "#6A4C93";
const roxoEscuro = "#231942";
const roxoClaro = "#A88BEB";
const fundo = "#F9F9F9";

/*
  ============================================================
  2. DADOS DAS FUNCIONALIDADES
  ============================================================

  Os arrays armazenam os conteúdos que serão apresentados
  na interface.

  Cada objeto possui:
  - icone: nome do ícone que será exibido.
  - texto: descrição da funcionalidade.

  Esse padrão permite criar vários cards sem repetir o mesmo
  bloco de componentes manualmente.
*/

const funcionalidades = [
  {
    icone: "users",
    texto: "Grupos de estudo públicos e privados",
  },
  {
    icone: "file-pdf",
    texto: "Compartilhe materiais e conteúdos facilmente",
  },
  {
    icone: "comments",
    texto: "Chat em tempo real com outros estudantes",
  },
  {
    icone: "brain",
    texto: "Quizzes personalizados com inteligência artificial",
  },
  {
    icone: "laptop",
    texto: "Acesse de qualquer dispositivo",
  },
  {
    icone: "book",
    texto: "Descubra cursos ideais para continuar evoluindo",
  },
];

/*
  Array com as etapas de utilização da plataforma.

  Como são textos simples, não precisamos criar um objeto
  para cada elemento.
*/
const etapas = [
  "Crie ou entre em um grupo de estudos",
  "Compartilhe materiais e conteúdos",
  "Receba quizzes gerados por IA",
  "Acompanhe seu progresso",
];

/*
  Array dos benefícios.

  Cada benefício possui um ícone e um texto.
*/
const beneficios = [
  { icone: "handshake", texto: "Aprendizado colaborativo" },
  { icone: "clock", texto: "Flexibilidade para estudar" },
  { icone: "magic", texto: "IA que reforça seu aprendizado" },
  { icone: "graduation-cap", texto: "Sugestão de cursos" },
  { icone: "users-cog", texto: "Ambiente interativo" },
];

/*
  ============================================================
  3. COMPONENTE PRINCIPAL
  ============================================================

  No React Native, um componente é uma função que retorna
  elementos da interface.

  O nome do componente começa com letra maiúscula.

  Você pode criar outros componentes para separar o cabeçalho,
  o rodapé, os cards e outras partes da página.
*/

export default function Home() {
  /*
    useState guarda o estado do tema.

    temaEscuro: informa se o tema escuro está ativo.
    setTemaEscuro: função utilizada para modificar esse estado.

    O valor inicial false significa que a página começa
    utilizando o tema claro.

    Quando o estado muda, o React renderiza novamente
    as partes da interface que dependem dele.
  */
  const [temaEscuro, setTemaEscuro] = useState(false);

  /*
    Objeto de cores dinâmicas.

    O operador ternário verifica o estado do tema:
    condição ? valorSeVerdadeiro : valorSeFalso

    Assim, podemos reutilizar os mesmos componentes nos
    temas claro e escuro, alterando apenas suas cores.
  */
  const cores = {
    fundo: temaEscuro ? "#1A0B2E" : fundo,
    superficie: temaEscuro ? "#2A1247" : "#FFFFFF",
    texto: temaEscuro ? "#F5F5F5" : "#333333",
    roxo: temaEscuro ? "#10002B" : roxo,
    destaque: temaEscuro ? "#CDB4DB" : roxoClaro,
  };

  /*
    ==========================================================
    4. FUNÇÃO PARA ABRIR LINKS
    ==========================================================

    Linking.openURL() abre um endereço externo.

    A função recebe uma URL como parâmetro, por exemplo:
    abrirLink("https://www.instagram.com/studyplaza_")

    O .catch() trata possíveis erros, como falhas ao abrir
    o endereço.

    Atenção: localhost em um celular aponta para o próprio
    dispositivo, não necessariamente para o computador.
  */
  const abrirLink = (url: string) => {
    Linking.openURL(url).catch((erro) =>
      console.error("Não foi possível abrir o link:", erro),
    );
  };

  /*
    ==========================================================
    5. INTERFACE DA PÁGINA
    ==========================================================

    JSX é a sintaxe utilizada para escrever a interface
    dentro do JavaScript/TypeScript.

    No React Native:
    - View funciona como um contêiner.
    - Text exibe textos.
    - Image exibe imagens.
    - TouchableOpacity cria áreas interativas.
    - ScrollView permite rolar uma página comprida.
  */

  return (
    /*
      SafeAreaView protege o conteúdo das áreas reservadas
      do dispositivo, como o recorte da câmera.

      O array de estilos permite combinar um estilo fixo
      com outro calculado dinamicamente.
    */
    <SafeAreaView style={[estilos.container, { backgroundColor: cores.fundo }]}>
      {/*
        StatusBar controla a aparência da barra de status.

        O texto fica claro no tema escuro e escuro no tema claro.
      */}
      <StatusBar barStyle={temaEscuro ? "light-content" : "dark-content"} />

      {/*
        ScrollView permite que o usuário role a página
        verticalmente quando o conteúdo ultrapassa a tela.

        showsVerticalScrollIndicator={false} oculta a barra
        indicadora de rolagem.
      */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ==================================================
            6. CABEÇALHO
            ================================================== */}

        <View style={[estilos.header, { backgroundColor: cores.roxo }]}>
          {/* Área que reúne a logo e o nome da plataforma. */}
          <View style={estilos.logoContainer}>
            <Image
              /*
                require() carrega uma imagem local.

                O caminho deve corresponder à localização real
                do arquivo dentro do projeto.
              */
              source={require("@/assets/images/Logo_Fundo_Roxa.png")}
              style={estilos.logo}
              resizeMode="contain"
            />

            <Text style={estilos.logoTexto}>Study Plaza</Text>
          </View>

          {/* Menu com botões de navegação. */}
          <View style={estilos.menu}>
            {/*
              TouchableOpacity permite executar uma ação
              quando o usuário toca no elemento.

              onPress recebe uma função que será executada
              quando houver um toque.
            */}
            <TouchableOpacity
              onPress={() => abrirLink("https://www.instagram.com/studyplaza_")}
              style={estilos.menuItem}
            >
              <Ionicons name="people" size={20} color="#FFFFFF" />
              <Text style={estilos.menuTexto}>Grupos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => abrirLink("http://localhost:9000")}
              style={estilos.menuItem}
            >
              <Ionicons name="chatbubbles" size={20} color="#FFFFFF" />
              <Text style={estilos.menuTexto}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => abrirLink("https://www.instagram.com/studyplaza_")}
              style={estilos.menuItem}
            >
              <Ionicons name="information-circle" size={20} color="#FFFFFF" />
              <Text style={estilos.menuTexto}>Sobre</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ==================================================
            7. ACESSIBILIDADE E TEMA
            ================================================== */}

        <View style={estilos.acessibilidade}>
          <TouchableOpacity
            /*
              Ao tocar no botão, invertemos o estado atual.

              Se temaEscuro for false, passa a ser true.
              Se for true, passa a ser false.

              O React atualiza as cores calculadas no objeto
              cores e renderiza novamente a interface.
            */
            onPress={() => setTemaEscuro(!temaEscuro)}
            style={[estilos.botaoTema, { backgroundColor: cores.superficie }]}
            accessibilityLabel="Alternar tema claro e escuro"
          >
            {/*
              O nome do ícone também depende do estado.

              Tema claro: mostra uma lua.
              Tema escuro: mostra um sol.
            */}
            <Ionicons
              name={temaEscuro ? "sunny" : "moon"}
              size={24}
              color={cores.destaque}
            />
          </TouchableOpacity>
        </View>

        {/* ==================================================
            8. BANNER PRINCIPAL
            ================================================== */}

        <View style={[estilos.banner, { backgroundColor: cores.superficie }]}>
          {/*
            Os estilos são combinados em um array:
            primeiro aplicamos o estilo definido no StyleSheet,
            depois sobrescrevemos a cor do texto.
          */}
          <Text style={[estilos.tituloBanner, { color: cores.texto }]}>
            Estude melhor, junto com outras pessoas 🚀
          </Text>

          <Text style={[estilos.descricao, { color: cores.texto }]}>
            Crie grupos, compartilhe conteúdos e aprenda com quizzes
            inteligentes gerados por IA — tudo em um só lugar.
          </Text>

          {/* Agrupamento dos botões do banner. */}
          <View style={estilos.botoesBanner}>
            <TouchableOpacity
              style={estilos.botaoPrincipal}
              onPress={() => abrirLink("http://localhost:9000")}
            >
              <Text style={estilos.textoBotao}>Começar agora</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={estilos.botaoSecundario}
              onPress={() => abrirLink("https://www.instagram.com/studyplaza_")}
            >
              <Text style={[estilos.textoBotaoSecundario, { color: roxo }]}>
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

        {/* ==================================================
            9. LISTA DE FUNCIONALIDADES
            ================================================== */}

        <View style={estilos.secao}>
          <Text style={[estilos.tituloSecao, { color: cores.texto }]}>
            Como a Study Plaza transforma seu jeito de estudar
          </Text>

          <View style={estilos.listaFuncionalidades}>
            {/*
              map() percorre o array funcionalidades.

              Para cada objeto, cria um card com ícone e texto.

              key={item.texto} fornece uma identificação
              estável para cada elemento da lista, ajudando
              o React a atualizar os elementos corretamente.

              Esse padrão pode ser reutilizado para listas
              de cursos, grupos, usuários e notificações.
            */}
            {funcionalidades.map((item) => (
              <View
                key={item.texto}
                style={[estilos.card, { backgroundColor: cores.superficie }]}
              >
                <View style={estilos.iconeCard}>
                  <FontAwesome5 name={item.icone} size={25} color="#FFFFFF" />
                </View>

                <Text style={[estilos.textoCard, { color: cores.texto }]}>
                  {item.texto}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ==================================================
            10. COMO FUNCIONA
            ================================================== */}

        <View style={estilos.secao}>
          <Text style={[estilos.tituloSecao, { color: cores.texto }]}>
            Como funciona?
          </Text>

          {/*
            Aqui usamos map() para percorrer o array etapas.

            O segundo parâmetro, indice, representa a posição
            do item na lista e começa em zero.

            Por isso, usamos indice + 1 para exibir:
            1, 2, 3 e 4.
          */}
          {etapas.map((etapa, indice) => (
            <View
              key={etapa}
              style={[estilos.etapa, { backgroundColor: cores.superficie }]}
            >
              <View style={estilos.numeroEtapa}>
                <Text style={estilos.numeroTexto}>{indice + 1}</Text>
              </View>

              <Text style={[estilos.textoEtapa, { color: cores.texto }]}>
                {etapa}
              </Text>
            </View>
          ))}

          <Text style={[estilos.destaqueIA, { color: cores.texto }]}>
            Nossa IA analisa os conteúdos compartilhados e cria quizzes
            personalizados para você aprender mais rápido.
          </Text>
        </View>

        {/* ==================================================
            11. BENEFÍCIOS
            ================================================== */}

        <View style={estilos.secao}>
          <Text style={[estilos.tituloSecao, { color: cores.texto }]}>
            Benefícios
          </Text>

          {/*
            A mesma técnica de map() é usada novamente.

            Observe que podemos reaproveitar o conceito,
            mas criar uma apresentação visual diferente.
          */}
          {beneficios.map((item) => (
            <View key={item.texto} style={estilos.beneficio}>
              <FontAwesome5
                name={item.icone}
                size={22}
                color={cores.destaque}
              />

              <Text style={[estilos.textoBeneficio, { color: cores.texto }]}>
                {item.texto}
              </Text>
            </View>
          ))}
        </View>

        {/* ==================================================
            12. CHAMADA FINAL PARA AÇÃO
            ================================================== */}

        <View style={estilos.cta}>
          <Text style={[estilos.tituloSecao, { color: cores.texto }]}>
            Pronto para transformar sua forma de estudar?
          </Text>

          <TouchableOpacity
            style={estilos.botaoPrincipal}
            onPress={() => abrirLink("http://localhost:9000")}
          >
            <Text style={estilos.textoBotao}>Começar agora</Text>
          </TouchableOpacity>
        </View>

        {/* ==================================================
            13. RODAPÉ
            ================================================== */}

        <View style={[estilos.footer, { backgroundColor: cores.roxo }]}>
          <Text style={estilos.footerTitulo}>Study Plaza</Text>

          <Text style={estilos.footerTexto}>
            Transformando o jeito como você estuda. Conecte-se, compartilhe e
            aprenda em uma comunidade vibrante.
          </Text>

          <TouchableOpacity
            onPress={() => abrirLink("https://www.instagram.com/studyplaza_")}
            style={estilos.instagram}
            accessibilityLabel="Visitar Instagram da Study Plaza"
          >
            <FontAwesome5 name="instagram" size={20} color="#FFFFFF" />
            <Text style={estilos.footerTexto}> Instagram</Text>
          </TouchableOpacity>

          {/*
            new Date().getFullYear() retorna o ano atual.
            Assim, o ano do copyright é atualizado automaticamente.
          */}
          <Text style={estilos.copyright}>
            © {new Date().getFullYear()} Study Plaza - Todos os direitos
            reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
  ============================================================
  14. ESTILOS DA PÁGINA
  ============================================================

  StyleSheet.create() organiza os estilos em um único objeto.

  Para aplicar um estilo em um componente, usamos:
  style={estilos.nomeDoEstilo}

  No React Native, alguns exemplos de diferenças em relação
  ao CSS tradicional são:

  - flexDirection: "row" organiza elementos horizontalmente.
  - alignItems alinha os elementos no eixo transversal.
  - justifyContent distribui os elementos no eixo principal.
  - paddingVertical define espaçamento vertical interno.
  - borderRadius arredonda os cantos.
  - fontWeight define o peso da fonte.

  Os valores numéricos de tamanho são unidades independentes
  de densidade, não pixels CSS literais.
*/

const estilos = StyleSheet.create({
  // Ocupa o espaço disponível da tela.
  container: {
    flex: 1,
  },

  // Cabeçalho com logo e menu.
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },

  // Organiza a imagem da logo e o nome lado a lado.
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
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    marginLeft: 8,
  },

  // Organiza os itens do menu horizontalmente.
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
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Posiciona o botão de tema à direita.
  acessibilidade: {
    alignItems: "flex-end",
    padding: 12,
  },

  botaoTema: {
    padding: 12,
    borderRadius: 30,
    elevation: 3,
  },

  // Banner principal da página.
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

  // Permite que os botões quebrem linha quando necessário.
  botoesBanner: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  botaoPrincipal: {
    backgroundColor: roxo,
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  botaoSecundario: {
    borderWidth: 2,
    borderColor: roxoClaro,
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

  // Estilo reutilizável para as seções da página.
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

  // Card de funcionalidade.
  card: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },

  iconeCard: {
    width: 60,
    height: 60,
    backgroundColor: roxoEscuro,
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

  // Linha de cada etapa do funcionamento.
  etapa: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    gap: 15,
    elevation: 2,
  },

  numeroEtapa: {
    backgroundColor: roxo,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  numeroTexto: {
    color: "#FFFFFF",
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

  // Alinha o ícone e o texto de cada benefício.
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

  // Chamada final.
  cta: {
    padding: 30,
    alignItems: "center",
  },

  // Rodapé.
  footer: {
    padding: 25,
    alignItems: "center",
  },

  footerTitulo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  footerTexto: {
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 23,
  },

  instagram: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  copyright: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12,
    marginTop: 25,
  },
});
