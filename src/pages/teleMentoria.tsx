import { Box, Flex, Text } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, Tabs, TabPanels } from "@chakra-ui/tabs";
import { MenuUsuario } from "../components/Menu";
import myTheme from "../mytheme";

export function TelaMentoria() {
  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
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
            Nome da mentoria
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
              <Text fontSize={"md"}>5/12</Text>
            </Box>

            <Box display={"flex"} flexDir={"row"} gap={1}>
              <Text fontSize={"md"} fontWeight={"bold"}>
                Próximo encontro:
              </Text>
              <Text fontSize={"md"}>11/09/2024</Text>
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

          <Text
            mt={"50px"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={myTheme.colors.azul}
          >
            Aulas
          </Text>
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
