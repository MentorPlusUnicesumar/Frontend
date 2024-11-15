import { Box, Button, Flex, Input, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { MenuAdmin } from "../../components/menuAdmin";
import myTheme from "../../mytheme";
import { UseAdmin, filterMentoria } from "../../utils/useAdmin";
import { UseMentorias } from "../../utils/useMentorias";
import { useNavigate } from "react-router-dom";

export function GerenciamentoMentorias() {
    const [filter, setFilter] = useState<filterMentoria>({})
    const { getMentorias } = UseAdmin();
    const { getMentoriaById } = UseMentorias();
    const nav = useNavigate();

    const { data } = useQuery({
        queryKey: ["mentorias", filter],
        queryFn: async () => getMentorias(filter)
    })

    function handleClick(id: string) {
        nav(`/mentoria/${id}`)
    }

    const widthMentoria = '20%'
    const widthMentor = '20%'
    const widthAluno = '20%'
    const widthAulas = '15%'

    const inicialValues = {
        nomeMentor: filter.nomeMentor,
        nomeAluno: filter.nomeAluno
    }

    function handleFilter(filter: filterMentoria) {
        setFilter({
            nomeAluno: filter.nomeAluno,
            nomeMentor: filter.nomeMentor
        })
    }

    return (
        <Flex w={"full"} h={"full"} flexDir={"column"} overflow={'hidden'}>
            <MenuAdmin />

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
                                    Mentorias
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
                                                placeholder="Nome do mentor"
                                                value={values.nomeMentor}
                                                onChange={(value) => {
                                                    handleChange("nomeMentor")(value);
                                                }}
                                                borderRadius={"10px"}
                                            />
                                            <Input
                                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                                                w={"250px"}
                                                placeholder="Nome do aluno"
                                                value={values.nomeAluno}
                                                onChange={(value) => {
                                                    handleChange("nomeAluno")(value);
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
                                                        nomeAluno: "",
                                                        nomeMentor: ""
                                                    });
                                                    handleChange("nomeAluno")("");
                                                    handleChange("nomeMentor")("");
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
                                        w={widthMentoria}
                                    >
                                        Mentoria
                                    </Text>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"lg"}
                                        color={myTheme.colors.azul}
                                        w={widthMentor}
                                    >
                                        Mentor
                                    </Text>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"lg"}
                                        color={myTheme.colors.azul}
                                        w={widthAluno}
                                    >
                                        Aluno
                                    </Text>
                                    <Text
                                        fontWeight={"bold"}
                                        fontSize={"lg"}
                                        color={myTheme.colors.azul}
                                        w={widthAulas}
                                    >
                                        Aulas realizadas
                                    </Text>
                                </Flex>

                                <Flex overflowY="scroll" w={'full'} h={'250px'} flexDir={'column'} className="scrollable">
                                    {data?.map((mentoria) => (
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
                                            <Text fontSize={"lg"} color={"gray"} w={widthMentoria}>
                                                {mentoria.nome}
                                            </Text>
                                            <Text fontSize={"lg"} color={"gray"} w={widthMentor}>
                                                {mentoria.idMentor.nome}
                                            </Text>
                                            <Text fontSize={"lg"} color={"gray"} w={widthAluno}>
                                                {mentoria.idAluno.nome}
                                            </Text>
                                            <Text ml={'5%'} fontSize={"lg"} color={"gray"} w={widthAulas}>
                                                {mentoria.reuniao.length} / {mentoria.qtdtotal}
                                            </Text>
                                            <Link
                                                onClick={() => handleClick(mentoria._id)}
                                            >
                                                <Text
                                                    fontSize={"lg"}
                                                    color={myTheme.colors.azul}

                                                    w={"100px"}
                                                    fontWeight={"bold"}
                                                >
                                                    Ver mais
                                                </Text>
                                            </Link>
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