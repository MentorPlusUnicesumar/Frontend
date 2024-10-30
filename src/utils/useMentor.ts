import api from "../api";

type TrabDestaqueDto = {
    foto: string;
    descricao: string;
};

export type areas = {
    _id: string,
    nome: string
}

export interface UserInterface {
    _id: string
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    typeUser: string;
    status: string;
    cidade: string;
    uf: string;
    cpf: string;
    mentoriasAtivas: string[];
    fotos: string;
    areas: areas[];
    sobre: string;
    competencias: string[];
    experiencias: string[];
    trabDestaque: TrabDestaqueDto[];
    instagram: string;
    youtube: string;
    linkedin: string;
    disponivel: boolean;
    estrela: number[];
}

export type filtroType = {
    nomeMentor?: string,
    areaMentor?: string
  }

export function UseMentor() {
    async function getMentores({areaMentor, nomeMentor} : filtroType = {}) {
        const { data } = await api.get<UserInterface[]>("users/mentores", {
            params: {
                areaMentor,
                nomeMentor
            }
        })

        return data;
    }

    async function getMentorById(id: string) {
        const { data } = await api.get<UserInterface>(`users/id/${id}`)

        return data;
    }

    return { getMentores, getMentorById }
}