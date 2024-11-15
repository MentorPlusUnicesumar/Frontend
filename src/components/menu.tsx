import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import userIcon from "../imgs/userIcon.png";
import logo from "../imgs/logoComIcone.png";
import { UseMentorias } from "../utils/useMentorias";
import { useQuery } from "react-query";
import { useChat } from "../utils/useChat";
import { ModalNotificacoes } from "./modalNotificacoes";

export function MenuUsuario() {
  const { getChats } = useChat();

  const { data } = useQuery({
    queryKey: ["mentorias"],
    queryFn: async () => getMentorias(user!._id),
  });

  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => getChats(),
    refetchInterval: 5000,
  });

  const newMessagens = chats?.filter((chat) => chat.hasNewMessages);

  const linksAluno = [
    {
      name: "Minhas mentorias",
      qnt: data?.length,
      link: "/minhas-mentorias",
    },
    {
      name: "Buscar mentores",
      qnt: null,
      link: "/buscar-mentores",
    },
    {
      name: "Notificações",
      qnt: 5,
      link: "/notificacoes",
    },
    {
      name: "Chat",
      qnt: newMessagens?.length,
      link: "/chat",
    },
  ];

  const linksMentor = [
    {
      name: "Minhas mentorias",
      qnt: data?.length,
      link: "/minhas-mentorias",
    },
    {
      name: "Notificações",
      qnt: 5,
      link: "/notificacoes",
    },
    {
      name: "Chat",
      qnt: newMessagens?.length,
      link: "/chat",
    },
  ];

  const { getMentorias } = UseMentorias();
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [linkSelecionado, setLinkSelecionado] = useState("minhas-mentorias");
  const nomeUsuario = user?.nome.split(" ")[0];
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLinkSelecionado(location.pathname);
  }, []);

  function menuSelect(action: "logout" | "perfil") {
    if (action === "logout") {
      signOut();
    } else if (action === "perfil") {
      navigate("/perfil");
    }
  }

  const links = user?.typeUser === "Mentor" ? linksMentor : linksAluno;

  return (
    <Flex
      px={"150px"}
      py={"10px"}
      alignItems={"center"}
      w={"full"}
      h={"70px"}
      bg={"linear-gradient(to right, #000024 60%, #000030 100%)"}
      justifyContent={"space-between"}
    >
      <ModalNotificacoes OpenModal={modal} setOpenModal={setModal} />

      <Img
        src={logo}
        w={"150px"}
        h={"40px"}
        onClick={() => navigate("/minhas-mentorias")}
      />

      <Flex justifyContent={"center"} alignItems={"center"} gap={6}>
        {links.map((link) => {
          return (
            <Flex flexDir={"row"} gap={2}>
              <Link
                onClick={() => {
                  if (link.name === "Notificações") {
                    setModal(true);
                  } else {
                    navigate(`${link.link}`);
                  }
                }}
              >
                <Text
                  textDecorationLine={
                    link.link === linkSelecionado ? "underline" : "none"
                  }
                  color={"white"}
                  fontWeight={"light"}
                >
                  {link.name}
                </Text>
              </Link>

              {link.qnt ? (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"25px"}
                  h="20px"
                  bg={"white"}
                  borderRadius={"5px"}
                >
                  <Text color={"#1D428A"}>{link.qnt}</Text>
                </Box>
              ) : null}
            </Flex>
          );
        })}
      </Flex>

      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDir={"column"}
      >
        <Img
          src={user?.fotos ?? userIcon}
          w={"40px"}
          h={"40px"}
          borderRadius={"20px"}
        />
        <Menu>
          <MenuButton
            as={Button}
            variant="link"
            rightIcon={<ChevronDownIcon />}
            style={{
              textDecoration: "none",
              padding: 0,
              color: "white",
              fontWeight: "300",
            }}
            _focus={{ boxShadow: "none" }}
          >
            {nomeUsuario || "Renan"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => menuSelect("perfil")}>Meu perfil</MenuItem>
            <MenuItem onClick={() => menuSelect("logout")}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
