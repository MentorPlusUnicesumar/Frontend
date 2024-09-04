import { Box, Flex, Text } from "@chakra-ui/react";
import { Menu } from "../components/menu";
import { CardMentoria } from "../components/card-mentoria";
import { TextInput } from "../components/text-input";



export function BuscarMentores() {
    return (
        <Flex w={'full'} h={'full'} flexDir={'column'}>
            <Menu />
            
                <Text mt="30px" textAlign="center" fontSize={'3xl'} fontWeight={'bold'} color={'#1D428A'}>Encontrar novos mentores</Text>
            

            <Flex px='50px' mt="30px" w={'full'} h={'full'} flexDir={'column'}>
                <Text fontSize={'2xl'} fontWeight={'bold'} color={'#1D428A'} >Sugestões</Text>
                <Box w={"full"} bg={'#1D428A'} h={"2px"} />
                <TextInput mt="10px" placeholder="teste"  />

            </Flex>


        </Flex>
    )
}