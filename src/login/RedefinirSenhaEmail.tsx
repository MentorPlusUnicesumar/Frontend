import { Box, Button, Checkbox, Flex, Img, Input, Link, Text } from "@chakra-ui/react";
import logo from "../imgs/logo.png";
import { TextInput } from "../components/TextInput";
import { TelaPadraoLogin } from "../components/TelaPadraoLogin";

export function RedefinirSenhaEmail() {
    return (
        <Flex w={'100%'} h={'100%'} display={'flex'} flexDir={'row'}>
            <TelaPadraoLogin />

            <Flex p={'30px'} w={'65%'} h={'100%'} alignItems={'center'} flexDir={'column'}>
                <Text mt={'50px'} fontSize={'3xl'} fontWeight={'bold'} color={'#05234E'}>Redefina sua senha</Text>

                <TextInput name="Endereço de E-mail" placeholder="Informe seu e-mail" mt="80px"/>
                
                <Button mt="80px" w={'150px'} borderRadius={'10px'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" _hover={{
                        transform: 'scale(1.05)',  
                        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',  
                        transition: 'transform 0.2s ease-in-out',  
                    }} bg={'#1D428A'}>
                        <Text color={'white'} fontSize={'sm'} fontWeight={'bold'} >Enviar E-mail</Text>
                    </Button>
                
            </Flex>
        </Flex>

    )
}