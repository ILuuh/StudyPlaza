import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          Colors[colorScheme ?? "light"].tint,

        tabBarInactiveTintColor: "#888",

        tabBarButton: HapticTab,

        tabBarStyle: {
          height: 70,
          paddingTop: 5,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* SOBRE NÓS */}
      <Tabs.Screen
        name="sobre-nos"
        options={{
          title: "Sobre nós",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="information-circle"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* CHAT */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* CURSOS */}
      <Tabs.Screen
        name="cursos"
        options={{
          title: "Cursos",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="book"
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* PERFIL */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",

          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person"
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}