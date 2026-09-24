import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

// Define a estrutura do Usuário
interface User {
  id?: string;
  nome: string;
  email: string;
  tipo_usuario?: string;
}

// Define a estrutura do Contexto
interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (data: { email: string; token?: string; user?: User }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Carrega o usuário/token salvo ao abrir a aplicação
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await SecureStore.getItemAsync('user_token');
        const storedUser = await SecureStore.getItemAsync('user_data');

        if (storedToken && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Erro ao carregar dados de autenticação:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // Função para efetuar e guardar o Login
  const signIn = async ({ email, token, user: userData }: { email: string; token?: string; user?: User }) => {
    const loggedUser = userData || { nome: 'Usuário', email };
    const userToken = token || 'token_demo_123';

    // Salva com segurança no dispositivo
    await SecureStore.setItemAsync('user_token', userToken);
    await SecureStore.setItemAsync('user_data', JSON.stringify(loggedUser));

    setUser(loggedUser);

    // Redireciona para as Tabs
    router.replace('/(tabs)/dash' as any);
  };

  // Função para Deslogar
  const signOut = async () => {
    await SecureStore.deleteItemAsync('user_token');
    await SecureStore.deleteItemAsync('user_data');
    setUser(null);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o AuthContext em qualquer tela
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};