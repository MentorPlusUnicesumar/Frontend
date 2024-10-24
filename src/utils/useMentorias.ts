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
}

export function UseMentorias() {
  async function getMentorias(id: string) {
    const { data } = await api.get<Cards[]>("mentorias/cards");

    return data;
  }

  async function getMentoriaById(id: string) {
    const {data} = await api.get<MentoriaInterface>(`mentorias/id/${id}`);

    return data;
  }

  return { getMentorias, getMentoriaById };
}
