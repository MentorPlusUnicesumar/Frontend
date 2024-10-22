import { createContext, useEffect, useState } from "react";
import { AuthProviderProps, CachedUser, IToken, LoggedUser, LoginAccess, LoginResponse, UserData } from "./contestTypes";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { Socket, io } from 'socket.io-client';

interface AuthContextData {
    login: (credentials: LoginAccess) => Promise<LoginResponse>;
    refreshToken: (token?: string) => Promise<LoginResponse>;
    signOut: () => void;
    user?: UserData | null;
    isSignedIn: boolean;
    cachedUser?: CachedUser | null;
    manageSecrets: {
      setSecret: (key: string, value: object) => Promise<void>;
      deleteSecret: (key: string) => Promise<void>;
    };
    socket: Socket | null
  }
  
  export const AuthContext = createContext({} as AuthContextData);
  
  export function AuthProvider({ children }: AuthProviderProps) {
      const [user, setUser] = useState<UserData | null>(null);
      const [socket, setSockt] = useState<Socket | null>(null);
      const [cachedUser, setCachedUser] = useState<CachedUser | null>(null);
      const isSignedIn = !!user;
      api.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (
          error?.response?.status === 401 &&
          error?.response?.data?.message === "Token inválido ou vencido" &&
          error?.response?.data?.error === "Unauthorized"
        ) {
          signOut();
        }
  
        throw error;
      }
    );
  
    async function login(body: LoginAccess) {
      
      const { data } = await api.post<LoginResponse>("auth/login", body);

      
      const userData = await api.get<UserData>(`users/id/${data._id}`, {
        headers: {
            'Authorization': `Bearer ${data.access_token}`
        }
    });

      await localStorage.setItem("access_token", data.access_token);
  
      api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;

      const socket = io('http://10.7.13.43:3000', {
        auth: {
          token: data.access_token 
        }
      });

      setSockt(socket)

      setAuth(userData.data);
  
      return data;
    }
  
    function signOut() {
      setUser(null);
    }
  
    async function retrieveCachedUser() {
      const cachedUser = await localStorage.getItem("cachedUser");
  
      const handleCachedUser = (cachedUser: string | null) => {
        if (cachedUser) {
          const cached = JSON.parse(cachedUser) as CachedUser;
  
          const { exp } = jwtDecode<IToken>(cached.refresh_token);
  
          const expiration = new Date(exp * 1000);
  
          if (expiration < new Date()) {
            manageSecrets.deleteSecret("cachedUser");
            return null;
          } else { 
            return JSON.parse(cachedUser) as CachedUser;
          }
        }
        return null;
      };
  
      const result = handleCachedUser(cachedUser);
  
      setCachedUser(result);
    }
  
    const manageSecrets = {
      setSecret: async (key: string, value: object) => {
        await localStorage.setItem(key, JSON.stringify(value));
        await retrieveCachedUser();
      },
      deleteSecret: async (key: string) => {
        await localStorage.removeItem(key);
        await retrieveCachedUser();
      },
    };
  
    useEffect(() => {
      retrieveCachedUser();
    }, []);
  
    const setAuth = async (auth: UserData) => {
      const { email, _id, cidade, cpf, fotos, mentoriasAtivas, name, status, telefone, typeUser, uf } = auth;
  
      setUser({  email, _id, cidade, cpf, fotos, mentoriasAtivas, name, status, telefone, typeUser, uf });
    };
  
    async function refreshToken(token?: string): Promise<LoginResponse> {
      const { data } = await api.post<LoginResponse>("auth/refresh", {
        refresh_token: token,
      });
  
      return data;
    }
  
    return (
      <AuthContext.Provider
        value={{
          login,
          signOut,
          isSignedIn,
          user,
          cachedUser,
          manageSecrets,
          refreshToken,
          socket
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  
  }
  