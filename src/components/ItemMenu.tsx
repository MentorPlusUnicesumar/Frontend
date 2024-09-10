import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
    name: string
    qntd?: number
    link: string
}

export function ItemMenu({ name, qntd, link }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [linkSelecionado, setLinkSelecionado] = useState("Minhas-mentorias");
    useEffect(() => {
        setLinkSelecionado(location.pathname)
    },[])

    return (
        <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
            <Link onClick={() => navigate(`/${linkSelecionado}`)}>
                <Text textDecorationLine={link === linkSelecionado ? 'underline' : "none"} color={'white'} fontWeight={'light'}>{name}</Text>
            </Link>

            {
                qntd ?
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={'25px'} h='20px' bg={'white'} borderRadius={'5px'}>
                        <Text color={'#1D428A'}>{qntd}</Text>
                    </Box>
                    :
                    null
            }
        </Flex>
    )
}