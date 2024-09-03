import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export type LoginResponse = {
  _id: string;
  access_token: string;
  refresh_token: string;
  usuario: string;
  funcao: string;
  urlImage: string;
  email: string;
};

export type LoginAccess = {
  usuario: string;
  senha: string;
};

export type AuthResponse = {
  _id: string;
  access_token: string;
  refresh_token: string;
  usuario: string;
  funcao: string;
  urlImage: string;
  email: string;
};

export type LoggedUser = {
  _id: string;
  usuario: string;
  email: string;
  funcao: string;
  urlImage: string;
};

export interface CachedUser {
  name: string;
  refresh_token: string;
}

export interface IToken {
  exp: number;
}
