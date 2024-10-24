import {
  Box,
  Button,
  Checkbox,
  Flex,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TextInput } from "../../components/text-input";
import { AuthContext } from "../../context/authContext";
import logo from "../../imgs/logo.png";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { TelaPadraoLogin } from "../../components/TelaPadraoLogin";

type LoginProps = {
  email: string;
  senha: string;
};

export function Login() {
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toast = useToast();
  const { login, isSignedIn } = useContext(AuthContext);

  const inicialValues = {
    email: "",
    senha: "",
  };

  async function handleLogin({ email, senha }: LoginProps) {
    try {
      await login({ email, senha });

      navigate("/minhas-mentorias");

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
    <Flex w={"100%"} h={"100%"} display={"flex"} flexDir={"row"}>
      <TelaPadraoLogin />

      <Formik initialValues={inicialValues} onSubmit={handleLogin}>
        {({ handleSubmit, handleChange, values }) => (
          <Flex
            p={"30px"}
            w={"65%"}
            h={"100%"}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Text
              mt={"50px"}
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={"#05234E"}
            >
              Login
            </Text>

            <Box w={"400px"} mt={"80px"}>
              <Text
                mb={"10px"}
                fontSize={"lg"}
                fontWeight={"bold"}
                color={"#05234E"}
              >
                Endereço de E-mail
              </Text>
              <Input
                w={"400px"}
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
            <Box display={"flex"} flexDir={"column"} w={"400px"} mt={"20px"}>
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
                  w={"400px"}
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

            <Flex w="400px" mt={"10px"} justifyContent={"space-between"}>
              <Checkbox size="sm" defaultChecked>
                <Text fontSize={"sm"} fontWeight={"light"}>
                  Manter conectado
                </Text>
              </Checkbox>
              <Link>
                <Text color={"#05234E"} fontSize={"sm"} fontWeight={"light"}>
                  Esqueceu sua senha?
                </Text>
              </Link>
            </Flex>
            <Flex w={"400px"} mt={"50px"} justifyContent={"space-between"}>
              <Button
                w={"170px"}
                borderRadius={"10px"}
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.2s ease-in-out",
                }}
                bg={"#F6F6F6"}
              >
                <Text color={"#05234E"} fontSize={"sm"} fontWeight={"bold"}>
                  Fazer Cadastro
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
                  Login
                </Text>
              </Button>
            </Flex>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}
