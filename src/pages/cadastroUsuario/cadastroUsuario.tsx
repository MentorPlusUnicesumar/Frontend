import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { AbaAluno } from "./abaAluno";
import { AbaMentor } from "./abaMentor";

export function CadastroUsuario() {
  const inicialValues = {
    email: "",
    senha: "",
  };

  async function handleLogin() {}

  return (
    <Flex w={"full"} h={"full"} flexDir={"row"}>
      <Formik initialValues={inicialValues} onSubmit={handleLogin}>
        {({ handleSubmit, handleChange, values }) => (
          <Flex px={"30px"} w={"65%"} h={"100%"} flexDir={"column"}>
            <Text
              mt={"30px"}
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"#05234E"}
            >
              Quero ser:
            </Text>
            <Tabs mt={"10px"}>
              <TabList>
                <Tab>Aluno</Tab>
                <Tab>Mentor</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <AbaAluno />
                </TabPanel>
                <TabPanel>
                  <AbaMentor />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}
