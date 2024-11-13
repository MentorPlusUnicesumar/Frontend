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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import userIcon from "../imgs/userIcon.png";
import { UseMentorias } from "../utils/useMentorias";
import { useQuery } from "react-query";
import { useChat } from "../utils/useChat";

export function MenuAdmin() {
    const links = [
        {
            name: "Usuários",
            link: "/gerenciamento-usuarios",
        },
        {
            name: "Mentorias",
            link: "/gerenciamento-mentorias",
        }
    ];

    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [linkSelecionado, setLinkSelecionado] = useState("gerenciamento-usuarios");
    const nomeUsuario = user?.nome.split(" ")[0];

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
            <Text
                color={"white"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                onClick={() => navigate("/minhas-mentorias")}
            >
                Mentor +
            </Text>

            <Flex justifyContent={"center"} alignItems={"center"} gap={6}>
                {links.map((link) => {
                    return (
                        <Flex flexDir={"row"} gap={2}>
                            <Link onClick={() => navigate(`${link.link}`)}>
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
