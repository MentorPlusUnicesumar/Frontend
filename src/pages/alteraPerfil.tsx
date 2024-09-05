import { Avatar, Box, Button, Flex, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tag, TagCloseButton, TagLabel, VStack, HStack, IconButton, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Menu } from "../components/menu";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { OnChangeTextInput } from "../components/onchange-text-input";


const inicialValues = {
    nome: "Gabriel",
    sobrenome: "Prisco",
    endereco: "Av. Prudente de Morais",
    cidade: "Maringá",
    estado: "Paraná",
    competencia: "Engenharia de software - Unicesumar, Mestrado em análise de dados - UEL, Mestrado em análise de dados - UEL",
    experiencia: "Estágio de programação - Romagnole, Desenvolvedor full stack - Spotify",
    sobre: "Programador full stack especializado em JavaScript, com uma paixão por transformar ideias em soluções digitais inovadoras. Com uma vasta experiência em desenvolvimento...",
    dispInd: "Disponível",
};

export function AlteraPerfil() {

    function handleSave(){
        
    }

    return (
        <Flex w={'full'} h={'full'} flexDir={'column'} alignItems={'center'}>
            <Menu />
            <Text mt="30px" textAlign="center" fontSize={'3xl'} fontWeight={'bold'} color={'#1D428A'}>Perfil</Text>

            <Flex
                mt="30px"
                flexDir={'column'}
                w={'full'}
                maxW={'800px'}
                p={'20px'}
                bg={'#f7f7f7'}
                borderRadius={'10px'}
                boxShadow={'0px 4px 8px rgba(0, 0, 0, 0.1)'}
            >
                <Formik initialValues={inicialValues} onSubmit={handleSave}>
                    {({ handleSubmit, handleChange, values }) => (
                        <>
                <Flex flexDir={'column'} alignItems={'center'} mb={'20px'}>
                    <Avatar size={'xl'} src="https://avatars.githubusercontent.com/u/114078455?v=4" />
                    <a
                        href=""
                        target="_blank"
                        style={{ color: '#1D428A', fontWeight: 'bold', textDecoration: 'underline', marginTop: '10px' }}
                    >
                        Alterar foto
                    </a>
                </Flex>

                <Tabs variant="enclosed" colorScheme="blue" w={'full'}>
                    <TabList>
                        <Tab mt="10px" color={'#1D428A'} fontWeight={'bold'}>Dados de Cadastro</Tab>
                        <Tab mt="10px" color={'#1D428A'} fontWeight={'bold'}>Informações profissionais</Tab>
                    </TabList>
                    <TabPanels>


                        {/* Aba de Dados de Cadastro */}
                        <TabPanel>
                            
                                    <Box w={'100%'} mt={'10px'}>
                                        <VStack spacing={'15px'} align="stretch">
                                            {/* Nome e Sobrenome lado a lado */}
                                            <HStack>
                                                <OnChangeTextInput name="Nome" placeholder="Digite seu nome" mt="10px" />
                                                <OnChangeTextInput name="Sobrenome" placeholder="Digite seu sobrenome" mt="10px" />
                                            </HStack>

                                            {/* Endereço */}

                                            <Box w={'full'} mt={"10px"}>
                                                <Text fontSize={'lg'} fontWeight={'bold'} color={'#05234E'}>Endereço</Text>
                                                <Input
                                                    mt="10px"
                                                    w={"full"}
                                                    h={'35px'}
                                                    borderWidth={'2px'}
                                                    borderColor={'#ECECEC'}
                                                    borderRadius={'10px'}
                                                    placeholder="Digite suas experiências"
                                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                                                    sx={{
                                                        '::placeholder': {
                                                            fontSize: '12px',
                                                            color: '#B0B0B0',
                                                        }
                                                    }}
                                                />
                                            </Box>

                                            {/* Cidade e Estado lado a lado */}
                                            <HStack>
                                                <OnChangeTextInput name="Cidade" placeholder="Cidade" mt="10px" />
                                                <OnChangeTextInput name="Estado" placeholder="Estado" mt="10px" />
                                            </HStack>

                                            {/* Competências */}

                                            <Box w={'full'} mt={"10px"}>
                                                <Text fontSize={'lg'} fontWeight={'bold'} color={'#05234E'}>Competências</Text>
                                                <Input
                                                    mt="10px"
                                                    w={"full"}
                                                    h={'35px'}
                                                    borderWidth={'2px'}
                                                    borderColor={'#ECECEC'}
                                                    borderRadius={'10px'}
                                                    placeholder="Digite suas competências"
                                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                                                    sx={{
                                                        '::placeholder': {
                                                            fontSize: '12px',
                                                            color: '#B0B0B0',
                                                        }
                                                    }}
                                                />
                                            </Box>


                                            {/* Experiências */}
                                            <Box w={'full'} mt={"10px"}>
                                                <Text fontSize={'lg'} fontWeight={'bold'} color={'#05234E'}>Experiências</Text>
                                                <Input
                                                    mt="10px"
                                                    w={"full"}
                                                    h={'35px'}
                                                    borderWidth={'2px'}
                                                    borderColor={'#ECECEC'}
                                                    borderRadius={'10px'}
                                                    placeholder="Digite suas experiências"
                                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                                                    sx={{
                                                        '::placeholder': {
                                                            fontSize: '12px',
                                                            color: '#B0B0B0',
                                                        }
                                                    }}
                                                />
                                            </Box>

                                            {/* Sobre */}
                                            <Box w={'full'} mt={"10px"}>
                                                <Text fontSize={'lg'} fontWeight={'bold'} color={'#05234E'}>Sobre</Text>
                                                <Input
                                                    mt="10px"
                                                    w={"full"}
                                                    h={'35px'}
                                                    borderWidth={'2px'}
                                                    borderColor={'#ECECEC'}
                                                    borderRadius={'10px'}
                                                    placeholder="Diga algo sobre você"
                                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)" bg={'white'}
                                                    sx={{
                                                        '::placeholder': {
                                                            fontSize: '12px',
                                                            color: '#B0B0B0',
                                                        }
                                                    }}
                                                />
                                            </Box>

                                            {/* Disponível para mentorias */}
                                            <Box w={'400px'}>
                                                <Text fontSize={'lg'} fontWeight={'semi-bold'} color={'#05234E'}>
                                                    Disponível para mentorias
                                                </Text>
                                                <Select
                                                    mt="10px"
                                                    w={'400px'}
                                                    h={'35px'}
                                                    borderWidth={'2px'}
                                                    borderColor={'#ECECEC'}
                                                    borderRadius={'10px'}
                                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                    bg={'white'}
                                                >
                                                    <option value="disponivel">Disponível</option>
                                                    <option value="indisponivel">Indisponível</option>
                                                </Select>
                                            </Box>
                                        </VStack>
                                    </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Flex mt="30px" justifyContent="space-between">
                    <Button
                        h={'40px'}
                        w={'120px'}
                        borderRadius={'50px'}
                        bg={'#ECECEC'}
                        _hover={{ bg: '#DADADA' }}
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                    >
                        Cancelar
                    </Button>
                    <Button
                        h={'40px'}
                        w={'120px'}
                        borderRadius={'50px'}
                        bg={'#1D428A'}
                        color={'white'}
                        _hover={{
                            transform: 'scale(1.05)',
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                            transition: 'transform 0.2s ease-in-out',
                        }}
                    >
                        Atualizar
                    </Button>
                </Flex>
                </>
                    )}
                </Formik>
            </Flex>
        </Flex >
    );
}
