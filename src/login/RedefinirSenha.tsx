import { Button, Flex, Img, Link, Text } from "@chakra-ui/react";
import { TextInput } from "../components/TextInput";
import logo from "../imgs/logo.png";
import { TelaPadraoLogin } from "../components/TelaPadraoLogin";

export function RedefinirSenha() {
    return (
        <Flex w={'100%'} h={'100%'} display={'flex'} flexDir={'row'}>
            <TelaPadraoLogin />

            <Flex p={'30px'} w={'65%'} h={'100%'} alignItems={'center'} flexDir={'column'}>
                <Text mt={'50px'} fontSize={'3xl'} fontWeight={'bold'} color={'#05234E'}>Redefina sua senha</Text>
                <Text color={'black'} w="350px" fontSize={'sm'} fontWeight={'light'} mt={'15px'} textAlign={'center'}>Insira o endereço de e-mail vinculado à sua conta do Mentor + para te enviarmos um e-mail. </Text>

                <TextInput name="Nova senha" placeholder="Informe sua nova senha" mt="80px" />
                <TextInput name="Repita sua senha" placeholder="Repita sua senha" mt="20px" />

                <Button mt="80px" w={'150px'} borderRadius={'10px'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',
                    transition: 'transform 0.2s ease-in-out',
                }} bg={'#1D428A'}>
                    <Text color={'white'} fontSize={'sm'} fontWeight={'bold'} >Redefinir senha</Text>
                </Button>

            </Flex>
        </Flex>

    )
}