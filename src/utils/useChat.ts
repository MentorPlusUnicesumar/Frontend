import api from "../api";

export type Message = {
    chatId: string;
    senderId?: string;
    content: string;
}

type User = {
    fotos: string,
    name: string,
    _id: string
}

type getChats = {
    lastMessage: Message
    idAluno: User,
    idMentor: User,
    _id: string,
    hasNewMessages: boolean

}

export function useChat() {
    async function createChat(idAluno: string, idMentor: string) {
        const body = { idAluno: idAluno, idMentor: idMentor }

        const { data } = await api.post("chat", body)

        return data;
    }

    async function getChats() {
        const { data } = await api.get<getChats[]>('chat');

        return data;
    }

    async function getMessagesByChat(_id: string) {
        const { data } = await api.get(`chat/${_id}`);

        return data
    }

    async function markerMessageRead(chatId: string | undefined) {
        if (chatId) {
            const { data } = await api.put(`chat/markAsRead/${chatId}`)

            return data;
        } else {
            return
        }


    }

    return { createChat, getChats, getMessagesByChat, markerMessageRead };
}