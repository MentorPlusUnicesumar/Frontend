import { Flex, Link, Text } from "@chakra-ui/react";
import { CardMentoria } from "../components/card-mentoria";
import { MenuUsuario } from "../components/Menu";
import myTheme from "../mytheme";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <MenuUsuario />

      <Flex
        p="30px"
        alignItems={"center"}
        w={"full"}
        h={"full"}
        flexDir={"column"}
      >
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul_claro}
        >
          Mentorias
        </Text>
        <Flex gap={10} mt={"50px"} px={"100px"} w={"full"}>
          <CardMentoria
            nomeMentoria="Engenharia de Software"
            mentorName="Pedro Mazzurana"
            date="28/08/2024"
          />
          <CardMentoria
            nomeMentoria="SecureDev"
            mentorName="Guilherme Nairne"
            date="30/08/2024"
          />
          <CardMentoria
            nomeMentoria="Data science"
            mentorName="Gabriel Prisco"
            date="01/09/2024"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
