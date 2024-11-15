import {
    Box,
    Button,
    Checkbox,
    Flex,
    HStack,
    Img,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Text,
    Toast,
    theme,
    useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TextInput } from "../../components/textInput";
import { AuthContext } from "../../context/authContext";
import logo from "../../imgs/logo2.png";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { TelaPadraoLogin } from "../../components/TelaPadraoLogin";
import myTheme from "../../mytheme";

type LoginProps = {
    email: string;
    senha: string;
};

export function LoginCelular() {
    const navigate = useNavigate();
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const toast = useToast();
    const { login, isSignedIn, user } = useContext(AuthContext);

    const inicialValues = {
        email: "",
        senha: "",
    };

    async function handleLogin({ email, senha }: LoginProps) {
        try {
            const data = await login({ email, senha });

            if (data?.typeUser === 'Admin') {
                navigate("/gerenciamento-usuarios");
            } else {
                navigate("/minhas-mentorias");
            }

            return toast({
                title: "Login realizado com sucesso",
                status: "success",
                duration: 2000,
                isClosable: false,
            });
        } catch (error) {
            return toast({
                title: "Falha ao realizar login, tente novamente!",
                status: "error",
                duration: 2000,
                isClosable: false,
            });
        }
    }

    return (
        <Flex w={"100%"} h={"100%"} flexDir={"row"} alignItems={'center'} flexDirection={'column'}>
            <Img src={logo} w={"300px"} h={"120px"} mt={"50px"} />

            <Formik initialValues={inicialValues} onSubmit={handleLogin}>
                {({ handleSubmit, handleChange, values }) => (
                    <Flex
                        p={"30px"}
                        w={"100%"}
                        h={"100%"}
                        alignItems={"center"}
                        flexDir={"column"}
                    >

                        <Box mt={"50px"}>
                            <Text
                                mb={"10px"}
                                fontSize={"lg"}
                                fontWeight={"bold"}
                                color={"#05234E"}
                            >
                                Endereço de E-mail
                            </Text>
                            <Input
                                w={"300px"}
                                borderWidth={"2px"}
                                borderColor={"#ECECEC"}
                                borderRadius={"10px"}
                                placeholder={"Informe seu e-mail"}
                                onChange={(value) => {
                                    handleChange("email")(value);
                                }}
                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                bg={"white"}
                                sx={{
                                    "::placeholder": {
                                        fontSize: "12px",
                                        color: "#B0B0B0",
                                    },
                                }}
                            />
                        </Box>
                        <Box display={"flex"} flexDir={"column"} mt={"20px"}>
                            <Text
                                mb={"10px"}
                                fontSize={"lg"}
                                fontWeight={"bold"}
                                color={"#05234E"}
                            >
                                Senha
                            </Text>
                            <InputGroup>
                                <Input
                                    w={"300px"}
                                    borderWidth={"2px"}
                                    borderColor={"#ECECEC"}
                                    borderRadius={"10px"}
                                    placeholder={"Informe sua senha"}
                                    type={isVisiblePassword ? "text" : "password"}
                                    onChange={(value) => {
                                        handleChange("senha")(value);
                                    }}
                                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                    bg={"white"}
                                    sx={{
                                        "::placeholder": {
                                            fontSize: "12px",
                                            color: "#B0B0B0",
                                        },
                                    }}
                                />
                                <InputRightElement>
                                    {isVisiblePassword === false ? (
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            color="black"
                                            size="sm"
                                            onClick={() => setIsVisiblePassword(true)}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faEyeSlash}
                                            color="black"
                                            size="sm"
                                            onClick={() => setIsVisiblePassword(false)}
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        <Flex mt={"10px"} justifyContent={"flex-end"}>
                            <Link>
                                <Text color={"#05234E"} fontSize={"sm"} fontWeight={"light"}>
                                    Esqueceu sua senha?
                                </Text>
                            </Link>
                        </Flex>
                        <Flex mt={"50px"} justifyContent={"space-between"} flexDir={'column'}>
                            <Button
                                w={"300px"}
                                borderRadius={"10px"}
                                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                                onClick={() => handleSubmit()}
                                _hover={{
                                    transform: "scale(1.05)",
                                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                                    transition: "transform 0.2s ease-in-out",
                                }}
                                bg={"linear-gradient(to right, #000024 60%, #000030 100%)"}
                            >
                                <Text color={"white"} fontSize={"sm"} fontWeight={"bold"}>
                                    Login
                                </Text>
                            </Button>
                            <HStack mt={'15px'}>
                                <Text>Não possui uma conta?</Text>
                                <Text fontWeight={'bold'}>Cadastre-se</Text>
                            </HStack>
                        </Flex>
                    </Flex>
                )}
            </Formik>

        </Flex>
    );
}
