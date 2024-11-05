import { async } from "q";
import api from "../api";

type Cards = {
  id: string;
  nome: string;
  proximoEncontro: string;
  nomeMentor: string;
  nomeMentorado: string;
};

type EnumStatusMentoria = 'Ativa' | 'Recusada' | 'Pendente' | 'Finalizada';

type MentoriaInterface = {
  nome: string;
  idMentor: string;
  idAluno: string;
  reuniao: string[];
  status: EnumStatusMentoria;
  materialAnexado: string[];
  feedback: string;
  descricao: string;
  qtdtotal: number;
  proximoEncontro: string;
}

export type CreateReuniao = {
  idMentoria: string;
  diaReuniao: string;
  resumo: string;
  materialAnexado?: string[]
}

export function UseMentorias() {
  async function getMentorias(id: string) {
    const { data } = await api.get<Cards[]>("mentorias/cards");

    return data;
  }

  async function getMentoriaById(id: string) {
    const {data} = await api.get<MentoriaInterface>(`mentorias/${id}`);

    return data;
  }

  async function agendarEncontro(body: CreateReuniao) {
    console.log('body', body)

    const {data} = await api.post("reuniao", body);

    return data;
  }

  return { getMentorias, getMentoriaById, agendarEncontro };
}
