import api from "../api";

export function useChat() {
    async function createChat(idMentor: string, idAluno: string) {
        const body = {idAluno, idMentor}

        const {data} = await api.post("chat", body)

        return data;
    }

    return {createChat};
}