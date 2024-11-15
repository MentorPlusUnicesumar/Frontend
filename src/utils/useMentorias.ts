import api from "../api";

type Cards = {
  id: string;
  nome: string;
  proximoEncontro: string;
  nomeMentor: string;
  nomeMentorado: string;
};

type Reuniao = {
  _id: string;
  idMentoria: string;
  diaReuniao: Date;
  status: string;
  feedback: string;
  materialAnexado: string[];
  link: string;
  resumo: string;
};

type EnumStatusMentoria = "Ativa" | "Recusada" | "Pendente" | "Finalizada";

type typeUser = { _id: string; nome: string };

export type MentoriaInterface = {
  _id: string;
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
};

export type BodyEnvioAtualizaEncontro = {
  resumo?: string;
  materialAnexado?: string[];
  feedback?: string;
};

export type CreateReuniao = {
  idMentoria: string;
  diaReuniao: string | undefined;
  resumo: string;
  materialAnexado?: string[];
};

type Aluno = {
  _id: string;
  nome: string;
};

export type createMentoriaType = {
  nome: string;
  idAluno: string;
  descricao: string;
  qtdtotal: number;
  idMentor?: string;
};

type mentoriasPendentesType = {
  _id: string;
  idMentor: {
    nome: string;
  };
  nome: string;
};

export function UseMentorias() {
  async function getMentoriasCards() {
    console.log("aqui");
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

  async function atualizarEncontro(
    idEncontro: string,
    body: BodyEnvioAtualizaEncontro
  ) {
    const { data } = await api.patch(`reuniao/${idEncontro}`, body);

    return data;
  }

  async function getAlunos() {
    const { data } = await api.get<Aluno[]>("users/alunos");

    return data;
  }

  async function createMentoria(mentoria: createMentoriaType) {
    const { data } = await api.post("mentorias", mentoria);

    return data;
  }

  async function getMentoriasPendentes() {
    const { data } = await api.get<mentoriasPendentesType[]>(
      "mentorias/pendentes"
    );

    return data;
  }

  async function aceitarMentoria(_id: string, action: string) {
    console.log("id", _id);
    console.log("action", action);

    const { data } = await api.patch(`mentorias/aceitar/${_id}`, { action });

    return data;
  }

  return {
    getMentoriaById,
    agendarEncontro,
    atualizarEncontro,
    getAlunos,
    createMentoria,
    getMentoriasPendentes,
    aceitarMentoria,
    getMentoriasCards,
  };
}
