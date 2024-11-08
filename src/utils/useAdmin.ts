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


    return { getUsuarios }
}