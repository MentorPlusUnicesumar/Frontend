import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ItemMenu() {
    const links = [
        {
            name: "Minhas mentorias",
            qnt: 2,
            link: "Minhas-mentorias"
        },
        {
            name: "Encontrar mentores",
            qnt: null,
            link: "Encontrar-mentores"
        },
        {
            name: "Notificações",
            qnt: 5,
            link: "Notificacoes"
        },
        {
            name: "Chat",
            qnt: 1,
            link: "Chat"
        },
    ]

    const navigate = useNavigate();
    const location = useLocation();
    const [linkSelecionado, setLinkSelecionado] = useState("Minhas-mentorias");
    useEffect(() => {
        setLinkSelecionado(location.pathname)
    }, [])

    return (
        <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
            {
                links.map((link) => {
                    return (
                        <Flex flexDir={'row'}>
                            <Link onClick={() => navigate(`/${link}`)}>
                                <Text textDecorationLine={link.name === linkSelecionado ? 'underline' : "none"} color={'white'} fontWeight={'light'}>{link.name}</Text>
                            </Link>

                            {
                                link.qnt ?
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={'25px'} h='20px' bg={'white'} borderRadius={'5px'}>
                                        <Text color={'#1D428A'}>{link.qnt}</Text>
                                    </Box>
                                    :
                                    null
                            }
                        </Flex>
                    )
                })
            }
        </Flex>
    )
}