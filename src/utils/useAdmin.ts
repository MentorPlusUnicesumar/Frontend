import api from "../api";
import { UserInterface } from "./useMentor";

export type filter = {
    nome?: string,
    typeUser?: string
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


    return { getUsuarios, getUsuariosById, statusUsuaruio }
}