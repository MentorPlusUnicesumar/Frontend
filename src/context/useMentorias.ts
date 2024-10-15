import api from "../api";

type Cards = {
  id: string;
  nome: string;
  proximoEncontro: string;
  nomeMentor: string;
  nomeMentorado: string;
};

export function UseMentorias() {
  async function getMentorias(id: string) {
    const { data } = await api.get<Cards[]>("mentorias/cards");

    return data;
  }

  return { getMentorias };
}
