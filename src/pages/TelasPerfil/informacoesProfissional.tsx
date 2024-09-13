import { Box, Button, Flex, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tag, TagCloseButton, TagLabel, Text, Textarea, VStack, useDisclosure } from "@chakra-ui/react";
import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CardTrab } from "../../components/card-trab-mentor";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Formik } from "formik";
import { UserData } from "../../context/contestTypes";

export function InformacoesProfissional() {
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

    const predefinedAreas = [
        "Administração",
        "Engenharia de Software",
        "Análise de dados",
        "Marketing",
        "Finanças",
        "Ciência de Dados",
    ];

    const initialValues = {
        linkedin: "www.linkedin.com/GabrielPrisco",
        instagram: "www.instagram.com/GabrielPrisco",
        email: "Gabrielprisco@gmail.com"
    };

    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [newArea, setNewArea] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()

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
        <Flex>
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
            <Formik initialValues={initialValues} onSubmit={handleSave}>
                {({ handleSubmit, handleChange, values }) => (
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

                                {/* <Box w={"100%"} mt={"20px"}>
                                    <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
                                        Redes Sociais
                                    </Text>

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
                                            w={"full"}
                                            bg={"white"}
                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                        />
                                    </HStack>

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
                                            w={"full"}
                                            bg={"white"}
                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                        />
                                    </HStack>

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
                                            w={"full"}
                                            bg={"white"}
                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                        />
                                    </HStack>
                                </Box> */}

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
                )}
                </Formik>
        </Flex>
    )
}