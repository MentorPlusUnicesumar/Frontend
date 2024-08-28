import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    name: string
    qntd?: number
    onClick: (selectd: string) => void;
    selecionado: string
}

export function ItemMenu({ name, qntd, onClick, selecionado }: Props) {


    return (
        <Flex justifyContent={'center'} alignItems={'center'} gap={2}>
            <Link onClick={() => onClick(name)}>
                <Text textDecorationLine={name === selecionado ? 'underline' : "none"} color={'white'} fontWeight={'hairline'}>{name}</Text>
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