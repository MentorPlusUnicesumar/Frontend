import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import tardivo from "../imgs/tardivo.png";
import myTheme from "../mytheme";
import { filter } from "../utils/useAdmin";
import { UserInterface } from "../utils/useMentor";
import './styles.css';

type Props = {
  listaUsuarios: UserInterface[],
  filterFunction: (prosp: filter) => void
};

export function PainelUsuarios({ listaUsuarios, filterFunction }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const inicialValues = {
    nome: ""
  }

  function handleFilter(props: filter) {
    filterFunction({
      nome: props.nome,
      typeUser: listaUsuarios[0].typeUser === 'Mentor' ? "Mentor" : "Aluno"
    })
  }

  function handleClick(tipo: "existente" | "novo") {
    if (tipo === "existente") {
      onOpen();
    } else {
      navigate("/novo-usuario");
    }
  }

  const widthNome = '35%'
  const widthEmail = '35%'
  const widthStatus = '15%'

  return (
    <>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
              Perfil do usuário
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDir={"column"}
              gap={3}
              mt={"20px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                display={"flex"}
                flexDir={"row"}
                gap={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Img
                  w="100px"
                  h={"100px"}
                  borderRadius={"full"}
                  src={tardivo}
                />
                <Box>
                  <Text fontWeight={"bold"}>Henrique Tardivo</Text>
                  <Text>henriqueTardivo@gmail.com</Text>
                  <Text color={"green"}>Disponível para mentorias</Text>
                </Box>
              </Box>

              <Box mt={"20px"} display={"flex"} flexDir={"row"} gap={"100px"}>
                <Flex>
                  <Box>
                    <Text fontWeight={"bold"}>Áreas de especialidade</Text>
                    <Text>Engenharia de Software</Text>
                    <Text>Análise de dados</Text>
                    <Text>Team leader</Text>
                  </Box>
                </Flex>
                <Flex>
                  <Box>
                    <Text fontWeight={"bold"}>Mentorias ativas</Text>
                    <Text>Gestão ágil com Scrum</Text>
                  </Box>
                </Flex>
              </Box>
              <Button
                mt={"50px"}
                mb={"20px"}
                w={"200px"}
                h={"40px"}
                borderRadius={"10px"}
                bg={myTheme.colors.azul}
              >
                <Text fontWeight={"bold"} color={"white"}>
                  Desativar perfil
                </Text>
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Text fontSize={"lg"} fontWeight={"bold"}>
        Buscar por:
      </Text>
      <Formik initialValues={inicialValues} onSubmit={handleFilter}>
        {({ handleSubmit, handleChange, values }) => (
          <Flex mt={"10px"} gap={5}>
            <Input
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              w={"250px"}
              placeholder="nome"
              value={values.nome}
              onChange={(value) => {
                handleChange("nome")(value);
              }}
              borderRadius={"10px"}
            />
            <Box display={'flex'} flexDir={'row'} alignItems={'center'} gap={5}>
              <Button
                _hover={{ bg: myTheme.colors.azul }}
                w={"150px"}
                bg={myTheme.colors.azul}
                h={"40px"}
                onClick={() => handleSubmit()}
              >
                <Text fontWeight={"bold"} color={"white"}>
                  Filtrar
                </Text>
              </Button>
              <Link onClick={() => filterFunction({
                nome: "",
                typeUser: ""
              })}>
                <Text>Limpar</Text>
              </Link>
            </Box>
          </Flex>
        )}
      </Formik>

      <Flex mt={"30px"} gap={5} p={"10px"}>
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={myTheme.colors.azul}
          w={widthNome}
        >
          Nome
        </Text>
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={myTheme.colors.azul}
          w={widthEmail}
        >
          E-mail
        </Text>
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={myTheme.colors.azul}
          w={widthStatus}
        >
          Status
        </Text>
      </Flex>

      <Flex overflowY="scroll" w={'full'} h={'250px'} flexDir={'column'} className="scrollable">
        {listaUsuarios?.map((usuario) => (
          <Flex
            mt={"15px"}
            gap={5}
            w={"full"}
            h={"40px"}
            borderRadius={"10px"}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            alignItems={"center"}
            p={"10px"}
            borderWidth={"1px"}
          >
            <Text fontSize={"lg"} color={"gray"} w={widthNome}>
              {usuario.nome}
            </Text>
            <Text fontSize={"lg"} color={"gray"} w={widthEmail}>
              {usuario.email}
            </Text>
            <Text fontSize={"lg"} color={"gray"} w={widthStatus}>
              {usuario.status}
            </Text>
            <Link
              onClick={() => handleClick(usuario.status ? "existente" : "novo")}
            >
              <Text
                fontSize={"lg"}
                color={myTheme.colors.azul}

                w={"100px"}
                fontWeight={"bold"}
              >
                Ver mais
              </Text>
            </Link>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
