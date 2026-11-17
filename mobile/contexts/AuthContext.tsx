import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import api from '@/services/api';

interface User {
  id: string | number;
  name: string;
  login: string;
  tipo_usuario?: string;
  avatar?: string;
}

interface SignInCredentials {
  login: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  login: string;
  password: string;
  tipo_usuario: string;
}

interface UpdateProfileData {
  name: string;
  tipo_usuario: string;
  avatar?: string;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedToken = await SecureStore.getItemAsync('user_token');
        const storedUser = await SecureStore.getItemAsync('user_data');

        if (storedToken && storedUser) {
          // Injeta o token salvo nas próximas requisições do Axios
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
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

  const signIn = async ({ login, password }: SignInCredentials) => {
    try {
      // Bate na rota POST /auth/login do seu backend
      const response = await api.post('/auth/login', { login, password });

      // Seu backend retorna: { message: "success", data: token, user: { id, name } }
      const { data: token, user: apiUser } = response.data;

      const loggedUser: User = {
        id: apiUser.id,
        name: apiUser.name,
        login: login,
        tipo_usuario: apiUser.tipo_usuario || 'estudante',
        avatar: 'user-graduate',
      };

      // Configura o token no cabeçalho padrão da API
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await SecureStore.setItemAsync('user_token', token);
      await SecureStore.setItemAsync('user_data', JSON.stringify(loggedUser));

      setUser(loggedUser);
      router.replace('/(tabs)/dash' as any);
    } catch (error: any) {
      // Repassa a mensagem de erro do backend para a tela exibir no Alert
      const errorMessage = error.response?.data?.message || 'Erro ao realizar login';
      throw new Error(errorMessage);
    }
  };

  const signUp = async ({ name, login, password, tipo_usuario }: SignUpCredentials) => {
    try {
      // Bate na rota POST /auth/register do seu backend
      await api.post('/auth/register', {
        name,
        login,
        password,
        tipo_usuario,
      });

      // Opcional: já faz o login automático logo após cadastrar
      await signIn({ login, password });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário';
      throw new Error(errorMessage);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('user_token');
    await SecureStore.deleteItemAsync('user_data');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    router.replace('/(auth)' as any);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    if (!user) return;

    try {
      // Envia apenas os campos que existem na tabela `users` do MySQL
      await api.put(`/users/${user.id}`, {
        name: data.name,
        tipo_usuario: data.tipo_usuario,
      });
    } catch (e) {
      console.log('Erro ao atualizar no servidor, atualizando localmente:', e);
    }

    const updatedUser: User = {
      ...user,
      name: data.name,
      tipo_usuario: data.tipo_usuario,
      avatar: data.avatar || user.avatar || 'user',
    };

    await SecureStore.setItemAsync('user_data', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
