import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import myTheme from "../../mytheme";
import { Aula } from "./telaMentoria";
import { formatDateBR } from "../../commons/formatDate";
import { BodyEnvioAtualizaEncontro, UseMentorias } from "../../utils/useMentorias";

type Props = {
    id?: string
    OpenModalEdit: boolean;
    setOpenModalEdit: (open: boolean) => void;
    aula: Aula | undefined
}

export function ModalEditarAula({ aula, id, OpenModalEdit, setOpenModalEdit }: Props) {
    const toast = useToast();
    const { atualizarEncontro } = UseMentorias()

    const inicialValues = {
        resumo: aula!.resumo,
        feedback: aula!.comentario,
        materialAnexado: aula!.arquivos
    }

    async function handleEdit(props: BodyEnvioAtualizaEncontro) {
        try {
            await atualizarEncontro(aula!.idEncontro, props)
            
            setOpenModalEdit(false)
         
        } catch (error) {
            return toast({
                title: "Erro ao atualizar dados do encontro!",
                status: "error",
                duration: 2000,
                isClosable: false,
            });
        }
    }

    return (
        <Modal size={"2xl"} isOpen={OpenModalEdit} onClose={() => setOpenModalEdit(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
                        {`Editar aula do dia ${formatDateBR(String(aula!.diaAula), true)}`} 
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex alignItems={'center'} my={'20px'} flexDir={'column'} w={'full'} h={'full'}>
                        <Formik initialValues={inicialValues} onSubmit={handleEdit}>
                            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                                <Flex alignItems={'center'} flexDir={'column'} w={'full'} h={'full'}>
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
                                    <Box w="full" mt={'30px'}>
                                        <Text fontSize="lg" fontWeight="bold" color="#05234E">
                                            Comentário
                                        </Text>
                                        <Textarea
                                            mt="5px"
                                            w={'full'}
                                            h="120px"
                                            value={values.feedback}
                                            borderColor="#ECECEC"
                                            borderRadius="5px"
                                            onChange={(value) => {
                                                handleChange("feedback")(value);
                                            }}
                                            placeholder={'Comentário da aula'}
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

                                    <Box w="full" mt={'30px'}>
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
                                </Flex>
                            )}
                        </Formik>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}