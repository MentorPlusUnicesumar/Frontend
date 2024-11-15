import { Flex, Img, Link, Text } from "@chakra-ui/react";
import logo from "../imgs/logoTop.png";

export function TelaPadraoLogin() {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      p={"30px"}
      h={"100%"}
      w={"35%"}
      bg={"linear-gradient(to right, #000024 60%, #000030 100%)"}
    >
      <Text color={"white"} fontSize={"lg"} mt={"10%"} fontWeight={"light"}>
        Bem-vindo ao
      </Text>
      <Img src={logo} w={"320px"} mt={"100px"} />
      <Text
        color={"white"}
        fontSize={"sm"}
        fontWeight={"light"}
        mt={"50px"}
        w={"350px"}
        textAlign={"center"}
      >
        Seu caminho para o sucesso começa aqui. Junte-se à Mentor+ e alcance
        novos horizontes!
      </Text>
      <Link>
        <Text color={"white"} fontSize={"sm"} mt={"38vh"} textAlign={"center"}>
          www.matera.com.br
        </Text>
      </Link>
    </Flex>
  );
}
