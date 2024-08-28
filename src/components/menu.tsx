import { Box, Flex, Img, Link, Text } from "@chakra-ui/react";
import pedro from "../imgs/pedro.jpg"
import { useState } from "react";
import { ItemMenu } from "./item-menu";

export function Menu() {
    const [menuSelecionado, setMenuSelecionado] = useState("Minhas mentorias")

    function selecionado(selected: string) {
        setMenuSelecionado(selected)
    }

    return (
        <Flex px={'40px'} py={'10px'} alignItems={'center'} w={'full'} h={'70px'} bg={'#1D428A'} justifyContent={'space-between'}>
            <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>Mentor +</Text>

            <Flex justifyContent={'space-between'} w={'550px'}>
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Minhas mentorias')} name="Minhas mentorias" qntd={2} />
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Encontrar mentores')} name="Encontrar mentores" />
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Notificações')} name="Notificações" qntd={5} />
                <ItemMenu selecionado={menuSelecionado} onClick={() => selecionado('Chat')} name="Chat" qntd={1} />
            </Flex>

            <Box>
                <Img src={pedro} w={'40px'} h={'40px'} borderRadius={'20px'} />
                <Text color={'white'}>Pedro</Text>
            </Box>
        </Flex>
    )
}