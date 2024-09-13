import { Box, Flex, HStack, Select, Text, Textarea, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { TextInput } from "../../components/textInput";
import myTheme from "../../mytheme";
import { UserData } from "../../context/contestTypes";

export function DadosCadastro() {
    const { user } = useContext(AuthContext);

    const initialValues = {
        nome: user!.name,
        cidade: user!.cidade,
        estado: user!.uf,
        competencia: "",
        experiencia: "",
        sobre: "",
        dispInd: "Disponível",
    };

    function handleSave(values: any) {
        console.log("Valores atualizados:", values);
    }

    return (
        <Flex>
            <Formik initialValues={initialValues} onSubmit={handleSave}>
                {({ handleSubmit, handleChange, values }) => (
                    <Box w={"100%"} mt={"10px"}>
                        <VStack spacing={"15px"} align="stretch">
                            <TextInput name="Nome" w={'100%'} placeholder="Informe seu nome" value={user!.name} />
                            <HStack>
                                <TextInput name="Cidade" w={'100%'} placeholder="Informe a sua cidade " value={values.cidade} />
                                <TextInput name="Estado" w={'100%'} placeholder="Informe o seu estado " value={values.estado} />
                            </HStack>

                            <Box>
                                <Text fontSize="lg" fontWeight="bold" color={myTheme.colors.azul}>Sobre</Text>
                                <Textarea
                                    borderWidth="2px"
                                    borderColor="#ECECEC"
                                    borderRadius="10px"
                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                    bg="white"
                                    sx={{
                                        "::placeholder": {
                                            fontSize: "12px",
                                            color: "#B0B0B0",
                                        },
                                    }}
                                    placeholder="Fale sobre você" value={values.sobre} />
                            </Box>

                            <Box>
                                <Text fontSize="lg" fontWeight="bold" color={myTheme.colors.azul}>Competências</Text>
                                <Textarea
                                    borderWidth="2px"
                                    borderColor="#ECECEC"
                                    borderRadius="10px"
                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                    bg="white"
                                    sx={{
                                        "::placeholder": {
                                            fontSize: "12px",
                                            color: "#B0B0B0",
                                        },
                                    }}
                                    placeholder="Fale sobre suas competências" value={values.competencia} />
                            </Box>

                            <Box>
                                <Text fontSize="lg" fontWeight="bold" color={myTheme.colors.azul}>Experiências</Text>
                                <Textarea
                                    borderWidth="2px"
                                    borderColor="#ECECEC"
                                    borderRadius="10px"
                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                    bg="white"
                                    sx={{
                                        "::placeholder": {
                                            fontSize: "12px",
                                            color: "#B0B0B0",
                                        },
                                    }}
                                    placeholder="Fale sobre suas competências" value={values.experiencia} />
                            </Box>

                            <Box w={"400px"}>
                                <Text fontSize={"lg"} fontWeight={"bold"} color={myTheme.colors.azul}>
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
                )}
            </Formik>

        </Flex>
    )
}