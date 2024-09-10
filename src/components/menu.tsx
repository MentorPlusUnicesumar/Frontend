import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex, Img,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import pedro from "../imgs/pedro.jpg";
import { ItemMenu } from "./ItemMenu";
import { useLocation, useNavigate } from 'react-router-dom';

export function MenuUsuario() {
    const [menuSelecionado, setMenuSelecionado] = useState("Minhas mentorias")
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log('user', user)
    function selecionado(selected: string) {
        setMenuSelecionado(selected)
    }
   
    const nomeUsuario =  user?.name.split(" ")[0];

    function menuSelect(action: 'logout' | 'perfil') {
        if (action === 'logout') {
            signOut(); 
        } else if (action === 'perfil') {
            navigate("/perfil"); 
        }
    }

    return (
        <Flex px={'60px'} py={'10px'} alignItems={'center'} w={'full'} h={'70px'} bg={'#1D428A'} justifyContent={'space-between'}>
            <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'} onClick={() => navigate("/Minhas-mentorias")}>Mentor +</Text>

            <Flex justifyContent={'space-between'} w={'550px'}>
                <ItemMenu link="Minhas-mentorias" name="Minhas mentorias" qntd={2} />
                <ItemMenu link="Encontrar-mentores" name="Encontrar mentores" />
                <ItemMenu link="Notificacoes" name="Notificações" qntd={5} />
                <ItemMenu link="Chat" name="Chat" qntd={1} />
            </Flex>

            <Box justifyContent={'center'} alignItems={'center'} display={'flex'} flexDir={'column'}>
                <Img src={pedro} w={'40px'} h={'40px'} borderRadius={'20px'} />
                <Menu>
                    <MenuButton
                        as={Button}
                        variant="link"
                        rightIcon={<ChevronDownIcon />}
                        style={{ textDecoration: 'none', padding: 0, color: 'white', fontWeight: '300' }} 
                        _focus={{ boxShadow: 'none' }} 
                    >
                        {nomeUsuario}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => menuSelect('perfil')}>
                            Meu perfil
                        </MenuItem>
                        <MenuItem onClick={() => menuSelect('logout')}>
                            Sair
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}