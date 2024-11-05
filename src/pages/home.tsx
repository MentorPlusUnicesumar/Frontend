import { Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { MenuUsuario } from "../components/menu";
import { AuthContext } from "../context/authContext";
import { UseMentorias } from "../utils/useMentorias";
import myTheme from "../mytheme";
import { CardMentoriaAluno } from "../components/cardMentoriaAluno";
import { CardMentoriaMentor } from "../components/cardMentoriaMentor";

export function Home() {
  const { user } = useContext(AuthContext);

  const { getMentorias } = UseMentorias();

  const { data } = useQuery({
    queryKey: ["mentorias"],
    queryFn: async () => getMentorias(user!._id),
  });

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
          {user?.typeUser === "Aluno"
            ? data?.map((mentoria, index) => (
                <CardMentoriaAluno
                  date={mentoria.proximoEncontro}
                  mentorName={mentoria.nomeMentor}
                  nomeMentoria={mentoria.nome}
                  key={index}
                  id={mentoria.id}
                />
              ))
            : data?.map((mentoria, index) => (
                <CardMentoriaMentor
                  date={mentoria.proximoEncontro}
                  mentorName={mentoria.nomeMentor}
                  nomeMentoria={mentoria.nome}
                  key={index}
                  aluno={mentoria.nomeMentorado}
                  id={mentoria.id}
                />
              ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
