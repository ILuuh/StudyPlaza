import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import AuthProvider from "./utils/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle={"default"} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
