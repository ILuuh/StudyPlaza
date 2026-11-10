import { Tabs } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '../../hooks/use-theme-context';

export default function TabsLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.corSuperficie,
          borderTopColor: theme.corBorda,
          elevation: 5,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.roxoEscuro,
        tabBarInactiveTintColor: theme.corFonteSecundaria,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" size={26} color={ color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dash/index"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="gauge-high" size={26} color={color} />
          ),
        }}
      />

            <Tabs.Screen
        name="cursos/index"
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book" size={26} color={color} />
          ),
        }}
      />

           {/* <Tabs.Screen
        name="cursos/index"
        options={{
          title: 'Painel',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book" size={26} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="circle-user" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}