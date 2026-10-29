import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import { ThemeProvider } from "../utils/themeContext";

export default function AuthLayout() {
  const auth = useContext(AuthContext);
  // console.log(`authLayout ${auth.isLoggedIn}`);

  if (!auth.isRead) {
    return null;
  }
  if (!auth.isLoggedIn) {
    return <Redirect href={"/login"} />;
  }

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(dash)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
