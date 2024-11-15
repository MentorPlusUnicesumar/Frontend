import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Img,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillPhone,
  AiFillYoutube,
} from "react-icons/ai";
import { FaEnvelope, FaMapPin } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MenuAdmin } from "../../components/menuAdmin";
import myTheme from "../../mytheme";
import { UseAdmin } from "../../utils/useAdmin";

export function NovoUsuario() {
  const { getUsuariosById, statusUsuaruio } = UseAdmin();
  const { id } = useParams();
  const toast = useToast();
  const nav = useNavigate();

  const { data } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => getUsuariosById(id!),
  });

  async function aprovaUsuario(acao: "Aprovado" | "Recusado") {
    try {
      await statusUsuaruio(id!, acao);

      nav("/gerenciamento-usuarios");

      return toast({
        title: acao === "Aprovado" ? "Usuário aprovado" : "Usuário Recusado",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    } catch (error) {
      return toast({
        title:
          acao === "Aprovado"
            ? "Erro ao aprovar usuário"
            : "Erro ao reprovar usuário",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <MenuAdmin />

      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={4}
        py={"30px"}
      >
        <Img w={"170px"} h={"170px"} borderRadius={"full"} src={data?.fotos} />
        <Box>
          <Text
            fontWeight={"bold"}
            fontSize={"2xl"}
            color={myTheme.colors.azul}
          >
            {data?.nome}
          </Text>
          <Box display={"flex"} flexDir={"row"} alignItems={"center"} gap={2}>
            <Icon as={FaMapPin} />
            <Text>
              {data?.cidade} - {data?.uf}
            </Text>
          </Box>
          {data?.typeUser === "Mentor" ? null : (
            <>
              <Box
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                gap={2}
              >
                <Icon as={AiFillPhone} />
                <Text>{data?.telefone}</Text>
              </Box>
              <Box
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                gap={2}
              >
                <Icon as={FaEnvelope} />
                <Text>{data?.email}</Text>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {data?.typeUser === "Mentor" ? (
        <Flex justifyContent={"space-between"} my={"30px"} px={"150px"}>
          <Box>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={myTheme.colors.azul}
            >
              Contatos:
            </Text>
            <Box display={"flex"} flexDir={"row"} alignItems={"center"} gap={2}>
              <Icon as={AiFillPhone} />
              <Text>{data?.telefone}</Text>
            </Box>
            <Box display={"flex"} flexDir={"row"} alignItems={"center"} gap={2}>
              <Icon as={FaEnvelope} />
              <Text>{data?.email}</Text>
            </Box>
          </Box>
          <Box>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={myTheme.colors.azul}
            >
              Formações:
            </Text>
            {data?.experiencias.map((exp) => (
              <Text fontSize={"md"}>{exp}</Text>
            ))}
          </Box>
          <Box>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              color={myTheme.colors.azul}
            >
              Redes Sociais:
            </Text>

            <HStack>
              {data?.instagram ? (
                <Link href={data?.instagram} target="_blank">
                  <Icon as={AiFillInstagram} boxSize={"30px"} />
                </Link>
              ) : undefined}
              {data?.linkedin ? (
                <Link href={data?.linkedin} target="_blank">
                  <Icon as={AiFillLinkedin} boxSize={"30px"} />
                </Link>
              ) : undefined}
              {data?.youtube ? (
                <Link href={data?.youtube} target="_blank">
                  <Icon as={AiFillYoutube} boxSize={"30px"} />
                </Link>
              ) : undefined}
            </HStack>
          </Box>
        </Flex>
      ) : null}

      {data?.typeUser === "Mentor" ? (
        <Box px={"150px"}>
          <Text fontSize={"lg"} fontWeight={"bold"} color={myTheme.colors.azul}>
            Sobre mim:
          </Text>
          <Text>{data?.sobre}</Text>
        </Box>
      ) : null}

      <Box px={"150px"} mt={"30px"}>
        <Text fontSize={"lg"} fontWeight={"bold"} color={myTheme.colors.azul}>
          Por quê desejo me cadastrar na plataforma?
        </Text>
        <Text>{data?.motivoCadastro}</Text>

        <Flex
          gap={5}
          my={"70px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            bg={"#860000"}
            w={"150px"}
            h={"35px"}
            onClick={() => aprovaUsuario("Recusado")}
            borderRadius={"7px"}
            _hover={{ bg: "#860000" }}
          >
            <Text color={"white"} fontWeight={"bold"}>
              Recusar
            </Text>
          </Button>
          <Button
            bg={"#005C19"}
            w={"150px"}
            h={"35px"}
            onClick={() => aprovaUsuario("Aprovado")}
            borderRadius={"7px"}
            _hover={{ bg: "#005C19" }}
          >
            <Text color={"white"} fontWeight={"bold"}>
              Aprovar
            </Text>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
