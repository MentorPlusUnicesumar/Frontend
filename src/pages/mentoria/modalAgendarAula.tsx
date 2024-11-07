import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import myTheme from "../../mytheme";
import { CreateReuniao, UseMentorias } from "../../utils/useMentorias";

type Props = {
    id?: string
    OpenModalAgendamento: boolean;
    setOpenModalAgendamento: (open: boolean) => void;
}

export function ModalAgendarAula({ id, OpenModalAgendamento, setOpenModalAgendamento }: Props) {
    const { agendarEncontro } = UseMentorias()
    const toast = useToast();

    const inicialValues = {
        idMentoria: id!,
        diaReuniao: undefined,
        resumo: "",
        materialAnexado: []
    }

    async function agendarReuniao(reuniao: CreateReuniao) {
        try {
            await agendarEncontro(reuniao)

            setOpenModalAgendamento(false)

            return toast({
                title: "Encontro marcado com sucesso",
                status: "success",
                duration: 2000,
                isClosable: false,
            });
        } catch (error) {
            return toast({
                title: "Erro ao marcar encontro",
                status: "error",
                duration: 2000,
                isClosable: false,
            });
        }
    }

    return (
        <Modal size={"2xl"} isOpen={OpenModalAgendamento} onClose={() => setOpenModalAgendamento(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
                        Agendar encontro
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex alignItems={'center'} my={'20px'} flexDir={'column'} w={'full'} h={'full'}>
                        <Formik initialValues={inicialValues} onSubmit={agendarReuniao}>
                            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                <>
                                    <Box w="full">
                                        <Text fontSize="lg" fontWeight="bold" color="#05234E">
                                            Resumo da aula
                                        </Text>
                                        <Textarea
                                            mt="5px"
                                            w={'full'}
                                            h="120px"
                                            value={values.resumo}
                                            borderColor="#ECECEC"
                                            borderRadius="5px"
                                            onChange={(value) => {
                                                handleChange("resumo")(value);
                                            }}
                                            placeholder={'Tema da próxima aula'}
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

                                    <Box w={'full'} mt={'30px'}>
                                        <Text fontSize="lg" fontWeight="bold" color="#05234E">
                                            Arquivos
                                        </Text>
                                        <Input
                                            mt="10px"
                                            w={'full'}
                                            h="35px"
                                            borderColor="#ECECEC"
                                            borderRadius="5px"
                                            onChange={(value) => {
                                                handleChange("materialAnexado")(value);
                                            }}
                                            value={values.materialAnexado}
                                            placeholder={'Adicionar arquivos'}
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

                                    <Box w={'full'} mt={'30px'}>
                                        <Text fontSize="lg" fontWeight="bold" color="#05234E">
                                            Data
                                        </Text>
                                        <Input
                                            mt="10px"
                                            w={'full'}
                                            h="35px"
                                            borderColor="#ECECEC"
                                            borderRadius="5px"
                                            onChange={(e) => {
                                                const selectedDate = new Date(e.target.value);
                                                setFieldValue('diaReuniao', selectedDate);
                                            }}
                                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                                            bg="white"
                                            sx={{
                                                "::placeholder": {
                                                    fontSize: "12px",
                                                    color: "#B0B0B0",
                                                },
                                            }} type="datetime-local"
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
                                            Agendar
                                        </Text>
                                    </Button>
                                </>
                            )}
                        </Formik>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}