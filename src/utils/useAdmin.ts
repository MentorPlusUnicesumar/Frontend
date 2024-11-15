import api from "../api";
import { UserInterface } from "./useMentor";
import { MentoriaInterface } from "./useMentorias";

export type filter = {
    nome?: string,
    typeUser?: string
}

export type filterMentoria = {
    nomeMentor?: string,
    nomeAluno?: string
}

export type filterArea = {
    _id?: string;
    nome?: string
}

type areaType = {
    _id: string,
    nome: string,
    numeroDeMentores: number,
    numeroDeAlunos: number
}

export function UseAdmin() {

    async function getUsuarios({ nome, typeUser }: filter = {}) {
        const { data } = await api.get<UserInterface[]>('users', {
            params: {
                nome,
                typeUser
            }
        })

        return data;
    }

    async function getUsuariosById(id: string) {
        const { data } = await api.get<UserInterface>(`users/id/${id}`)

        return data
    }

    async function statusUsuaruio(id: string, status: string) {
        const { data } = await api.patch(`users/update-status/${id}`, { status })

        return data;
    }

    async function getMentorias({ nomeAluno, nomeMentor }: filterMentoria) {
        const { data } = await api.get<MentoriaInterface[]>('mentorias', {
            params: {
                nomeAluno,
                nomeMentor
            }
        })

        return data;
    }

    async function getAreas({nome}: filterArea) {
        const {data} = await api.get<areaType[]>("areas/detalhes")
        
        return data;
    }

    async function editAreas({_id, nome}: filterArea) {
        const {data} = await api.patch(`areas/${_id}`, nome)
        
        return data
    }

    async function deleteArea(id: string) {
        const {data} = await api.delete(`areas/${id}`)

        return data;
    }


    return { getUsuarios, getUsuariosById, statusUsuaruio, getMentorias, getAreas, editAreas, deleteArea }
}