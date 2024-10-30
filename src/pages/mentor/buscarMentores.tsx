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
  Link,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useQuery } from "react-query";
import { MenuUsuario } from "../../components/menu";
import myTheme from "../../mytheme";
import { UseMentor, filtroType } from "../../utils/useMentor";
import { useState } from "react";

export function BuscarMentores() {
  const [filtro, setFiltro] = useState<filtroType>();
  const { getMentores } = UseMentor();

  const inicialValues = {
    nomeMentor: "",
    areaMentor: ""
  }

  function limpaFiltro(resetForm: () => void) {
    setFiltro({})
    resetForm();
  }

  function filtrar({ areaMentor, nomeMentor }: filtroType) {
    setFiltro({
      areaMentor,
      nomeMentor
    })
  }

  const { data } = useQuery({
    queryKey: ["mentores", filtro],
    queryFn: async () => getMentores(filtro),
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
        <Box w={"full"} bg={myTheme.colors.azul_claro} h={"2px"}>‎</Box>

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
              <Formik initialValues={inicialValues} onSubmit={filtrar}>
                {({ handleSubmit, handleChange, values, resetForm  }) => (
                  <Flex alignItems={'center'}>
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
                        value={values.nomeMentor}
                        onChange={(value) => {
                          handleChange("nomeMentor")(value);
                        }}
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
                        value={values.areaMentor}
                        onChange={(value) => {
                          handleChange("areaMentor")(value);
                        }}
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
                      onClick={() => handleSubmit()}
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
                    {filtro?.areaMentor || filtro?.nomeMentor ?
                      <Link onClick={() => limpaFiltro(resetForm)}>
                        <Text mt={'8px'} ml={'20px'}>Limpar</Text>
                      </Link>
                      : null}
                  </Flex>
                )}
              </Formik>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Box mx="0" mt="20px" p="10px">
          <Flex
            wrap="wrap"
            flexGrow={"initial"}
            gap={'50px'}
          >
            {data && data.length > 0 ?
              data?.map((mentor, index) => (
                <MentorCard
                  key={index}
                  mentorName={mentor?.nome}
                  mentorImage={mentor?.fotos}
                  areas={mentor?.areas}
                  id={mentor?._id}
                />
              ))
              : <Text ml={'1%'} fontSize={'lg'} fontWeight={'bold'}>Nenhum mentor encotrado</Text>
            }
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
