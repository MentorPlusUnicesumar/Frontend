import { createContext, useEffect, useState } from "react";
import { AuthProviderProps, AuthResponse, CachedUser, IToken, LoggedUser, LoginAccess, LoginResponse } from "./contestTypes";
import api from "../api";
import { jwtDecode } from "jwt-decode";

interface AuthContextData {
    login: (credentials: LoginAccess) => Promise<AuthResponse>;
    refreshToken: (token?: string) => Promise<AuthResponse>;
    signOut: () => void;
    user?: LoggedUser | null;
    isSignedIn: boolean;
    cachedUser?: CachedUser | null;
    manageSecrets: {
      setSecret: (key: string, value: object) => Promise<void>;
      deleteSecret: (key: string) => Promise<void>;
    };
  }
  
  export const AuthContext = createContext({} as AuthContextData);
  
  export function AuthProvider({ children }: AuthProviderProps) {
      const [user, setUser] = useState<LoggedUser | null>(null);
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
  
      setAuth(data);
  
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
  
    const setAuth = async (auth: AuthResponse) => {
      const { funcao, usuario, access_token, urlImage, email, _id } = auth;
  
      await localStorage.setItem("access_token", access_token);
  
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  
      setUser({ usuario, funcao, urlImage, email, _id });
    };
  
    async function refreshToken(token?: string): Promise<AuthResponse> {
      const { data } = await api.post<AuthResponse>("auth/refresh", {
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
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  
  }
  