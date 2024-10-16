import api from "../api";

type User = {     
    fotos: string,
    name: string,
    _id: string   
}

type getChats = {
    lastMessage: boolean,
    idAluno: User,
    idMentor: User,
    _id: string,

}

export function useChat() {
    async function createChat(idAluno: string, idMentor: string) {
        const body = {idAluno: idAluno, idMentor: idMentor}

        const {data} = await api.post("chat", body)

        return data;
    }

    async function getChats() {
        const {data} = await api.get<getChats[]>('chat');

        return data;
    }

    return {createChat, getChats};
}