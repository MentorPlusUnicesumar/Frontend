import { Box, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { InputPerfil } from "../../components/InputAlteraPerfil";

export function PainelDadosCadastro() {
  const { user } = useContext(AuthContext);
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  return (
    <Box w={"100%"} mt={"10px"}>
      <VStack spacing={"15px"} align="stretch">
        <InputPerfil name="nome" value={user!.nome} label="Nome" />
        <InputPerfil name="email" value={user!.email} label="E-mail" />
        <InputPerfil name="telefone" value={user!.telefone} label="Telefone" />
        <InputPerfil name="cidade" value={user!.cidade} label="Cidade" />

        <Box w={"full"}>
          <Text fontSize={"lg"} fontWeight={"bold"} color={"#05234E"}>
            Estado
          </Text>
          <Select
            mt="10px"
            w={"full"}
            h={"35px"}
            borderWidth={"2px"}
            borderColor={"#ECECEC"}
            borderRadius={"10px"}
            value={user?.uf}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
            bg={"white"}
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </Select>
        </Box>
      </VStack>
    </Box>
  );
}
