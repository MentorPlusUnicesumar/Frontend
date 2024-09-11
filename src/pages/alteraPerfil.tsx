import {
    Avatar,
    Box,
    Button,
    Flex,
    Input,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    IconButton,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { CardTrab } from "../components/card-trab-mentor";
import { MenuUsuario } from "../components/menu";


const initialValues = {
    nome: "Gabriel",
    sobrenome: "Prisco",
    endereco: "Av. Prudente de Morais",
    cidade: "Maringá",
    estado: "Paraná",
    competencia:
        "Engenharia de software - Unicesumar, Mestrado em análise de dados - UEL",
    experiencia:
        "Estágio de programação - Romagnole, Desenvolvedor full stack - Spotify",
    sobre:
        "Programador full stack especializado em JavaScript, com uma paixão por transformar ideias em soluções digitais inovadoras.",
    dispInd: "Disponível",
    linkedin: "www.linkedin.com/GabrielPrisco",
    instagram: "www.instagram.com/GabrielPrisco",
    email: "Gabrielprisco@gmail.com"
};

// Trabalhos de Destaque
const initialWorks = [
    {
        id: 1,
        title: "Contribuição no desenvolvimento do frontend do aplicativo Aiqfome",
        image: "/path-to-image1.png",
    },
    {
        id: 2,
        title: "Palestra sobre como gerenciar e organizar grandes projetos",
        image: "/path-to-image2.png",
    },
    {
        id: 3,
        title: "trabias sobre Inteligência Artificial e suas aplicações",
        image: "/path-to-image3.png",
    },
];


export function AlteraPerfil() {

    const trabs = [
        {
            trabName: "Contribuição no desenvolvimento do frontend do aplicativo Aiqfome",
            trabImage: "https://avatars.githubusercontent.com/u/62121362?v=4",
        },
        {
            trabName: "Palestra sobre como gerenciar e organizar grandes projetos",
            trabImage: "https://via.placeholder.com/300x200",
        },
        {
            trabName: "Mentorias sobre Inteligência Artifical e suas aplicações",
            trabImage: "https://avatars.githubusercontent.com/u/114078455?v=4",
        },
    ];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const predefinedAreas = [
        "Administração",
        "Engenharia de Software",
        "Análise de dados",
        "Marketing",
        "Finanças",
        "Ciência de Dados",
    ];

    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [newArea, setNewArea] = useState("");

    const handleAddArea = () => {
        if (newArea && !selectedAreas.includes(newArea)) {
            setSelectedAreas([...selectedAreas, newArea]);
            setNewArea("");
        }
    };

    const handleRemoveArea = (area: string) => {
        setSelectedAreas(selectedAreas.filter((a) => a !== area));
    };

    function handleSave(values: any) {
        console.log("Valores atualizados:", values);
    }

    return (

        <Flex w={"full"} h={"full"} flexDir={"column"} alignItems={"center"}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Novo trabalho de destaque</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Textarea placeholder="Escreva o título do seu trabalho" />
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Adicionar imagem
                        </Button>



                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            Adicionar
                        </Button>
                        <Button onClick={onClose} variant='ghost'>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <MenuUsuario />
            <Text mt="30px" textAlign="center" fontSize={"3xl"} fontWeight={"bold"} color={"#1D428A"}>
                Perfil
            </Text>

            <Flex
                mt="30px"
                flexDir={"column"}
                w={"full"}
                maxW={"800px"}
                p={"20px"}
                bg={"#f7f7f7"}
                borderRadius={"10px"}
                boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.1)"}
            >
                <Formik initialValues={initialValues} onSubmit={handleSave}>
                    {({ handleSubmit, handleChange, values }) => (
                        <form onSubmit={handleSubmit}>
                            <Flex flexDir={"column"} alignItems={"center"} mb={"20px"}>
                                <Avatar size={"xl"} src="https://avatars.githubusercontent.com/u/114078455?v=4" />
                                <a
                                    href="#"
                                    style={{
                                        color: "#1D428A",
                                        fontWeight: "bold",
                                        textDecoration: "underline",
                                        marginTop: "10px",
                                    }}
                                >
                                    Alterar foto
                                </a>
                            </Flex>

                            <Tabs variant="enclosed" colorScheme="blue" w={"full"}>
                                <TabList>
                                    <Tab mt="10px" color={"#1D428A"} fontWeight={"bold"}>
                                        Dados de Cadastro
                                    </Tab>
                                    <Tab mt="10px" color={"#1D428A"} fontWeight={"bold"}>
                                        Informações profissionais
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    {/* Aba de Dados de Cadastro */}
                                    <TabPanel>
                                        <Box w={"100%"} mt={"10px"}>
                                            <VStack spacing={"15px"} align="stretch">
                                                {/* Nome e Sobrenome */}
                                                <HStack>
                                                    <Box w={"full"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                            Nome
                                                        </Text>
                                                        <Input
                                                            name="nome"
                                                            placeholder="Digite seu nome"
                                                            mt="10px"
                                                            w={"full"}
                                                            h={"35px"}
                                                            borderWidth={"2px"}
                                                            borderColor={"#ECECEC"}
                                                            borderRadius={"10px"}
                                                            value={values.nome}
                                                            onChange={handleChange}
                                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                            bg={"white"}
                                                        />
                                                    </Box>
                                                    <Box w={"full"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                            Sobrenome
                                                        </Text>
                                                        <Input
                                                            name="sobrenome"
                                                            placeholder="Digite seu sobrenome"
                                                            mt="10px"
                                                            w={"full"}
                                                            h={"35px"}
                                                            borderWidth={"2px"}
                                                            borderColor={"#ECECEC"}
                                                            borderRadius={"10px"}
                                                            value={values.sobrenome}
                                                            onChange={handleChange}
                                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                            bg={"white"}
                                                        />
                                                    </Box>
                                                </HStack>

                                                {/* Endereço */}
                                                <Box w={"full"} mt={"10px"}>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                        Endereço
                                                    </Text>
                                                    <Input
                                                        name="endereco"
                                                        mt="10px"
                                                        w={"full"}
                                                        h={"35px"}
                                                        borderWidth={"2px"}
                                                        borderColor={"#ECECEC"}
                                                        borderRadius={"10px"}
                                                        placeholder="Digite seu endereço"
                                                        value={values.endereco}
                                                        onChange={handleChange}
                                                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                        bg={"white"}
                                                    />
                                                </Box>

                                                {/* Cidade e Estado */}
                                                <HStack>
                                                    <Box w={"full"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                            Cidade
                                                        </Text>
                                                        <Input
                                                            name="cidade"
                                                            placeholder="Digite sua cidade"
                                                            mt="10px"
                                                            w={"full"}
                                                            h={"35px"}
                                                            borderWidth={"2px"}
                                                            borderColor={"#ECECEC"}
                                                            borderRadius={"10px"}
                                                            value={values.cidade}
                                                            onChange={handleChange}
                                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                            bg={"white"}
                                                        />
                                                    </Box>
                                                    <Box w={"full"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                            Estado
                                                        </Text>
                                                        <Input
                                                            name="estado"
                                                            placeholder="Digite seu estado"
                                                            mt="10px"
                                                            w={"full"}
                                                            h={"35px"}
                                                            borderWidth={"2px"}
                                                            borderColor={"#ECECEC"}
                                                            borderRadius={"10px"}
                                                            value={values.estado}
                                                            onChange={handleChange}
                                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                            bg={"white"}
                                                        />
                                                    </Box>
                                                </HStack>

                                                {/* Sobre */}
                                                <Box w={"full"} mt={"10px"}>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                        Sobre
                                                    </Text>
                                                    <Input
                                                        name="sobre"
                                                        mt="10px"
                                                        w={"full"}
                                                        h={"35px"}
                                                        borderWidth={"2px"}
                                                        borderColor={"#ECECEC"}
                                                        borderRadius={"10px"}
                                                        placeholder="Diga algo sobre você"
                                                        value={values.sobre}
                                                        onChange={handleChange}
                                                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                        bg={"white"}
                                                    />
                                                </Box>

                                                {/* Competências */}
                                                <Box w={"full"} mt={"10px"}>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                        Competências
                                                    </Text>
                                                    <Input
                                                        name="competencia"
                                                        mt="10px"
                                                        w={"full"}
                                                        h={"35px"}
                                                        borderWidth={"2px"}
                                                        borderColor={"#ECECEC"}
                                                        borderRadius={"10px"}
                                                        placeholder="Digite suas competências"
                                                        value={values.competencia}
                                                        onChange={handleChange}
                                                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                        bg={"white"}
                                                    />
                                                </Box>

                                                {/* Experiências */}
                                                <Box w={"full"} mt={"10px"}>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                        Experiências
                                                    </Text>
                                                    <Input
                                                        name="experiencia"
                                                        mt="10px"
                                                        w={"full"}
                                                        h={"35px"}
                                                        borderWidth={"2px"}
                                                        borderColor={"#ECECEC"}
                                                        borderRadius={"10px"}
                                                        placeholder="Digite suas experiências"
                                                        value={values.experiencia}
                                                        onChange={handleChange}
                                                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                        bg={"white"}
                                                    />
                                                </Box>

                                                {/* Disponível para trabias */}
                                                <Box w={"400px"}>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                        Disponível para trabias
                                                    </Text>
                                                    <Select
                                                        name="dispInd"
                                                        mt="10px"
                                                        w={"400px"}
                                                        h={"35px"}
                                                        borderWidth={"2px"}
                                                        borderColor={"#ECECEC"}
                                                        borderRadius={"10px"}
                                                        value={values.dispInd}
                                                        onChange={handleChange}
                                                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                        bg={"white"}
                                                    >
                                                        <option value="disponivel">Disponível</option>
                                                        <option value="indisponivel">Indisponível</option>
                                                    </Select>
                                                </Box>
                                            </VStack>
                                        </Box>
                                    </TabPanel>

                                    {/* Aba de Informações profissionais */}
                                    <TabPanel>
                                        <Box w={"100%"} mt={"10px"}>
                                            <VStack spacing={"15px"} align="stretch">
                                                {/* Áreas de Ensino */}
                                                <Box w={"100%"}>
                                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                        Áreas de ensino
                                                    </Text>

                                                    {/* Áreas selecionadas */}
                                                    <VStack align="flex-start" mt="10px">
                                                        {selectedAreas.map((area) => (
                                                            <Tag
                                                                key={area}
                                                                size="lg"
                                                                colorScheme="blue"
                                                                borderRadius="full"
                                                                py={2}
                                                                px={4}
                                                            >
                                                                <TagLabel>{area}</TagLabel>
                                                                <TagCloseButton onClick={() => handleRemoveArea(area)} />
                                                            </Tag>
                                                        ))}
                                                    </VStack>

                                                    {/* Select para escolher novas áreas */}
                                                    <HStack mt="10px" spacing={3}>
                                                        <Select
                                                            placeholder="Selecione uma área de ensino"
                                                            value={newArea}
                                                            onChange={(e) => setNewArea(e.target.value)}
                                                            w={"70%"}
                                                            bg={"white"}
                                                        >
                                                            {predefinedAreas
                                                                .filter((area) => !selectedAreas.includes(area))
                                                                .map((area) => (
                                                                    <option key={area} value={area}>
                                                                        {area}
                                                                    </option>
                                                                ))}
                                                        </Select>

                                                        <Button
                                                            onClick={handleAddArea}
                                                            leftIcon={<AddIcon />}
                                                            colorScheme="blue"
                                                            variant="solid"
                                                            w={"30%"}
                                                        >
                                                            Adicionar
                                                        </Button>
                                                    </HStack>
                                                    {/* Redes Sociais */}
                                                    <Box w={"100%"} mt={"20px"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                            Redes Sociais
                                                        </Text>

                                                        {/* LinkedIn */}
                                                        <HStack mt="10px">
                                                            <IconButton
                                                                icon={<FaLinkedin />}
                                                                aria-label="LinkedIn"
                                                                colorScheme="linkedin"
                                                                size="lg"
                                                            />
                                                            <Input
                                                                name="linkedin"
                                                                placeholder="Link do LinkedIn"
                                                                value={values.linkedin}
                                                                onChange={handleChange}
                                                                w={"full"}
                                                                bg={"white"}
                                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                                            />
                                                        </HStack>

                                                        {/* Instagram */}
                                                        <HStack mt="10px">
                                                            <IconButton
                                                                icon={<FaInstagram />}
                                                                aria-label="Instagram"
                                                                colorScheme="pink"
                                                                size="lg"
                                                            />
                                                            <Input
                                                                name="instagram"
                                                                placeholder="Link do Instagram"
                                                                value={values.instagram}
                                                                onChange={handleChange}
                                                                w={"full"}
                                                                bg={"white"}
                                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                                            />
                                                        </HStack>

                                                        {/* Email */}
                                                        <HStack mt="10px">
                                                            <IconButton
                                                                icon={<FaEnvelope />}
                                                                aria-label="Email"
                                                                colorScheme="red"
                                                                size="lg"
                                                            />
                                                            <Input
                                                                name="email"
                                                                placeholder="Seu email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                w={"full"}
                                                                bg={"white"}
                                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                                            />
                                                        </HStack>
                                                    </Box>

                                                    {/* Trabalhos em destaque */}
                                                    <Box w={"100%"} mt={"20px"}>
                                                        <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                                            Trabalhos em destaque
                                                        </Text>
                                                        <Box maxW="1100px" mx="0" mt="20px" overflow="hidden" p="10px">
                                                            <Flex wrap="wrap" justifyContent="center" alignItems="center" gap="20px">
                                                                {trabs.map((trab, index) => (
                                                                    <CardTrab key={index} trabName={trab.trabName} trabImage={trab.trabImage} />
                                                                ))}
                                                                <PlusSquareIcon boxSize={6} color={'#05234E'} onClick={onOpen} />
                                                            </Flex>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </VStack>
                                        </Box>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <Flex mt="30px" justifyContent="space-between">
                                <Button
                                    h={"40px"}
                                    w={"120px"}
                                    borderRadius={"50px"}
                                    bg={"#ECECEC"}
                                    _hover={{ bg: "#DADADA" }}
                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    h={"40px"}
                                    w={"120px"}
                                    borderRadius={"50px"}
                                    bg={"#1D428A"}
                                    color={"white"}
                                    _hover={{
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                                        transition: "transform 0.2s ease-in-out",
                                    }}
                                    type="submit"
                                >
                                    Atualizar
                                </Button>
                            </Flex>
                        </form>
                    )}
                </Formik>
            </Flex>
        </Flex>
    );
}