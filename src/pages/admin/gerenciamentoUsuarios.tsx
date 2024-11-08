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
import { useQuery } from "react-query";
import { useState } from "react";
import { MenuUsuario } from "../../components/menu";
import { PainelUsuarios } from "../../components/painelUsuarios";
import myTheme from "../../mytheme";
import { UseAdmin, filter } from "../../utils/useAdmin";

export function GerenciamentoUsuarios() {
  const { getUsuarios } = UseAdmin()
  const [filter, setFilter] = useState<filter>()
  const [tab, setTab] = useState<boolean>()

  const { data, isLoading } = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => getUsuarios(filter),
  })

  function handleFilter(filter: filter) {
    setFilter(filter)
  }

  const mentores = data?.filter((user) => user.typeUser === 'Mentor' && user.status !== 'Analisando')
  const alunos = data?.filter((user) => user.typeUser === 'Aluno' && user.status !== 'Analisando')
  const novosCadastros = data?.filter((user) => user.status === 'Analisando')

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"} overflow={'hidden'}>
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
          <Tabs w={'full'}>
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

            {isLoading ? <Text>Buscando usuários</Text> :
              <TabPanels>
                <TabPanel onChange={() => setFilter({})}>
                  <PainelUsuarios listaUsuarios={mentores || []} filterFunction={(filter) => handleFilter(filter)}/>
                </TabPanel>
                <TabPanel>
                  <PainelUsuarios listaUsuarios={alunos || []} filterFunction={(filter) => handleFilter(filter)}/>
                </TabPanel>
                <TabPanel onDrag={() => setFilter({})}>
                  <PainelUsuarios listaUsuarios={novosCadastros || []} filterFunction={(filter) => handleFilter(filter)}/>
                </TabPanel>
              </TabPanels>
            }

          </Tabs>
        </Flex>
      </Box>
    </Flex>
  );
}
