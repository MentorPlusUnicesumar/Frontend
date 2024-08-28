import { Box, Button, Checkbox, Flex, Img, Input, Link, Text } from "@chakra-ui/react";
import logo from "../imgs/logo.png";
import { TextInput } from "../components/text-input";

export function RedefinirSenha() {
    return (
        <Flex w={'100%'} h={'100%'} display={'flex'} flexDir={'row'}>
            <Flex flexDir={'column'} alignItems={'center'} p={'30px'} h={'100%'} w={'35%'} bg={'#1D428A'}>
                <Text color={'white'} fontSize={'lg'} mt={'50px'}>Bem-vindo ao</Text>
                <Img src={logo} w={'320px'} h={'150px'} mt={'100px'} />
                <Text color={'white'} fontSize={'sm'} mt={'50px'} textAlign={'center'}>Seu caminho para o sucesso começa aqui. Junte-se à Mentor+ e alcance novos horizontes!</Text>
                <Link>
                    <Text color={'white'} fontSize={'sm'} mt={'150px'} textAlign={'center'}>www.matera.com.br</Text>
                </Link>
            </Flex>

            <Flex p={'30px'} w={'65%'} h={'100%'} alignItems={'center'} flexDir={'column'}>
                <Text mt={'50px'} fontSize={'3xl'} fontWeight={'bold'} color={'#05234E'}>Redefina sua senha</Text>
                <Text color={'black'} w="350px" fontSize={'sm'} mt={'15px'} textAlign={'center'}>Insira o endereço de e-mail vinculado à sua conta do Mentor + para te enviarmos um e-mail. </Text>

                <TextInput name="Nova senha" placeholder="Informe sua nova senha" mt="80px"/>
                <TextInput name="Repita sua senha" placeholder="Repita sua senha" mt="20px"/>
                
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