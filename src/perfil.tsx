import { Avatar, Box, Button, Flex, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tag, TagCloseButton, TagLabel, VStack, HStack, IconButton, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Menu } from "./components/menu";
import { TextInput } from "./components/text-input";


export function Perfil() {
    const [teachingAreas, setTeachingAreas] = useState(["Administração", "Engenharia de Software", "Análise de dados"]);
    const [socialLinks, setSocialLinks] = useState([
        { platform: "LinkedIn", link: "www.linkedin/GabrielPrisco.com" },
        { platform: "Instagram", link: "www.instagram/GabrielPrisco.com" },
        { platform: "Email", link: "Gabrielprisco@gmail.com" }
    ]);
    const [newArea, setNewArea] = useState("");
    const [newSocialLink, setNewSocialLink] = useState("");

    // Adicionar nova área de ensino
    const addTeachingArea = () => {
        if (newArea.trim() !== "") {
            setTeachingAreas([...teachingAreas, newArea]);
            setNewArea("");
        }
    };

    // Remover área de ensino
    const removeTeachingArea = (area: string) => {
        setTeachingAreas(teachingAreas.filter((item) => item !== area));
    };

    // Adicionar novo link de rede social
    const addSocialLink = () => {
        if (newSocialLink.trim() !== "") {
            setSocialLinks([...socialLinks, { platform: "Nova Plataforma", link: newSocialLink }]);
            setNewSocialLink("");
        }
    };

    // Remover rede social
    const removeSocialLink = (index: number) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

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
                <Flex flexDir={'column'} alignItems={'center'} mb={'20px'}>
                    <Avatar size={'xl'} src="https://via.placeholder.com/150" />
                    <Text mt="10px" color={'#1D428A'} fontWeight={'bold'}>Alterar foto</Text>
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
                                        <TextInput name="Nome" placeholder="Digite seu nome" mt="10px" />
                                        <TextInput name="Sobrenome" placeholder="Digite seu sobrenome" mt="10px" />
                                    </HStack>

                                    {/* Endereço */}
                                    <TextInput name="Endereço" placeholder="Digite seu endereço" mt="10px" />

                                    {/* Cidade e Estado lado a lado */}
                                    <HStack>
                                        <TextInput name="Cidade" placeholder="Digite sua cidade" mt="10px" />
                                        <TextInput name="Estado" placeholder="Digite seu estado" mt="10px" />
                                    </HStack>

                                    {/* Competências */}
                                    <TextInput name="Competências" placeholder="Descreva suas competências" mt="10px" />

                                    {/* Experiências */}
                                    <TextInput name="Experiências" placeholder="Descreva suas experiências" mt="10px" />

                                    {/* Sobre */}
                                    <TextInput name="Sobre" placeholder="Fale um pouco sobre você" mt="10px" />

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
                                            placeholder="Selecione a disponibilidade"
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

                        {/* Aba de Informações Profissionais */}
                        <TabPanel>
                            <VStack spacing={'15px'} align="stretch">
                                {/* Áreas de Ensino */}
                                <Box>
                                    <Text fontWeight={'bold'} mb="8px">Áreas de ensino</Text>
                                    <HStack wrap="wrap" spacing={2}>
                                        {teachingAreas.map((area, index) => (
                                            <Tag size={'md'} borderRadius="full" variant="solid" colorScheme="blue" key={index}>
                                                <TagLabel>{area}</TagLabel>
                                                <TagCloseButton onClick={() => removeTeachingArea(area)} />
                                            </Tag>
                                        ))}
                                        <Input
                                            placeholder="Adicionar nova área"
                                            value={newArea}
                                            onChange={(e) => setNewArea(e.target.value)}
                                            w={"200px"}
                                        />
                                        <IconButton
                                            aria-label="Adicionar área"
                                            icon={<AddIcon />}
                                            onClick={addTeachingArea}
                                        />
                                    </HStack>
                                </Box>

                                {/* Redes Sociais */}
                                <Box>
                                    <Text fontWeight={'bold'} mb="8px">Redes Sociais</Text>
                                    <VStack align="stretch" spacing={3}>
                                        {socialLinks.map((social, index) => (
                                            <HStack key={index} w="full">
                                                <Input placeholder={social.platform} value={social.link} readOnly />
                                                <IconButton
                                                    aria-label="Remover rede social"
                                                    icon={<AddIcon />} // Substituir para o ícone de remoção, se necessário
                                                    onClick={() => removeSocialLink(index)}
                                                />
                                            </HStack>
                                        ))}
                                        <HStack>
                                            <Input
                                                placeholder="Adicionar novo link"
                                                value={newSocialLink}
                                                onChange={(e) => setNewSocialLink(e.target.value)}
                                            />
                                            <IconButton
                                                aria-label="Adicionar rede social"
                                                icon={<AddIcon />}
                                                onClick={addSocialLink}
                                            />
                                        </HStack>
                                    </VStack>
                                </Box>
                            </VStack>
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
            </Flex>
        </Flex >
    );
}
