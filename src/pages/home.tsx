import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useContext } from "react";
import { useQuery } from "react-query";
import { formatDateBR } from "../commons/formatDate";
import { CardMentoriaAluno } from "../components/cardMentoriaAluno";
import { CardMentoriaMentor } from "../components/cardMentoriaMentor";
import { MenuUsuario } from "../components/menu";
import { AuthContext } from "../context/authContext";
import myTheme from "../mytheme";
import { UseMentorias, createMentoriaType } from "../utils/useMentorias";

export function Home() {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getMentoriasCards, getAlunos, createMentoria } = UseMentorias();
  const toast = useToast();

  const { data: Alunos } = useQuery({
    queryKey: ["alunos"],
    queryFn: async () => getAlunos(),
  });

  const { data: mentorias } = useQuery({
    queryKey: ["mentoriasCards"],
    queryFn: async () => getMentoriasCards(),
  });

  async function handleCreate(mentoria: createMentoriaType) {
    try {
      await createMentoria(mentoria);

      onClose();

      return toast({
        title: "Convite de mentoria enviada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    } catch (error) {
      return toast({
        title: "Erro ao enviar convite de mentoria!",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  const inicialValues = {
    nome: "",
    descricao: "",
    idAluno: "",
    qtdtotal: 0,
    idMentor: user?._id,
  };

  return (
    <Flex w={"full"} h={"full"} flexDir={"column"}>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Criar mentoria
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={inicialValues} onSubmit={handleCreate}>
              {({ handleSubmit, handleChange, values }) => (
                <Flex
                  w={"full"}
                  h={"full"}
                  px={"30px"}
                  flexDir={"column"}
                  alignItems={"center"}
                >
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="#05234E">
                      Nome da mentoria
                    </Text>

                    <Input
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.3)"
                      placeholder="Informe o nome da mentoria"
                      w={"550px"}
                      h={"35px"}
                      name="nome"
                      value={values.nome}
                      onChange={(value) => {
                        handleChange("nome")(value);
                      }}
                      sx={{
                        "::placeholder": {
                          fontSize: "14px",
                          color: "#B0B0B0",
                        },
                      }}
                    />
                  </Box>

                  <Box mt={"30px"}>
                    <Text fontSize="md" fontWeight="bold" color="#05234E">
                      Descrição
                    </Text>
                    <Textarea
                      mt="5px"
                      name="descricao"
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                      placeholder="Escreva sobre a mentoria"
                      value={values.descricao}
                      sx={{
                        "::placeholder": {
                          fontSize: "14px",
                          color: "#B0B0B0",
                        },
                      }}
                      w={"550px"}
                      h={"130px"}
                      onChange={(value) => {
                        handleChange("descricao")(value);
                      }}
                    />
                  </Box>

                  <Box mt={"30px"}>
                    <Text fontSize="md" fontWeight="bold" color="#05234E">
                      Aluno
                    </Text>
                    <Select
                      sx={{
                        "::placeholder": {
                          fontSize: "14px",
                          color: "#B0B0B0",
                        },
                      }}
                      mt="5px"
                      w={"550px"}
                      name="idAluno"
                      value={values.idAluno}
                      onChange={(value) => {
                        handleChange("idAluno")(value);
                      }}
                      h={"35px"}
                      placeholder="Selecione o aluno"
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                    >
                      {Alunos?.map((aluno, index) => (
                        <option key={index} value={aluno._id}>
                          {aluno.nome}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  <Box mt={"30px"}>
                    <Text fontSize="md" fontWeight="bold" color="#05234E">
                      Quantidade de aulas
                    </Text>

                    <Input
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.3)"
                      placeholder="Informe a quantidade de aulas"
                      w={"550px"}
                      h={"35px"}
                      name="qtdtotal"
                      value={Number(values.qtdtotal)}
                      onChange={(value) => {
                        handleChange("qtdtotal")(value);
                      }}
                      sx={{
                        "::placeholder": {
                          fontSize: "14px",
                          color: "#B0B0B0",
                        },
                      }}
                    />
                  </Box>

                  <Button
                    mt={"30px"}
                    w="150px"
                    mb={"10px"}
                    h="40px"
                    bgGradient="linear(to-r, #000024 10%, #0D0D42 100%)"
                    color="white"
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
                    transition="bottom 0.3s ease-in-out"
                    onClick={() => handleSubmit()}
                    _hover={{
                      transform: "scale(1.1)",
                      transition: "0.3s",
                      bgGradient: "linear(to-r, #000024 10%, #0D0D42 100%)",
                    }}
                  >
                    Criar Mentoria
                  </Button>
                </Flex>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      <MenuUsuario />

      <Flex
        p="30px"
        alignItems={"center"}
        w={"full"}
        h={"full"}
        flexDir={"column"}
        position="relative"
      >
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          color={myTheme.colors.azul_claro}
        >
          Mentorias
        </Text>
        <Flex gap={10} mt={"50px"} px={"100px"} w={"full"}>
          {mentorias && mentorias.length > 0 ? (
            user?.typeUser === "Aluno" ? (
              mentorias?.map((mentoria, index) => (
                <CardMentoriaAluno
                  date={
                    mentoria.proximoEncontro
                      ? formatDateBR(mentoria.proximoEncontro)
                      : "Não definido"
                  }
                  mentorName={mentoria.nomeMentor}
                  nomeMentoria={mentoria.nome}
                  key={index}
                  id={mentoria.id}
                />
              ))
            ) : (
              mentorias?.map((mentoria, index) => (
                <CardMentoriaMentor
                  date={
                    mentoria.proximoEncontro
                      ? formatDateBR(mentoria.proximoEncontro)
                      : "Não definido"
                  }
                  mentorName={mentoria.nomeMentor}
                  nomeMentoria={mentoria.nome}
                  key={index}
                  aluno={mentoria.nomeMentorado}
                  id={mentoria.id}
                />
              ))
            )
          ) : (
            <Flex
              w={"full"}
              h={"50vh"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                color={myTheme.colors.azul}
                fontWeight={"bold"}
                fontSize={"2xl"}
                textAlign={"center"}
              >
                Nenhuma mentoria ativa
              </Text>
            </Flex>
          )}
        </Flex>

        {user?.typeUser === "Mentor" ? (
          <Button
            w="150px"
            h="40px"
            bgGradient="linear(to-r, #000024 10%, #0D0D42 100%)"
            color="white"
            position="absolute"
            bottom="30px"
            right="30px"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.4)"
            transition="bottom 0.3s ease-in-out"
            onClick={() => onOpen()}
            _hover={{
              transform: "scale(1.1)",
              transition: "0.3s",
              bgGradient: "linear(to-r, #000024 10%, #0D0D42 100%)",
            }}
          >
            Nova Mentoria
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
