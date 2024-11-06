import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { Button, Icon } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { formatDateBR } from "../../comons/formatDate";
import { MenuUsuario } from "../../components/menu";
import myTheme from "../../mytheme";
import { UseMentorias } from "../../utils/useMentorias";
import { ModalAgendarAula } from "./modalAgendarAula";

export function TelaMentoria() {
  const { getMentoriaById} = UseMentorias()
  const { id } = useParams();
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const { data } = useQuery({
    queryKey: ["mentoriById", openModalEdit],
    queryFn: async () => getMentoriaById(id!)
  });  

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <MenuUsuario />

      <ModalAgendarAula id={id} OpenModalEdit={openModalEdit} SetOpenModalEdit={setOpenModalEdit} />

      <Flex w={"full"} h={"full"} flexDir={"column"} p={"30px"}>
        <Flex
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          borderWidth={"1px"}
          borderColor={myTheme.colors.cinza_200}
          borderRadius={"10px"}
          w={"full"}
          h={"230px"}
          p={"20px"}
          flexDir={"column"}
        >
          <Text
            fontSize={"3xl"}
            fontWeight={"bold"}
            color={myTheme.colors.azul}
          >
            {data?.nome}
          </Text>
          <Flex flexDir={"column"} mt={"20px"} gap={3}>
            <Box display={"flex"} flexDir={"row"} gap={1}>
              <Text fontSize={"md"} fontWeight={"bold"}>
                Mentor:
              </Text>
              <Text fontSize={"md"}>{data?.idMentor.nome}</Text>
            </Box>

            <Box display={"flex"} flexDir={"row"} gap={1}>
              <Text fontSize={"md"} fontWeight={"bold"}>
                Mentorias realizadas:
              </Text>
              <Text fontSize={"md"}>{`${data?.reuniao.length}/${data?.qtdtotal}`}</Text>
            </Box>

            <HStack display={'flex'} justifyContent={'space-between'}>
              <Box display={"flex"} flexDir={"row"} gap={1}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Próximo encontro:
                </Text>
                <Text fontSize={"md"}>{data?.proximoEncontro ? formatDateBR(data?.proximoEncontro) : "Não definido"}</Text>
              </Box>
              <Button
                ml={"10px"}
                h={"35px"}
                w={"170px"}
                borderRadius={"10px"}
                onClick={() => setOpenModalEdit(true)}
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
                  Agendar encontro
                </Text>
              </Button>
            </HStack>

          </Flex>
        </Flex>

        <Flex flexDir={"column"} p={"10px"}>
          <Text
            mt={"30px"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={myTheme.colors.azul}
          >
            Arquivos
          </Text>
          <Text>Nenhum arquivo adicionado</Text>

          <Text
            fontSize={"2xl"}
            mt={'30px'}
            fontWeight={"bold"}
            color={myTheme.colors.azul}
          >
            Aulas
          </Text>

          <Tabs variant="enclosed" colorScheme="blue" w={"full"}>
            <TabList>
              {data?.reuniao.map((reu) => (
                <Tab mt="10px">{formatDateBR(String(reu.diaReuniao), true)}</Tab>
              ))}
            </TabList>

            <TabPanels>
              {data?.reuniao.map((reu) => (
                <TabPanel>
                  <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Text
                      mt={"10px"}
                      color={myTheme.colors.azul}
                      fontSize={"md"}
                      fontWeight={"bold"}
                    >
                      Resumo da aula
                    </Text>
                    <Icon mr={'20px'} mt={"10px"} w={5} h={5} as={BsFillPencilFill}/>
                  </Box>

                  <Text>
                    {reu.resumo}
                  </Text>

                  <Text
                    mt={"15px"}
                    color={myTheme.colors.azul}
                    fontSize={"md"}
                    fontWeight={"bold"}
                  >
                    Comentário
                  </Text>
                  <Text>
                    {reu.feedback}
                  </Text>

                  <Text
                    mt={"15px"}
                    color={myTheme.colors.azul}
                    fontSize={"md"}
                    fontWeight={"bold"}
                  >
                    Materiais
                  </Text>
                  <Text>Nenhum material adicionado</Text>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Flex>
  );
}
