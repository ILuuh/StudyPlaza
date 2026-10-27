import { loginApi } from "@/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface StorageProps {
  isLoggedIn: boolean;
  user?: User | null;
  token?: string | null;
}

type AuthContextProps = {
  isRead: boolean;
  isLoggedIn: boolean;
  user: User | null;
  logIn: (login: string, password: string) => boolean;
  logOut: () => void;
};

const myStorageKey = "key-myapp";

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isRead: false,
  logIn: (login: string, password: string) => false,
  logOut: () => {},
  user: null,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isRead, setIsRead] = useState(false);

  //useEffect(() => {}, [isRead]);

  useEffect(() => {
    const getStorage = async () => {
      const jsonValue = await AsyncStorage.getItem(myStorageKey);
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        // console.log(`useEffect ${value.user?.nome}`);
        setIsLoggedIn(value.isLoggedIn);
        setUser(value.user);
      }
      setIsRead(true);
    };
    getStorage();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(myStorageKey);
      console.log(`getData: ${jsonValue}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading
      console.log("falha ao ler o storage");
    }
  };

  const storeData = async (value: StorageProps) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(myStorageKey, jsonValue);
    } catch (e) {
      // saving error
      console.log("erro ao salvar no storage");
    }
  };

  // declaracao classica de função
  function logIn(login: string, password: string) {
    const authResponse = loginApi(login, password);

    if (!authResponse) {
      return true;
    }

    setIsLoggedIn(true);

    const payload: User = {
      id: 1,
      nome: login,
      email: login,
    };
    setUser(payload);
    storeData({ isLoggedIn: true, user: payload, token: "aqui vem o token " });
    return true;
  }
  // usando funcao anonima
  const logOut = () => {
    setIsLoggedIn(false);
    storeData({ isLoggedIn: false });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isRead, isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;