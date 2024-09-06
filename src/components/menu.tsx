import { Box, Flex, Img, Link, Text } from "@chakra-ui/react";
import pedro from "../imgs/pedro.jpg"
import { useState, useContext } from "react";
import { ItemMenu } from "./ItemMenu";
import { AuthContext } from "../context/authContext";

export function Menu() {
    const [menuSelecionado, setMenuSelecionado] = useState("Minhas mentorias")
    const { user } = useContext(AuthContext);
    console.log('user', user)
    function selecionado(selected: string) {
        setMenuSelecionado(selected)
    }

    return (
        <Flex px={'60px'} py={'10px'} alignItems={'center'} w={'full'} h={'70px'} bg={'#1D428A'} justifyContent={'space-between'}>
            <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>Mentor +</Text>

            <Flex justifyContent={'space-between'} w={'550px'}>
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Minhas mentorias')} name="Minhas mentorias" qntd={2} />
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Encontrar mentores')} name="Encontrar mentores" />
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Notificações')} name="Notificações" qntd={5} />
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Chat')} name="Chat" qntd={1} />
            </Flex>

            <Box>
                <Img src={pedro} w={'40px'} h={'40px'} borderRadius={'20px'} />
                <Text color={'white'}>{user?.name}</Text>
            </Box>
        </Flex>
    )
}