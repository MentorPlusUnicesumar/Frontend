import { Box, Button, Flex, Icon, Img, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaMapPin, FaYoutube } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { MenuUsuario } from "../../components/menu";
import { AuthContext } from "../../context/authContext";
import myTheme from "../../mytheme";
import { useChat } from "../../utils/useChat";
import { UseMentor } from "../../utils/useMentor";

type ChatSelecionado = {
  id: string;
  nome: string;
};

export function PerfilMentor() {
  const { user } = useContext(AuthContext);
  const { createChat } = useChat();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getMentorById } = UseMentor();

  async function criarChat() {
    const chat  = await createChat(user!._id, data!._id)

    // const chatSelecionado = {
    //   id: chat.id,
    //   nome: chat.
    // }
    navigate('/chat/', { state: { chat } })
  }

  const { data } = useQuery({
    queryKey: ["mentores", id],
    queryFn: async () => getMentorById(id!),
  });

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <MenuUsuario />
      <Flex w={"full"} flexDir={"column"} p={"30px"}>
        <Flex
          justifyContent={"center"}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          borderWidth={"1px"}
          borderColor={myTheme.colors.cinza_200}
          borderRadius={"10px"}
          w={"full"}
          p={"20px"}
          flexDir={"column"}
          gap={3}
        >
          <Flex flexDir={"row"} alignItems={"center"}>
            <Img
              w={"150px"}
              h={"150px"}
              borderRadius={"full"}
              src={data?.fotos}
            />

            <Box ml={"20px"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {data?.nome}
              </Text>

              <Text>{data?.areas.map(area => (area.nome)).join(' | ')}</Text>

              <Box
                mt={"10px"}
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                gap={2}
              >
                <Icon as={FaMapPin} />
                <Text>{data?.cidade + '-' + data?.uf}</Text>
              </Box>
            </Box>
          </Flex>

          <Flex
            flexDir={"row"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Flex gap={2} alignItems={"center"} mt={"20px"}>
              <Box w={"10px"} h={"10px"} borderRadius={"full"} bg={data?.disponivel ? "#04C800" : '#b81414'} />
              <Text color={data?.disponivel ? "#04C800" : '#b81414'} fontWeight={"bold"}>
                {data?.disponivel ? "Disponível para mentorias" : "Indisponível para mentorias"}
              </Text>
            </Flex>

            <Button
              w={"200px"}
              h={"40px"}
              borderRadius={"10px"}
              _hover={{ bg: "#05234E" }}
              bg={myTheme.colors.azul}
              onClick={criarChat}
              isDisabled={data?.disponivel ? false : true}
            >
              <Text fontWeight={"bold"} color={"white"}>
                Entrar em contato
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex px={"30px"} flexDir={"column"}>
        <Text fontSize={"2xl"} fontWeight={"bold"} color={myTheme.colors.azul}>
          Sobre
        </Text>
        <Text>
          {data?.sobre}
        </Text>


        <Box display={"flex"} gap={3} mt={"10px"}>

          {data?.instagram ?
            <Link href={data.instagram} isExternal>
              <Icon boxSize={"5"} as={FaInstagram} />
            </Link>
            : null
          }
          {data?.linkedin ?
            <Link href={data.linkedin} isExternal>
              <Icon boxSize={"5"} as={FaLinkedin} />
            </Link>
            : null
          }
          {data?.email ?
            <Link href={`mailto:${data.email}`} isExternal>
              <Icon boxSize={"5"} as={FaEnvelope} />
            </Link>
            : null
          }
          {data?.youtube ?
            <Link href={data.youtube} isExternal>
              <Icon boxSize={"5"} as={FaYoutube} />
            </Link>
            : null
          }


        </Box>

        <Text
          mt={"30px"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul}
        >
          Competências
        </Text>

        {data?.competencias.map((comp) => (
          <Text>• {comp}</Text>
        ))}
        <Text
          mt={"30px"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul}
        >
          Experiências
        </Text>
        {data?.experiencias.map((exp) => (
          <Text>• {exp}</Text>
        ))}

        <Text
          mt={"30px"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul}
        >
          Trabalhos de destaque
        </Text>

        <Box mx="0" mt="20px" p="10px">
          <Flex
            wrap="wrap"
            flexGrow={"initial"}
            gap={'30px'}
          >
            {data?.trabDestaque.map((trabalho) => (
              <Box
                boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                w={"200px"}
                h={"240px"}
                borderRadius={"10px"}
              >
                <Img
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                  src={trabalho.foto}
                  w={"full"}
                  h={"120px"}
                />
                <Text m={"10px"}>{trabalho.descricao} </Text>
              </Box>
            ))}
          </Flex>
        </Box>


      </Flex>
    </Flex>
  );
}
