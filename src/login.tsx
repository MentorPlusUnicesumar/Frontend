import { Box, Button, Checkbox, Flex, Img, Input, Link, Text } from "@chakra-ui/react";
import logo from "../src/imgs/logo.png";

export function Login() {
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
                <Text mt={'50px'} fontSize={'3xl'} fontWeight={'bold'} color={'#05234E'}>Login</Text>

                <Box w={'400px'} mt={'80px'}>
                    <Text fontSize={'lg'} fontWeight={'semi-bold'} color={'#05234E'}>Endereço de e-mail</Text>
                    <Input
                        w={'400px'}
                        h={'30px'}
                        borderWidth={'2px'}
                        borderColor={'#ECECEC'}
                        borderRadius={'10px'}
                        placeholder="Informe seu e-mail"
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                        sx={{
                            '::placeholder': {
                                fontSize: '12px', // Ajuste o tamanho da fonte do placeholder
                                color: '#B0B0B0', // Ajuste a cor do placeholder se desejar
                            }
                        }}
                    />
                </Box>
                <Box w={'400px'} mt={'30px'}>
                    <Text fontSize={'lg'} fontWeight={'semi-bold'} color={'#05234E'}>Senha</Text>
                    <Input
                        w={'400px'}
                        h={'30px'}
                        borderWidth={'2px'}
                        borderColor={'#ECECEC'}
                        borderRadius={'10px'}
                        placeholder="Informe sua senha"
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                        sx={{
                            '::placeholder': {
                                fontSize: '12px', // Ajuste o tamanho da fonte do placeholder
                                color: '#B0B0B0', // Ajuste a cor do placeholder se desejar
                            }
                        }}
                    />
                </Box>

                <Flex w='400px' mt={'10px'} justifyContent={'space-between'}>
                    <Checkbox size='sm' defaultChecked>
                        <Text fontSize={'sm'} fontWeight={'hairline'}>Manter conectado</Text>
                    </Checkbox>
                    <Link >
                        <Text color={'#05234E'} fontSize={'sm'} fontWeight={'hairline'}>Esqueceu sua senha?</Text>
                    </Link>
                </Flex>
                <Flex w={'400px'} mt={'50px'} justifyContent={'space-between'} >
                    <Button w={'170px'} borderRadius={'10px'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" _hover={{
                        transform: 'scale(1.05)',  // Aumenta o botão para 105% do tamanho original
                        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',  // Opcional: ajusta a sombra para combinar com o aumento
                        transition: 'transform 0.2s ease-in-out',  // Suaviza o efeito de transição
                    }} bg={'#F6F6F6'}>
                        <Text color={'#05234E'} fontSize={'sm'} fontWeight={'bold'}>Fazer Cadastro</Text>
                    </Button>
                    <Button w={'170px'} borderRadius={'10px'} boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" _hover={{
                        transform: 'scale(1.05)',  // Aumenta o botão para 105% do tamanho original
                        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)',  // Opcional: ajusta a sombra para combinar com o aumento
                        transition: 'transform 0.2s ease-in-out',  // Suaviza o efeito de transição
                    }} bg={'#1D428A'}>
                        <Text color={'white'} fontSize={'sm'} fontWeight={'bold'} >Login</Text>
                    </Button>

                </Flex>
            </Flex>
        </Flex>

    )
}