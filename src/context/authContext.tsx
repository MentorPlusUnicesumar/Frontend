import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Socket, io } from "socket.io-client";
import {
  AuthProviderProps,
  CachedUser,
  LoginAccess,
  LoginResponse,
  UserData,
} from "./contestTypes";
import api from "../api";

interface AuthContextData {
  login: (credentials: LoginAccess) => any;
  refreshToken: () => Promise<void>;
  signOut: () => void;
  user?: UserData | null;
  isSignedIn: boolean;
  cachedUser?: CachedUser | null;
  manageSecrets: {
    setSecret: (key: string, value: object) => void;
    deleteSecret: (key: string) => void;
  };
  socket: Socket | null;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isSignedIn = !!user;

  async function login(body: LoginAccess) {
    const { data } = await api.post<LoginResponse>("auth/login", body);

    const userData = await api.get<UserData>(`users/id/${data._id}`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    Cookies.set("access_token", data.access_token, { expires: 7, path: "/" });
    Cookies.set("refresh_token", data.refresh_token, { expires: 7, path: "/" });
    Cookies.set("user", JSON.stringify(userData.data), {
      expires: 7,
      path: "/",
    });

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;

    const socket = io("https://mentorplus.dev.br:8080", {
      auth: {
        token: data.access_token,
      },
    });

    setSocket(socket);
    setUser(userData.data);

    return userData.data;
  }

  async function handleTokenRefresh() {
    const refreshToken = Cookies.get("refresh_token") ?? null;

    if (!refreshToken) {
      signOut();
      return;
    }

    try {
      const { data } = await api.post<LoginResponse>("auth/refresh", {
        refresh_token: refreshToken,
      });

      Cookies.set("access_token", data.access_token, { expires: 7, path: "/" });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;

      const socket = io("https://mentorplus.dev.br:8080", {
        auth: {
          token: data.access_token,
        },
      });

      setSocket(socket);
    } catch (error) {
      signOut();
    }
  }

  function signOut() {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    setUser(null);
  }

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const user = Cookies.get("user");

    if (accessToken && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      const socket = io("https://mentorplus.dev.br:8080", {
        auth: {
          token: accessToken,
        },
      });

      setSocket(socket);

      try {
        setUser(JSON.parse(user));
      } catch (error) {
        handleTokenRefresh();
      }
    } else {
      handleTokenRefresh();
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signOut,
        isSignedIn,
        user,
        cachedUser: null,
        manageSecrets: {
          setSecret: (key: string, value: object): void => {
            Cookies.set(key, JSON.stringify(value), { expires: 7, path: "/" });
          },
          deleteSecret: (key: string): void => {
            Cookies.remove(key, { path: "/" });
          },
        },
        refreshToken: handleTokenRefresh,
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
