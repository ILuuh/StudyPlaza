/*
  ============================================================
  LAYOUT DE NAVEGAÇÃO — STUDY PLAZA
  ============================================================

  Este arquivo configura a barra de navegação inferior
  do grupo de telas (dash) utilizando o Expo Router.

  O componente Tabs permite navegar entre telas sem precisar
  sair da estrutura principal do aplicativo.
*/

// Importa os ícones da biblioteca Material Icons.
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Importa o componente Tabs, responsável pela navegação
// entre as telas que pertencem a este grupo de rotas.
import { Tabs } from "expo-router";

// Importa Platform para identificar o sistema operacional
// e adaptar a altura da barra para Android ou iOS.
import { Platform } from "react-native";

/*
  ============================================================
  1. PALETA DE CORES
  ============================================================

  Centralizar as cores facilita a manutenção do projeto.

  Se você quiser mudar a cor principal da Study Plaza,
  basta alterar o valor correspondente aqui.
*/
const cores = {
  roxo: "#6A4C93", // Cor principal e destaque da aba ativa.
  roxoEscuro: "#231942", // Roxo escuro da identidade visual.
  roxoClaro: "#A88BEB", // Roxo claro para outros destaques.
  fundo: "#FFFFFF", // Fundo da barra de navegação.
  fundoAtivo: "#F3F0F8", // Fundo suave para indicar seleção.
  texto: "#666666", // Cor das abas não selecionadas.
  borda: "#E8E2EF", // Borda superior discreta.
};

/*
  ============================================================
  2. COMPONENTE DE NAVEGAÇÃO
  ============================================================

  O DashLayout define a navegação das páginas do grupo dash.

  No Expo Router, cada Tabs.Screen corresponde a uma rota.
  Por exemplo:
  - index.tsx    -> tela inicial do grupo.
  - graficos.tsx -> tela de gráficos.

  O nome informado em Tabs.Screen deve corresponder ao
  arquivo de rota existente.
*/
export default function DashLayout() {
  return (
    /*
      Tabs cria a barra de navegação inferior.

      screenOptions define configurações compartilhadas
      por todas as abas, evitando repetir as mesmas opções
      dentro de cada Tabs.Screen.
    */
    <Tabs
      screenOptions={{
        /*
          Oculta o cabeçalho padrão do navegador.

          Use false se quiser esconder o cabeçalho inteiro.
          Caso queira exibir títulos no topo, pode ativá-lo.
        */
        headerShown: false,

        /*
          Define as cores dos ícones e textos:
          - tabBarActiveTintColor: aba selecionada.
          - tabBarInactiveTintColor: abas não selecionadas.

          O Expo Router fornece essas cores ao tabBarIcon
          por meio do parâmetro { color }.
        */
        tabBarActiveTintColor: cores.roxo,
        tabBarInactiveTintColor: cores.texto,

        // Mantém os títulos visíveis abaixo dos ícones.
        tabBarShowLabel: true,

        /*
          Esconde a barra de navegação quando o teclado
          aparece, por exemplo, durante o preenchimento
          de um formulário.
        */
        tabBarHideOnKeyboard: true,

        /*
          Personaliza o texto que aparece abaixo de cada ícone.

          fontSize: tamanho do texto.
          fontWeight: espessura da fonte.
          marginTop: distância entre ícone e título.
        */
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },

        /*
          Personaliza a aparência geral da navbar.

          Platform.OS identifica o sistema operacional:
          - "ios": dispositivos Apple.
          - "android": dispositivos Android.

          Assim, a altura e o espaço inferior podem variar
          conforme a plataforma.
        */
        tabBarStyle: {
          backgroundColor: cores.fundo,
          borderTopColor: cores.borda,
          borderTopWidth: 1,

          // Ajusta a altura para cada plataforma.
          height: Platform.OS === "ios" ? 85 : 68,

          // Espaço entre o topo da barra e os ícones.
          paddingTop: 8,

          // Reserva espaço inferior para a área do dispositivo.
          paddingBottom: Platform.OS === "ios" ? 24 : 8,

          // Elevação da barra no Android.
          elevation: 8,
        },

        /*
          Ajusta o espaço interno de cada aba.

          Cada item corresponde a um botão da navbar.
        */
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      {/*
        ======================================================
        3. ABA INÍCIO
        ======================================================

        name="index" corresponde ao arquivo index.tsx
        dentro da pasta do grupo (dash).

        title define o título da tela.
        tabBarLabel define o texto mostrado na navbar.
      */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarLabel: "Início",

          /*
            tabBarIcon recebe informações da aba atual.

            color: cor calculada pelo navegador conforme
            a aba esteja selecionada ou não.

            focused: true quando a aba está selecionada.

            Podemos usar esses valores para alterar o ícone
            sem precisar controlar o estado manualmente.
          */
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              // Ícone preenchido quando ativo.
              // Ícone alternativo quando inativo.
              name={focused ? "home" : "home-filled"}
              size={26}
              color={color?.toString()}
            />
          ),

          /*
            Descrição acessível da aba.

            Ajuda tecnologias assistivas, como leitores
            de tela, a comunicar o destino do botão.
          */
          tabBarAccessibilityLabel: "Início, tela principal",
        }}
      />

      {/*
        ======================================================
        4. ABA GRÁFICOS
        ======================================================

        name="graficos" corresponde ao arquivo graficos.tsx.

        Para adicionar uma nova aba, crie a tela correspondente
        e adicione outro Tabs.Screen dentro de Tabs.
      */}
      <Tabs.Screen
        name="graficos"
        options={{
          title: "Gráficos",
          tabBarLabel: "Gráficos",

          // Exibe um ícone diferente conforme o estado da aba.
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "insert-chart" : "insert-chart-outlined"}
              size={26}
              color={color?.toString()}
            />
          ),

          // Descrição para leitores de tela.
          tabBarAccessibilityLabel: "Gráficos, acompanhar indicadores",
        }}
      />
    </Tabs>
  );
}
