import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import { TextInputCadastro } from "../../components/textInputCadastro";
import { Formik } from "formik";
import { UseCadastro, UserInterface } from "../../utils/useCadastro";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export function AbaAluno() {
    const { getAreas, cadastroUsuario } = UseCadastro();

    const nav = useNavigate();

    const { data } = useQuery({
        queryKey: ["areasInteresse"],
        queryFn: async () => getAreas()
    })

    const inicialValues = {
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        cidade: "",
        uf: "",
        senha: "",
        fotos: "",
        typeUser: "Aluno",
        areas: []
    }

    async function cadastrar(values: UserInterface) {
        const data = await cadastroUsuario(values)
        console.log("asdasd", data)
    }

    return (
        <Formik initialValues={inicialValues} onSubmit={cadastrar}>
            {({ handleSubmit, handleChange, values, setFieldValue }) => (
                <Flex flexDir={'column'} w={'full'}>
                    <Box gap={2} display={'flex'} flexDir={'row'}>
                        <TextInputCadastro
                            w="370px"
                            placeholder="Nome completo"
                            name="nome"
                            value={values.nome}
                            onChange={(value) => {
                                handleChange("nome")(value);
                            }} />
                        <TextInputCadastro
                            w="370px"
                            placeholder="E-mail"
                            name="email"
                            value={values.email}
                            onChange={(value) => {
                                handleChange("email")(value);
                            }} />
                    </Box>

                    <Box mt={'20px'} gap={2} display={'flex'} flexDir={'row'}>
                        <TextInputCadastro
                            w="370px"
                            placeholder="Telefone"
                            name="telefone"
                            value={values.telefone}
                            onChange={(value) => {
                                handleChange("telefone")(value);
                            }} />
                        <TextInputCadastro
                            w="370px"
                            placeholder="cpf"
                            name="cpf"
                            value={values.cpf}
                            onChange={(value) => {
                                handleChange("cpf")(value);
                            }} />
                    </Box>

                    <Box gap={2} display={'flex'} mt={'15px'} flexDir={'row'}>
                        <TextInputCadastro
                            w="370px"
                            placeholder="Cidade"
                            name="cidade"
                            value={values.cidade}
                            onChange={(value) => {
                                handleChange("cidade")(value);
                            }} />
                        <TextInputCadastro
                            w="370px"
                            placeholder="uf"
                            name="uf"
                            value={values.uf}
                            onChange={(value) => {
                                handleChange("uf")(value);
                            }} />
                    </Box>

                    <Box mt={'15px'} gap={2} display={'flex'} flexDir={'row'}>
                        <TextInputCadastro
                            w="370px"
                            placeholder="Senha"
                            name="senha"
                            value={values.senha}
                            onChange={(value) => {
                                handleChange("senha")(value);
                            }} />
                        <TextInputCadastro
                            w="370px"
                            placeholder="Foto de perfil"
                            name="Foto de perfil"
                            value={values.fotos || null}
                            onChange={(value) => {
                                handleChange("fotos")(value);
                            }} />
                    </Box>

                    <Select
                        borderColor="#ECECEC"
                        borderRadius="5px"
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                        placeholder="Áreas de interesse"
                        w={'770px'}
                        mt={'30px'}
                        name="areasInteresse"
                        onChange={(e) => {
                            const options = Array.from(e.target.options);
                            const selectedValues = options
                                .filter(option => option.selected)
                                .map(option => option.value);
                            setFieldValue("areas", selectedValues);
                        }}
                        value={values.areas}
                    >
                        {data?.map((area, index) => (
                            <option key={index} value={area._id}>
                                {area.nome}
                            </option>
                        ))}
                    </Select>

                    <Box mt={'8%'} display={'flex'} justifyContent={'center'} gap={5}>
                        <Button
                            w={"170px"}
                            borderRadius={"10px"}
                            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                            onClick={() => nav("/login")}
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
            )}
        </Formik>
    )
}