import { Flex, Img, Link, Text } from "@chakra-ui/react";
import logo from "../imgs/logo.png";
import myTheme from "../mytheme";

export function TelaPadraoLogin() {
  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      p={"30px"}
      h={"100%"}
      w={"35%"}
      bg={myTheme.colors.azul}
    >
      <Text color={"white"} fontSize={"lg"} mt={"50px"} fontWeight={"light"}>
        Bem-vindo ao
      </Text>
      <Img src={logo} w={"320px"} h={"150px"} mt={"100px"} />
      <Text
        color={"white"}
        fontSize={"sm"}
        fontWeight={"light"}
        mt={"50px"}
        textAlign={"center"}
      >
        Seu caminho para o sucesso começa aqui. Junte-se à Mentor+ e alcance
        novos horizontes!
      </Text>
      <Link>
        <Text color={"white"} fontSize={"sm"} mt={"150px"} textAlign={"center"}>
          www.matera.com.br
        </Text>
      </Link>
    </Flex>
  );
}
