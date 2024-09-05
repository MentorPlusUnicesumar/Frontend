import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export type LoginResponse = { 
  _id: string;
  access_token: string;
  refresh_token: string; 
};

export type LoginAccess = {
  email: string;
  senha: string;
};

export type UserData = {
  _id: string;
  name: string;
  email: string;
  telefone: string;
  typeUser: string;
  status: string;
  cidade: string;
  uf: string;
  cpf: string;
  mentoriasAtivas: string[];
  fotos: string;
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
