import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Formik } from "formik";
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { MenuUsuario } from "../../components/menu";
import myTheme from "../../mytheme";
import { CreateReuniao, UseMentorias } from "../../utils/useMentorias";
import { format } from 'date-fns';

export function TelaMentoria() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getMentoriaById, agendarEncontro } = UseMentorias()
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["mentoriById", id],
    queryFn: async () => getMentoriaById(id!)
  });

  async function agendarReuniao(reuniao: CreateReuniao) {
    const formattedDate = format(reuniao.diaReuniao, 'yyyy-MM-yyyy HH:mm');
    
    const body: CreateReuniao = {
      diaReuniao: formattedDate,
      idMentoria: reuniao.idMentoria,
      resumo: reuniao.resumo,
      materialAnexado: ['a']
    }
    await agendarEncontro(body)
  }

  const inicialValues = {
    idMentoria: id!,
    diaReuniao: "",
    resumo: "",
    materialAnexado: []
  }


  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Agendar encontro
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems={'center'} my={'20px'} flexDir={'column'} w={'full'} h={'full'}>
              <Formik initialValues={inicialValues} onSubmit={agendarReuniao}>
                {({ handleSubmit, handleChange, values, setFieldValue }) => (
                  <>
                    <Box w="full">
                      <Text fontSize="lg" fontWeight="bold" color="#05234E">
                        Resumo da aula
                      </Text>
                      <Textarea
                        mt="5px"
                        w={'full'}
                        h="120px"
                        value={values.resumo}
                        borderColor="#ECECEC"
                        borderRadius="5px"
                        onChange={(value) => {
                          handleChange("resumo")(value);
                        }}
                        placeholder={'Tema da próxima aula'}
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                        bg="white"
                        sx={{
                          "::placeholder": {
                            fontSize: "12px",
                            color: "#B0B0B0",
                          },
                        }}
                      />
                    </Box>

                    <Box w={'full'} mt={'30px'}>
                      <Text fontSize="lg" fontWeight="bold" color="#05234E">
                        Arquivos
                      </Text>
                      <Input
                        mt="10px"
                        w={'full'}
                        h="35px"
                        borderColor="#ECECEC"
                        borderRadius="5px"
                        onChange={(value) => {
                          handleChange("materialAnexado")(value);
                        }}
                        value={values.materialAnexado}
                        placeholder={'Adicionar arquivos'}
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                        bg="white"
                        sx={{
                          "::placeholder": {
                            fontSize: "12px",
                            color: "#B0B0B0",
                          },
                        }}
                      />
                    </Box>

                    <Box w={'full'} mt={'30px'}>
                      <Text fontSize="lg" fontWeight="bold" color="#05234E">
                        Data
                      </Text>
                      <Input
                        mt="10px"
                        w={'full'}
                        h="35px"
                        borderColor="#ECECEC"
                        borderRadius="5px"
                        // value={values.diaReuniao}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          setFieldValue('diaReuniao', selectedDate);
                        }}
                        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                        bg="white"
                        sx={{
                          "::placeholder": {
                            fontSize: "12px",
                            color: "#B0B0B0",
                          },
                        }} type="datetime-local"
                      />
                    </Box>

                    <Button
                      mt={"50px"}
                      h={"35px"}
                      w={"120px"}
                      borderRadius={"10px"}
                      onClick={() => handleSubmit()}
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
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
                        Agendar
                      </Text>
                    </Button>
                  </>
                )}
              </Formik>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>


      <MenuUsuario />

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
              <Text fontSize={"md"}>Pedro Mazzurana</Text>
            </Box>

            <Box display={"flex"} flexDir={"row"} gap={1}>
              <Text fontSize={"md"} fontWeight={"bold"}>
                Mentorias realizadas:
              </Text>
              <Text fontSize={"md"}>{`${data?.reuniao.length}/${data?.qtdtotal}`}</Text>
            </Box>

            <Box display={"flex"} flexDir={"row"} gap={1}>
              <Text fontSize={"md"} fontWeight={"bold"}>
                Próximo encontro:
              </Text>
              <Text fontSize={"md"}>{data?.proximoEncontro ? data?.proximoEncontro : "Não definido"}</Text>
            </Box>
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

          <HStack mt={"50px"} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Text
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={myTheme.colors.azul}
            >
              Aulas
            </Text>

            <Button
              ml={"10px"}
              mt={"10px"}
              h={"35px"}
              w={"170px"}
              borderRadius={"10px"}
              onClick={(onOpen)}
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

          <Tabs variant="enclosed" colorScheme="blue" w={"full"}>
            <TabList>
              <Tab mt="10px">13/08</Tab>
              <Tab mt="10px">18/08</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text
                  mt={"10px"}
                  color={myTheme.colors.azul}
                  fontSize={"md"}
                  fontWeight={"bold"}
                >
                  Resumo da aula do dia 13/08
                </Text>
                <Text>
                  Na aula de mentoria sobre Business Intelligence (BI),
                  começamos com a definição do conceito: Business Intelligence
                  envolve a utilização de ferramentas e práticas para coletar,
                  analisar e apresentar dados de maneira a auxiliar as empresas
                  na tomada de decisões mais informadas. O objetivo principal do
                  BI é transformar dados brutos em informações úteis e insights
                  estratégicos que possam direcionar ações e estratégias de
                  negócios. Exploramos os principais componentes do BI,
                  começando pela coleta de dados, que abrange a reunião de
                  informações provenientes de diversas fontes, como bancos de
                  dados, planilhas e sistemas de ERP, além de fontes externas.
                  Após a coleta, os dados são armazenados em sistemas
                  especializados, como Data Warehouses e Data Lakes, que
                  permitem o gerenciamento e a consulta eficiente de grandes
                  volumes de informações.
                </Text>

                <Text
                  mt={"15px"}
                  color={myTheme.colors.azul}
                  fontSize={"md"}
                  fontWeight={"bold"}
                >
                  Comentários
                </Text>
                <Text>
                  Na aula de mentoria sobre Business Intelligence, o aluno
                  demonstrou um bom entendimento dos conceitos fundamentais
                  apresentados. Sua capacidade de compreender e explicar os
                  componentes principais do BI, como coleta e armazenamento de
                  dados, análise e visualização, foi notável. Ele participou
                  ativamente das discussões, fazendo perguntas pertinentes que
                  evidenciaram seu interesse e desejo de aprofundar o
                  conhecimento. O aluno mostrou um entendimento claro do
                  processo ETL e da importância do OLAP para análises
                  multidimensionais, o que é um indicativo de sua capacidade de
                  absorver e aplicar conceitos complexos. No entanto, seria
                  benéfico se ele pudesse explorar mais detalhadamente as
                  diferentes ferramentas de BI, como Power BI e Tableau, e como
                  essas ferramentas se comparam em termos de funcionalidades e
                  aplicabilidade em diferentes cenários de negócios.
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
              <TabPanel>
                <Text
                  mt={"10px"}
                  color={myTheme.colors.azul}
                  fontSize={"md"}
                  fontWeight={"bold"}
                >
                  Resumo da aula do dia 18/08
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Flex>
  );
}
