import api from "../api";

type areasType = {
    _id: string,
    nome: string
}

export type UserInterface = {    
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    typeUser: string;
    cidade: string;
    uf: string;
    cpf: string;
    fotos?: string;
    areas: string[];
    sobre?: string;
    competencias?: string[];
    experiencias?: string[];
    // trabDestaque?: TrabDestaqueDto[];
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    disponivel?: boolean;
    estrela?: number[];
}

export function UseCadastro() {
    async function getAreas() {
        const {data} = await api.get<areasType[]>("areas")

        return data;
    }

    async function cadastroUsuario(usuario: UserInterface) {
        console.log('aaaa', usuario)

        try {
               const {data} = await api.post("users", usuario)
               return data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                return message
            }
        }

        // console.log(data)
    }

    return {getAreas, cadastroUsuario}
}