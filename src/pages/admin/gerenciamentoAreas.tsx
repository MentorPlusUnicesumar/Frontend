import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, Icon, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import { MenuAdmin } from "../../components/menuAdmin";
import myTheme from "../../mytheme";
import { UseAdmin, filterArea } from "../../utils/useAdmin";

export function GerenciamentoAreas() {
    const [filter, setFilter] = useState<filterArea>({})
    const [modalDelete, setModalDelete] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getAreas, deleteArea, editAreas } = UseAdmin();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const toast = useToast();

    const inicialValues = {
        nome: ""
    }

    const inicialValuesEdit = {
        nome: ""
    }

    async function handleFilter({ nome, _id }: filterArea) {
        try {
            await editAreas({_id, nome})

            onClose()

            return toast({
                title: 'Nome da área alterada com sucesso!',
                status: "success",
                duration: 2000,
                isClosable: false,
              });
        } catch (error) {
            return toast({
                title: 'Erro ao alterar o nome da área!',
                status: "error",
                duration: 2000,
                isClosable: false,
              });
        }
    }

    async function handleEdit({ nome }: filterArea) {

    }

    const { data } = useQuery({
        queryKey: ["areas", filter],
        queryFn: async () => getAreas(filter)
    })

    const widthAreas = '20%'
    const widthMentor = '20%'
    const widthAluno = '20%'

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} overflow={'hidden'}>
            <MenuAdmin />

            <AlertDialog
                isOpen={modalDelete}
                leastDestructiveRef={cancelRef}
                onClose={() => setModalDelete(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Deletar Área
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza que deseja deletar essa área?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
                            Editar Área
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex alignItems={'center'} my={'20px'} flexDir={'column'} w={'full'} h={'full'}>
                            <Formik initialValues={inicialValuesEdit} onSubmit={handleEdit}>
                                {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                    <>
                                        <Box w={'full'} mt={'30px'}>
                                            <Text fontSize="lg" fontWeight="bold" color="#05234E">
                                                Nome da Área
                                            </Text>
                                            <Input
                                                mt="10px"
                                                w={'full'}
                                                h="35px"
                                                borderColor="#ECECEC"
                                                borderRadius="5px"
                                                name="nome"
                                                onChange={(value) => {
                                                    handleChange("nome")(value);
                                                }}
                                                value={values.nome}
                                                placeholder={'Informe o nome da área'}
                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                                                bg="white"
                                                sx={{
                                                    "::placeholder": {
                                                        fontSize: "12px",
                                                        color: "#B0B0B0",
                                                    },
                                                }}
                                            />
                                        </Box>

                                        <Button
                                            mt={"50px"}
                                            h={"35px"}
                                            w={"120px"}
                                            borderRadius={"10px"}
                                            onClick={() => handleSubmit()}
                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                                            _hover={{
                                                transform: "scale(1.05)",
                                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                                                transition: "transform 0.2s ease-in-out",
                                            }}
                                            bg={myTheme.colors.azul_claro}
                                        >
                                            <Text
                                                color={"white"}
                                                fontSize={"sm"}
                                                fontWeight={"semi-bold"}
                                            >
                                                Salvar
                                            </Text>
                                        </Button>
                                    </>
                                )}
                            </Formik>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Box w={"full"} h={"full"} p={"30px"}>
                <Flex
                    w={"full"}
                    h={"100%"}
                    p={"30px"}
                    borderWidth={"1px"}
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                    borderColor={myTheme.colors.cinza_hover}
                    borderRadius={"10px"}
                >
                    <Tabs w={'full'}>
                        <TabList>
                            <Tab>
                                <Text fontSize={"lg"} fontWeight={"bold"}>
                                    Áreas
                                </Text>
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Text fontSize={"lg"} fontWeight={"bold"}>
                                    Buscar por:
                                </Text>
                                <Formik initialValues={inicialValues} onSubmit={handleFilter}>
                                    {({ handleSubmit, handleChange, values, resetForm }) => (
                                        <Flex mt={"10px"} gap={5}>
                                            <Input
                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                                w={"250px"}
                                                placeholder="Nome do área"
                                                value={values.nome}
                                                name="nome"
                                                onChange={(value) => {
                                                    handleChange("nome")(value);
                                                }}
                                                borderRadius={"10px"}
                                            />

                                            <Box display={'flex'} flexDir={'row'} alignItems={'center'} gap={5}>
                                                <Button
                                                    w={"150px"}
                                                    _hover={{
                                                        transform: "scale(1.05)",
                                                        transition: "transform 0.2s ease-in-out",
                                                    }}
                                                    bg={"linear-gradient(to right, #000024 60%, #000030 100%)"}
                                                    h={"40px"}
                                                    onClick={() => handleSubmit()}
                                                >
                                                    <Text fontWeight={"bold"} color={"white"}>
                                                        Filtrar
                                                    </Text>
                                                </Button>
                                                <Link onClick={() => {
                                                    setFilter({
                                                        nome: ""
                                                    });
                                                    handleChange("nome")("");
                                                }}>
                                                    <Text>Limpar</Text>
                                                </Link>
                                            </Box>
                                        </Flex>
                                    )}
                                </Formik>

                                <Flex mt={"30px"} gap={5} p={"10px"}>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"lg"}
                                        color={myTheme.colors.azul}
                                        w={widthAreas}
                                    >
                                        Área
                                    </Text>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"lg"}
                                        color={myTheme.colors.azul}
                                        w={widthMentor}
                                    >
                                        Mentores
                                    </Text>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"lg"}
                                        color={myTheme.colors.azul}
                                        w={widthAluno}
                                    >
                                        Alunos
                                    </Text>
                                </Flex>

                                <Flex overflowY="scroll" w={'full'} h={'250px'} flexDir={'column'} className="scrollable">
                                    {data?.map((area) => (
                                        <Flex
                                            mt={"15px"}
                                            gap={5}
                                            w={"full"}
                                            h={"40px"}
                                            borderRadius={"10px"}
                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                            alignItems={"center"}
                                            p={"10px"}
                                            borderWidth={"1px"}
                                        >
                                            <Text fontSize={"lg"} color={"gray"} w={widthAreas}>
                                                {area.nome}
                                            </Text>
                                            <Text fontSize={"lg"} color={"gray"} w={widthMentor}>
                                                {area.numeroDeMentores}
                                            </Text>
                                            <Text fontSize={"lg"} color={"gray"} w={widthAluno}>
                                                {area.numeroDeAlunos}
                                            </Text>

                                            <Icon w={5} h={5} as={BsFillPencilFill} onClick={onOpen} />
                                            <Icon w={5} h={5} as={FaTrash} onClick={() => setModalDelete(true)} />
                                        </Flex>
                                    ))}
                                </Flex>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
            </Box>
        </Flex>
    )
}