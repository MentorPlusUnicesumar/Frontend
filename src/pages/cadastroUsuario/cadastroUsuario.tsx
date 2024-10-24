import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { TelaPadraoLogin } from "../../components/TelaPadraoLogin";
import { TextInputCadastro } from "../../components/textInputCadastro";

export function CadastroUsuario() {
    const inicialValues = {
        email: "",
        senha: "",
    };

    async function handleLogin() {

    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"row"}>
            <TelaPadraoLogin />

            <Formik initialValues={inicialValues} onSubmit={handleLogin}>
                {({ handleSubmit, handleChange, values }) => (
                    <Flex
                        px={"30px"}
                        w={"65%"}
                        h={"100%"}
                        // alignItems={"center"}
                        flexDir={"column"}
                    >
                        <Text
                            mt={"30px"}
                            fontSize={"2xl"}
                            fontWeight={"bold"}
                            color={"#05234E"}
                        >
                            Quero ser:
                        </Text>
                        <Tabs mt={'10px'}>
                            <TabList>
                                <Tab>Aluno</Tab>
                                <Tab>Mentor</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Flex flexDir={'column'} w={'full'}>
                                        <Box gap={2} display={'flex'} flexDir={'row'}>
                                            <TextInputCadastro w="370px" placeholder="Nome completo" name="nome" />
                                            <TextInputCadastro w="370px" placeholder="E-mail" name="email" />
                                        </Box>

                                        <Box mt={'20px'} gap={2} display={'flex'} flexDir={'row'}>
                                            <TextInputCadastro w="370px" placeholder="Telefone" name="telefone" />
                                            <TextInputCadastro w="370px" placeholder="CPF" name="CPF" />
                                        </Box>

                                        <Box gap={2} display={'flex'} mt={'15px'} flexDir={'row'}>
                                            <TextInputCadastro w="370px" placeholder="Cidade" name="cidade" />
                                            <TextInputCadastro w="370px" placeholder="UF" name="UF" />
                                        </Box>

                                        <Box mt={'15px'} gap={2} display={'flex'}  flexDir={'row'}>
                                            <TextInputCadastro  w="370px" placeholder="Senha" name="senha" />
                                            <TextInputCadastro  w="370px" placeholder="Foto de perfil" name="Foto de perfil" />
                                        </Box>

                                        <TextInputCadastro mt="15px" w="770px" placeholder="Áreas de interesse" name="Áreas de interesse" />

                                        <Box mt={'8%'} display={'flex'} justifyContent={'center'} gap={5}>
                                            <Button
                                                w={"170px"}
                                                borderRadius={"10px"}
                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                onClick={() => handleSubmit()}
                                                _hover={{
                                                    transform: "scale(1.05)",
                                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                                                    transition: "transform 0.2s ease-in-out",
                                                }}
                                                bg={"#1D428A"}
                                            >
                                                <Text color={"white"} fontSize={"sm"} fontWeight={"bold"}>
                                                    Cancelar
                                                </Text>
                                            </Button>
                                            <Button
                                                w={"170px"}
                                                borderRadius={"10px"}
                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                                onClick={() => handleSubmit()}
                                                _hover={{
                                                    transform: "scale(1.05)",
                                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                                                    transition: "transform 0.2s ease-in-out",
                                                }}
                                                bg={"#1D428A"}
                                            >
                                                <Text color={"white"} fontSize={"sm"} fontWeight={"bold"}>
                                                    Enviar cadastro
                                                </Text>
                                            </Button>
                                        </Box>
                                    </Flex>
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </Flex>
                )}
            </Formik>
        </Flex>
    )
}