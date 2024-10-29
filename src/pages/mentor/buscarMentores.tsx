import { MentorCard } from "../../components/card-mentor";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { MenuUsuario } from "../../components/menu";
import myTheme from "../../mytheme";
import { UseMentor } from "../../utils/useMentor";

export function BuscarMentores() {
  const { getMentores } = UseMentor();

  const { data } = useQuery({
    queryKey: ["mentores"],
    queryFn: async () => getMentores(),
  });

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <MenuUsuario />

      <Text
        mt="30px"
        textAlign="center"
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={myTheme.colors.azul_claro}
      >
        Encontrar novos mentores
      </Text>

      <Flex px="50px" mt="30px" w={"full"} h={"full"} flexDir={"column"}>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul_claro}
        >
          Sugestões
        </Text>
        <Box w={"full"} bg={myTheme.colors.azul_claro} h={"2px"} />

        <Accordion defaultIndex={[1]} allowMultiple>
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                w={"10px"}
                sx={{ borderBottom: "none" }}
                _hover={{ bg: "none" }}
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color={myTheme.colors.azul_claro}
                >
                  Filtrar
                </Box>
                <AccordionIcon color={myTheme.colors.azul_claro} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex>
                <Box
                  w={"400px"}
                  mt={"10px"}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <Input
                    ml={"10px"}
                    w={"200px"}
                    h={"35px"}
                    borderWidth={"2px"}
                    borderColor={"#ECECEC"}
                    borderRadius={"10px"}
                    placeholder={"Nome do Profissional"}
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                    bg={"white"}
                    sx={{
                      "::placeholder": {
                        fontSize: "12px",
                        color: "#B0B0B0",
                      },
                    }}
                  />
                  <Input
                    ml={"10px"}
                    w={"200px"}
                    h={"35px"}
                    borderWidth={"2px"}
                    borderColor={"#ECECEC"}
                    borderRadius={"10px"}
                    placeholder={"Área de interesse"}
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

                <Button
                  ml={"10px"}
                  mt={"10px"}
                  h={"35px"}
                  w={"100px"}
                  borderRadius={"50px"}
                  boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  bg={myTheme.colors.azul_claro}
                >
                  <Text
                    color={"white"}
                    fontSize={"sm"}
                    fontWeight={"semi-bold"}
                  >
                    Buscar
                  </Text>
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Box mx="0" mt="20px" p="10px">
          <Flex
            wrap="wrap"
            flexGrow={"initial"}
            gap={'50px'}
          >
            {data?.map((mentor, index) => (
              <MentorCard
                key={index}
                mentorName={mentor?.nome}
                mentorImage={mentor?.fotos}
                areas={mentor?.areas}
                id={mentor?._id}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
