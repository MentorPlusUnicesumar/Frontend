import { Box, Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { MenuUsuario } from "../../components/menu";
import myTheme from "../../mytheme";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { FaMapPin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export function PerfilMentor() {
  const { user } = useContext(AuthContext);
  const competencias = [
    "Engenharia de software - Unicesumar",
    "Mestrado em análise de dados - UEL",
    "Mestrado em análise de dados - UEL",
  ];
  const experiencias = [
    "Estágio de programação - Romagnole",
    "Desenvolvedor full stack - Spotify",
  ];

  const trabalhos_destaque = [
    {
      img: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3FyPo1VTw_wBh4X9Ga8x6w.png",
      sobre:
        "Contribuição no desenvolvimento do frontend do aplicativo Aiqfome",
    },
    {
      img: "https://media.licdn.com/dms/image/v2/C4D12AQFcF3IvMWFyBA/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1576810318081?e=1732147200&v=beta&t=sFBEg_KSnHt6g6T5_DP798NNhYuqOxzT8uFZM5U0xfY",
      sobre: "Palestra sobre como gerenciar e organizar grandes projetos",
    },
    {
      img: "https://www.varginhaonline.com.br/noticias/fotos/206045/18122023_palestra.jpg",
      sobre: "Mentorias sobre Inteligência Artifical e suas aplicações",
    },
  ];

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
              // src={user?.fotos}
              src={'https://avatars.githubusercontent.com/u/77353839?v=4'}
            />

            <Box ml={"20px"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {user?.name}
              </Text>

              <Text>
                Engenheiro de Software | Mentor de empresas | Empreendedor
              </Text>

              <Box
                mt={"10px"}
                display={"flex"}
                flexDir={"row"}
                alignItems={"center"}
                gap={2}
              >
                <Icon as={FaMapPin} />
                <Text>Mandaguari - PR</Text>
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
              <Box w={"10px"} h={"10px"} borderRadius={"full"} bg={"#04C800"} />
              <Text color={"#04C800"} fontWeight={"bold"}>
                Disponível para mentorias
              </Text>
            </Flex>

            <Button
              w={"200px"}
              h={"40px"}
              borderRadius={"10px"}
              _hover={{ bg: "#05234E" }}
              bg={myTheme.colors.azul}
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
          Programador full stack especializado em JavaScript, com uma paixão por
          transformar ideias em soluções digitais inovadoras. Com uma vasta
          experiência em desenvolvimento front-end e back-end, tenho trabalhado
          com tecnologias como React, Node.js e Express.
        </Text>
        <Text>
          Se você está buscando orientação técnica ou estratégica no mundo do
          desenvolvimento JavaScript, vamos conversar!
        </Text>
        <Text>Vamos juntos explorar novas oportunidades e soluções? 🚀</Text>

        <Box display={"flex"} gap={3} mt={"10px"}>
          <Icon boxSize={"5"} as={FaInstagram} />
          <Icon boxSize={"5"} as={FaLinkedin} />
          <Icon boxSize={"5"} as={FaEnvelope} />
        </Box>

        <Text
          mt={"30px"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul}
        >
          Competências
        </Text>
        {competencias.map((competencia) => (
          <Flex flexDir={"row"} alignItems={"center"} gap={2}>
            <Box w={"8px"} h={"8px"} bg={"black"} borderRadius={"full"} />
            <Text> {competencia} </Text>
          </Flex>
        ))}

        <Text
          mt={"30px"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul}
        >
          Experiências
        </Text>
        {experiencias.map((experiencia) => (
          <Flex flexDir={"row"} alignItems={"center"} gap={2}>
            <Box w={"8px"} h={"8px"} bg={"black"} borderRadius={"full"} />
            <Text> {experiencia} </Text>
          </Flex>
        ))}

        <Text
          mt={"30px"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul}
        >
          Trabalhos de destaque
        </Text>

        <Flex flexDir={"row"} gap={7} mt={"10px"} mb={"50px"}>
          {trabalhos_destaque.map((trabalho) => (
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
                src={trabalho.img}
                w={"full"}
                h={"120px"}
              />
              <Text m={"10px"}>{trabalho.sobre} </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
