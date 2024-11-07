import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CardTrab } from "../../components/card-trab-mentor";
import { MenuUsuario } from "../../components/menu";
import myTheme from "../../mytheme";
import trabalho1 from "../../imgs/trabalho1.png";
import trabalho2 from "../../imgs/trabalho2.png";
import trabalho3 from "../../imgs/trabalho3.jpg";
import { AuthContext } from "../../context/authContext";
import { PainelDadosCadastro } from "./painelDadosCadastro";

const initialValues = {
  nome: "Renan",
  sobrenome: "Rocha",
  endereco: "Av. Prudente de Morais",
  cidade: "Maringá",
  estado: "Paraná",
  competencia:
    "Engenharia de software - Unicesumar, Mestrado em análise de dados - UEL",
  experiencia:
    "Estágio de programação - Romagnole, Desenvolvedor full stack - Spotify",
  sobre:
    "Programador full stack especializado em JavaScript, com uma paixão por transformar ideias em soluções digitais inovadoras.",
  dispInd: "Disponível",
  linkedin: "www.linkedin.com/RenanRocha",
  instagram: "www.instagram.com/RenanRocha",
  email: "renanRocha@gmail.com",
};

// Trabalhos de Destaque
const initialWorks = [
  {
    id: 1,
    title: "Contribuição no desenvolvimento do frontend do aplicativo Aiqfome",
    image: trabalho1,
  },
  {
    id: 2,
    title: "Palestra sobre como gerenciar e organizar grandes projetos",
    image: trabalho2,
  },
  {
    id: 3,
    title: "trabias sobre Inteligência Artificial e suas aplicações",
    image: trabalho3,
  },
];
//Areas de ensino
const predefinedAreas = [
  "Administração",
  "Engenharia de Software",
  "Análise de dados",
  "Marketing",
  "Finanças",
  "Ciência de Dados",
];

//Trabalhos em destaque
const trabs = [
  {
    trabName:
      "Contribuição no desenvolvimento do frontend do aplicativo Aiqfome",
    trabImage: trabalho1,
  },
  {
    trabName: "Palestra sobre como gerenciar e organizar grandes projetos",
    trabImage: trabalho2,
  },
  {
    trabName: "Mentorias sobre Inteligência Artifical e suas aplicações",
    trabImage: trabalho3,
  },
];

export function PerfilUsuario() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [newArea, setNewArea] = useState("");
  const { user } = useContext(AuthContext);

  const handleAddArea = () => {
    if (newArea && !selectedAreas.includes(newArea)) {
      setSelectedAreas([...selectedAreas, newArea]);
      setNewArea("");
    }
  };

  const handleRemoveArea = (area: string) => {
    setSelectedAreas(selectedAreas.filter((a) => a !== area));
  };

  function handleSave(values: any) {
  }

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"} alignItems={"center"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo trabalho de destaque</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea placeholder="Escreva o título do seu trabalho" />
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Adicionar imagem
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button bg={myTheme.colors.azul} mr={3}>
              Adicionar
            </Button>
            <Button onClick={onClose} variant="ghost">
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <MenuUsuario />
      {/* Cabeçalho */}

      <Text
        mt="30px"
        textAlign="center"
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={myTheme.colors.azul}
      >
        Perfil
      </Text>

      <Flex
        mt="30px"
        flexDir={"column"}
        w={"full"}
        maxW={"800px"}
        p={"20px"}
        bg={"#f7f7f7"}
        mb={"50px"}
        borderRadius={"10px"}
        boxShadow={"0px 4px 8px rgba(0, 0, 0, 0.1)"}
      >
        <Formik initialValues={initialValues} onSubmit={handleSave}>
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <Flex flexDir={"column"} alignItems={"center"} mb={"20px"}>
                <Avatar size={"xl"} src={user?.fotos} />
                <a
                  href="#"
                  style={{
                    color: myTheme.colors.azul,
                    fontWeight: "bold",
                    textDecoration: "underline",
                    marginTop: "10px",
                  }}
                >
                  Alterar foto
                </a>
              </Flex>

              <Tabs variant="enclosed" colorScheme="blue" w={"full"}>
                <TabList>
                  <Tab
                    mt="10px"
                    color={myTheme.colors.azul}
                    fontWeight={"bold"}
                  >
                    Dados de Cadastro
                  </Tab>
                  <Tab
                    mt="10px"
                    color={myTheme.colors.azul}
                    fontWeight={"bold"}
                  >
                    Informações profissionais
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* Aba de Dados de Cadastro */}
                  <TabPanel>
                    <PainelDadosCadastro />
                  </TabPanel>

                  {/* Aba de Informações profissionais */}
                  <TabPanel>
                    <Box w={"100%"} mt={"10px"}>
                      <VStack spacing={"15px"} align="stretch">
                        {/* Áreas de Ensino */}
                        <Box w={"100%"}>
                          <Text
                            fontSize={"lg"}
                            fontWeight={"bold"}
                            color={"#05234E"}
                          >
                            Áreas de ensino
                          </Text>

                          {/* Áreas selecionadas */}
                          <VStack align="flex-start" mt="10px">
                            {selectedAreas.map((area) => (
                              <Tag
                                key={area}
                                size="lg"
                                colorScheme="blue"
                                borderRadius="full"
                                py={2}
                                px={4}
                              >
                                <TagLabel>{area}</TagLabel>
                                <TagCloseButton
                                  onClick={() => handleRemoveArea(area)}
                                />
                              </Tag>
                            ))}
                          </VStack>

                          {/* Select para escolher novas áreas */}
                          <HStack mt="10px" spacing={3}>
                            <Select
                              placeholder="Selecione uma área de ensino"
                              value={newArea}
                              onChange={(e) => setNewArea(e.target.value)}
                              w={"70%"}
                              bg={"white"}
                            >
                              {predefinedAreas
                                .filter((area) => !selectedAreas.includes(area))
                                .map((area) => (
                                  <option key={area} value={area}>
                                    {area}
                                  </option>
                                ))}
                            </Select>

                            <Button
                              onClick={handleAddArea}
                              leftIcon={<AddIcon />}
                              colorScheme="blue"
                              variant="solid"
                              w={"30%"}
                            >
                              Adicionar
                            </Button>
                          </HStack>
                          {/* Redes Sociais */}
                          <Box w={"100%"} mt={"20px"}>
                            <Text
                              fontSize={"lg"}
                              fontWeight={"bold"}
                              color={"#05234E"}
                            >
                              Redes Sociais
                            </Text>

                            {/* LinkedIn */}
                            <HStack mt="10px">
                              <IconButton
                                icon={<FaLinkedin />}
                                aria-label="LinkedIn"
                                colorScheme="linkedin"
                                size="lg"
                              />
                              {/* <Teste
                                name="linkedIn"
                                value={values.linkedin}
                                onChange={handleChange}
                              /> */}
                            </HStack>

                            {/* Instagram */}
                            <HStack mt="10px">
                              <IconButton
                                icon={<FaInstagram />}
                                aria-label="Instagram"
                                colorScheme="pink"
                                size="lg"
                              />
                              {/* <Teste
                                name="instagram"
                                value={values.instagram}
                                onChange={handleChange}
                              /> */}
                            </HStack>

                            {/* Email */}
                            <HStack mt="10px">
                              <IconButton
                                icon={<FaEnvelope />}
                                aria-label="Email"
                                colorScheme="red"
                                size="lg"
                              />
                              {/* <Teste
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                              /> */}
                            </HStack>
                          </Box>

                          {/* Trabalhos em destaque */}

                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>
                                Novo trabalho de destaque
                              </ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Textarea placeholder="Escreva o título do seu trabalho" />
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={onClose}
                                >
                                  Adicionar imagem
                                </Button>
                              </ModalBody>
                              <ModalFooter>
                                <Button colorScheme="blue" mr={3}>
                                  Adicionar
                                </Button>
                                <Button onClick={onClose} variant="ghost">
                                  Fechar
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Box w={"100%"} mt={"20px"}>
                            <Text
                              fontSize={"lg"}
                              fontWeight={"bold"}
                              color={"#05234E"}
                            >
                              Trabalhos em destaque
                            </Text>
                            <Box
                              maxW="1100px"
                              mx="0"
                              mt="20px"
                              overflow="hidden"
                              p="10px"
                            >
                              <Flex
                                wrap="wrap"
                                justifyContent="center"
                                alignItems="center"
                                gap="20px"
                              >
                                {trabs.map((trab, index) => (
                                  <CardTrab
                                    key={index}
                                    trabName={trab.trabName}
                                    trabImage={trab.trabImage}
                                  />
                                ))}
                                <PlusSquareIcon
                                  boxSize={6}
                                  color={"#05234E"}
                                  onClick={onOpen}
                                />
                              </Flex>
                            </Box>
                          </Box>
                        </Box>
                      </VStack>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Flex mt="30px" justifyContent="space-between">
                <Button
                  h={"40px"}
                  w={"120px"}
                  borderRadius={"50px"}
                  bg={"#ECECEC"}
                  _hover={{ bg: "#DADADA" }}
                  boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                >
                  Cancelar
                </Button>
                <Button
                  h={"40px"}
                  w={"120px"}
                  borderRadius={"50px"}
                  bg={myTheme.colors.azul}
                  color={"white"}
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  type="submit"
                >
                  Atualizar
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
}
