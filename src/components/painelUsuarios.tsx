import {
  Box,
  Button,
  Flex,
  Input,
  Link,
  Text
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import myTheme from "../mytheme";
import { ModalPerfilUsuario } from "../pages/admin/modalPerfilUsuario";
import { filter } from "../utils/useAdmin";
import { UserInterface } from "../utils/useMentor";
import './styles.css';

type Props = {
  listaUsuarios: UserInterface[],
  filterFunction: (prosp: filter) => void
};

export function PainelUsuarios({ listaUsuarios, filterFunction }: Props) {
  const [openModalUser, setOpenModalUser] = useState(false)
  const [idUser, setIdUser] = useState<string>();

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

  function handleClick(tipo: "existente" | "novo", id: string) {
    if (tipo === "existente") {
      setIdUser(id)
      setOpenModalUser(true)
    } else {
      setIdUser(id)
      navigate(`/novo-usuario/${id}`);
    }
  }

  const widthNome = '35%'
  const widthEmail = '35%'
  const widthStatus = '15%'

  return (
    <>
      <ModalPerfilUsuario OpenModalUser={openModalUser} setOpenModalUser={setOpenModalUser} id={idUser!} />

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
              // value={values.nome}
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
              onClick={() => handleClick(usuario.status === 'Analisando' ? "novo" : "existente", usuario._id)}
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
