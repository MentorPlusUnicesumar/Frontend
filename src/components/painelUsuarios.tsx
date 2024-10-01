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
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import myTheme from "../mytheme";
import { useNavigate } from "react-router-dom";
import tardivo from "../imgs/tardivo.png";

type ListaUsuarios = {
  nome: string;
  email: string;
  status?: string;
  tipo?: string;
}[];

type Props = {
  listaUsuarios: ListaUsuarios;
};

export function PainelUsuarios({ listaUsuarios }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  function handleClick(tipo: "existente" | "novo") {
    if (tipo === "existente") {
      onOpen();
    } else {
      navigate("/novo-usuario");
    }
  }

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

      {listaUsuarios[0].status ? (
        <>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Filtrar por:
          </Text>
          <Flex mt={"10px"} gap={5}>
            <Input
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              w={"250px"}
              placeholder="Nome"
              borderRadius={"10px"}
            />
            <Select
              boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
              w={"150px"}
              placeholder="Status"
            >
              <option value="ativos">Ativos</option>
              <option value="inativos">Inativos</option>
            </Select>

            <Button
              _hover={{ bg: myTheme.colors.azul }}
              w={"150px"}
              bg={myTheme.colors.azul}
              h={"40px"}
            >
              <Text fontWeight={"bold"} color={"white"}>
                Filtrar
              </Text>
            </Button>
          </Flex>
        </>
      ) : null}
      <Flex mt={"30px"} gap={5} p={"10px"}>
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={myTheme.colors.azul}
          w={"350px"}
        >
          Nome
        </Text>
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={myTheme.colors.azul}
          w={"350px"}
        >
          E-mail
        </Text>
        <Text
          fontWeight={"bold"}
          fontSize={"lg"}
          color={myTheme.colors.azul}
          w={"150px"}
        >
          Status
        </Text>
      </Flex>

      {listaUsuarios.map((usuario) => (
        <Flex
          mt={"15px"}
          gap={5}
          w={"full"}
          h={"40px"}
          borderRadius={"10px"}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
          justifyContent={"center"}
          alignItems={"center"}
          p={"10px"}
          borderWidth={"1px"}
        >
          <Text fontSize={"lg"} color={"gray"} w={"350px"}>
            {usuario.nome}
          </Text>
          <Text fontSize={"lg"} color={"gray"} w={"350px"}>
            {usuario.email}
          </Text>
          <Text fontSize={"lg"} color={"gray"} w={"150px"}>
            {usuario.status ?? usuario.tipo}
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
    </>
  );
}
