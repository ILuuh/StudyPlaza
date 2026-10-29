/*
  ============================================================
  LAYOUT DE NAVEGAÇÃO — STUDY PLAZA
  ============================================================

  Este arquivo configura a barra de navegação inferior
  do grupo de telas (dash) utilizando o Expo Router.

  O componente Tabs permite navegar entre telas sem precisar
  sair da estrutura principal do aplicativo.
*/
// Importa o componente Tabs, responsável pela navegação
// entre as telas que pertencem a este grupo de rotas.
import { Stack} from "expo-router";

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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
    </Stack>
  );
}
