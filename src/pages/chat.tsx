import { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Img, Input, Link, Text } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';
import { Message, useChat } from '../utils/useChat';
import { useQuery } from 'react-query';
import { MenuUsuario } from '../components/menu';

type chatSelecionado = {
  id: string,
  nome: string
}

export function Chat() {
    const {socket, user} = useContext(AuthContext)
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatSelecionado, setChatSelecionado] = useState<chatSelecionado>();
    const {getChats, getMessagesByChat} = useChat();

    console.log('messages', messages)

    const { data: chats } = useQuery({
      queryKey: ["chats"],
      queryFn: async () => getChats(),
  });

  console.log('chats', chats)

  const { data: messagensByChat } = useQuery({
      queryKey: ["messagensByChat", chats ? chats[0]._id : ''],
      queryFn: async () => getMessagesByChat(chats![0]._id),
  });

  useEffect(() => {
    if (messagensByChat) {
        setMessages(messagensByChat);
    }
}, [messagensByChat]);

useEffect(() => {
  const handleNewMessage = (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
  };

  if (socket) {
      socket.on('newMessage', handleNewMessage);
  }

  return () => {
      if (socket) {
          socket.off('newMessage', handleNewMessage);
      }
  };
}, [socket]);

function sendMessage(msg: string) {
  const newMessage = {
      chatId: "6710436242c10f3dcd5e12f7",
      senderId: user?._id,
      content: msg,
  };

  socket!.emit('sendMessage', newMessage);
}         

      return (
        <Flex w={'full'} h={'full'} flexDir={"column"}>
              <MenuUsuario />

            <Flex w={'full'} h={'full'} flexDir={'row'} pt={'25px'}>

              <Flex w={'25%'} h={'full'} flexDir={'column'} px={'20px'}>
                <Text fontWeight={'bold'} mb={'30px'} color={'#6A6A6A'}>Conversas</Text>
                {chats?.map((chat) => {
                  const User = user?.typeUser === 'Aluno' ? chat.idMentor.name : chat.idAluno.name

                  return (
                    <Link 
                      onClick={() => setChatSelecionado({id: chat._id, nome: User})}
                      _hover={{ textDecoration: 'none', bg: "#E4E4E4" }}
                      borderRadius={'10px'}
                      bg={chatSelecionado?.id === chat._id ? '#E1E1E1' : 'white'}
                      w={'90%'}
                      h={'55px'}
                      display={'flex'}
                      alignItems={'center'}
                      px={'10px'}
                      mb={'20px'}
                    >
                      <Box display={'flex'} flexDir={'row'} gap={2}>
                          <Img w={'40px'} h={'40px'} borderRadius={'full'} src={user?.typeUser === 'Aluno' ? chat.idMentor.fotos : chat.idAluno.fotos}/>
                          <Box>
                            <Text fontWeight={'bold'}>{user?.typeUser === 'Aluno' ? chat.idMentor.name : chat.idAluno.name}</Text>
                            <Text mt={'-5px'} color={'#6A6A6A'} fontSize={'sm'}>{chat?.lastMessage?.content || ""}</Text>
                          </Box>
                      </Box>
                    </Link>
                  )
                })}
              </Flex>

              <Flex flexDir={'column'} w={'full'} h={'full'}>
                <Box display={'flex'} flexDir={'row'} gap={1} mb={'5px'}>
                  {
                    !chatSelecionado ? null :
                    <>
                    <Text fontWeight={'light'} color={'#7A7A7A'}>Chat com</Text>
                  <Text color={'#7A7A7A'} fontWeight={'bold'}>{chatSelecionado?.nome}</Text>
                    </>
                  }
                </Box>
                  <Flex w={'100%'} h={'full'} borderWidth={'1px'} borderColor={'#D9D9D9'} borderRadius={'10px'}>

                      {/* <Input w={'90%'} h={'40px'} placeholder='Mensagem' bg={'gray'} value={message}
                    onChange={(e) => setMessage(e.target.value)}/>
                      <Button onClick={() => sendMessage(message)}>Enviar</Button> */}
                  </Flex>
                </Flex >
              </Flex>            
        </Flex>
      )
}