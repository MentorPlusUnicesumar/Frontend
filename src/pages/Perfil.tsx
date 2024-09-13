import {
    Avatar,
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { MenuUsuario } from "../components/menu";
import { AuthContext } from "../context/authContext";
import { DadosCadastro } from "./TelasPerfil/dadosCadastro";
import { InformacoesProfissional } from "./TelasPerfil/informacoesProfissional";

export function Perfil() {
    const { user } = useContext(AuthContext);

    const initialValues = {
        nome: user!.name,
        cidade: user!.cidade,
        estado: user!.uf,
        competencia: "",
        experiencia: "",
        sobre: "",
        dispInd: "Disponível",
        linkedin: "www.linkedin.com/GabrielPrisco",
        instagram: "www.instagram.com/GabrielPrisco",
        email: "Gabrielprisco@gmail.com"
    };   

    function handleSave(values: any) {
        console.log("Valores atualizados:", values);
    }

    return (

        <Flex w={"full"} h={"full"} flexDir={"column"} alignItems={"center"}>

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
                                    <TabPanel>
                                        <DadosCadastro  />
                                    </TabPanel>

                                    <TabPanel>
                                        <InformacoesProfissional />
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