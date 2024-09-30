import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { MenuUsuario } from "../../components/menu";
import { PainelUsuarios } from "../../components/painelUsuarios";
import myTheme from "../../mytheme";

export function GerenciamentoUsuarios() {
  const mentores = [
    {
      nome: "Henrique tardivo",
      email: "henriqueTardivo@gmail.com",
      status: "ativo",
    },
    {
      nome: "Renan Rocha",
      email: "renanRocha@gmail.com",
      status: "ativo",
    },
    {
      nome: "Ana Paula Brencic",
      email: "anaBrencic@gmail.com",
      status: "Inativo",
    },
  ];
  const alunos = [
    {
      nome: "Guilherme Men Linhares Nairne",
      email: "guilhermeNairne@gmail.com",
      status: "Inativo",
    },
    {
      nome: "Lucas Seije Tokuda",
      email: "lucasTokuda@gmail.com",
      status: "Ativo",
    },
    {
      nome: "Karine Lima Corsini",
      email: "karineCorsini@gmail.com",
      status: "Ativo",
    },
  ];
  const novosCadastros = [
    {
      nome: "Pedro Mazzurana",
      email: "pedroMazzurana@gmail.com",
      tipo: "Mentor",
    },
    {
      nome: "Erich Mantai",
      email: "erichMantai@gmail.com",
      tipo: "Aluno",
    },
  ];

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <MenuUsuario />
      <Box w={"full"} h={"full"} p={"30px"}>
        <Flex
          w={"full"}
          h={"100%"}
          p={"30px"}
          borderWidth={"1px"}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          borderColor={myTheme.colors.cinza_hover}
          borderRadius={"10px"}
        >
          <Tabs>
            <TabList>
              <Tab>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Mentores
                </Text>
              </Tab>
              <Tab>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Alunos
                </Text>
              </Tab>
              <Tab>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Novos cadastros
                </Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PainelUsuarios listaUsuarios={mentores} />
              </TabPanel>
              <TabPanel>
                <PainelUsuarios listaUsuarios={alunos} />
              </TabPanel>
              <TabPanel>
                <PainelUsuarios listaUsuarios={novosCadastros} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Flex>
  );
}
