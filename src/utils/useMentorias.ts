import { async } from "q";
import api from "../api";

type Cards = {
  id: string;
  nome: string;
  proximoEncontro: string;
  nomeMentor: string;
  nomeMentorado: string;
};

type Reuniao = {
  _id: string,
  idMentoria: string,
  diaReuniao: Date,
  status: string,
  feedback: string,
  materialAnexado: string[],
  link: string,
  resumo: string
}

type EnumStatusMentoria = 'Ativa' | 'Recusada' | 'Pendente' | 'Finalizada';

type typeUser = { _id: string, nome: string }

type MentoriaInterface = {
  nome: string;
  idMentor: typeUser;
  idAluno: typeUser;
  reuniao: Reuniao[];
  status: EnumStatusMentoria;
  materialAnexado: string[];
  feedback: string;
  descricao: string;
  qtdtotal: number;
  proximoEncontro: string;
}

export type BodyEnvioAtualizaEncontro = {
  resumo?: string,
  materialAnexado?: string[],
  feedback?: string
}

export type CreateReuniao = {
  idMentoria: string;
  diaReuniao: string | undefined;
  resumo: string;
  materialAnexado?: string[]
}

export function UseMentorias() {
  async function getMentorias(id: string) {
    const { data } = await api.get<Cards[]>("mentorias/cards");

    return data;
  }

  async function getMentoriaById(id: string) {
    const { data } = await api.get<MentoriaInterface>(`mentorias/${id}`);

    return data;
  }

  async function agendarEncontro(body: CreateReuniao) {
    const { data } = await api.post("reuniao", body);

    return data;
  }

  async function atualizarEncontro(idEncontro: string, body: BodyEnvioAtualizaEncontro) {
    const { data } = await api.patch(`reuniao/${idEncontro}`, body);

    return data
  }

  return { getMentorias, getMentoriaById, agendarEncontro, atualizarEncontro };
}
