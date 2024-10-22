import { useContext, useEffect, useRef, useState } from 'react';
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
  const { socket, user } = useContext(AuthContext)
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMessage] = useState<string>();
  const [chatSelecionado, setChatSelecionado] = useState<chatSelecionado>();
  const { getChats, getMessagesByChat } = useChat();
  
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => getChats(),
  });

  console.log('chats', chats)
  console.log('chatSelecionado', chatSelecionado)

  const { data: messagensByChat } = useQuery({
    queryKey: ["messagensByChat", chatSelecionado],
    queryFn: async () => getMessagesByChat(chatSelecionado!.id),
  });

  useEffect(() => {
    if (messagensByChat) {
      setMessages(messagensByChat);
    }
  }, [messagensByChat]);

  useEffect(() => {
    const handleNewMessage = (message: any) => {
      if (message.chatId === chatSelecionado?.id) {

        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    if (socket) {
      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [socket, chatSelecionado]);

  function sendMessage(msg: string | undefined) {
    console.log('aqui', msg)
    const newMessage = {
      chatId: chatSelecionado?.id,
      senderId: user?._id,
      content: msg,
    };

    socket!.emit('sendMessage', newMessage);

    setMessage("")
  }

  return (
    <Flex w={'full'} h={'full'} flexDir={"column"} overflowY={'hidden'}>
      <MenuUsuario />

      <Flex w={'full'} h={'full'} flexDir={'row'} pt={'25px'}>

        <Flex w={'25%'} h={'full'} flexDir={'column'} px={'20px'}>
          <Text fontWeight={'bold'} mb={'30px'} color={'#6A6A6A'}>Conversas</Text>
          {chats?.map((chat) => {
            const User = user?.typeUser === 'Aluno' ? chat.idMentor.name : chat.idAluno.name

            return (
              <Link
                onClick={() => setChatSelecionado({ id: chat._id, nome: User })}
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
                  <Img w={'40px'} h={'40px'} borderRadius={'full'} src={user?.typeUser === 'Aluno' ? chat.idMentor.fotos : chat.idAluno.fotos} />
                  <Box>
                    <Text fontWeight={'bold'}>{user?.typeUser === 'Aluno' ? chat.idMentor.name : chat.idAluno.name}</Text>
                    <Text isTruncated maxW={'120px'} mt={'-5px'} color={'#6A6A6A'} fontSize={'sm'}>{chat?.lastMessage?.content || ""}</Text>
                  </Box>
                </Box>
              </Link>
            )
          })}
        </Flex>

        <Flex flexDir={'column'} w={'full'} h={'full'}>
          <Box display={'flex'} flexDir={'row'} gap={1} minH={'25px'}>
            {
              !chatSelecionado ? null :
                <>
                  <Text fontWeight={'light'} color={'#7A7A7A'}>Chat com</Text>
                  <Text color={'#7A7A7A'} fontWeight={'bold'}>{chatSelecionado?.nome}</Text>
                </>
            }
          </Box>
          <Flex flexDir={'column'} w={'100%'} h={'100%'} borderWidth={'1px'} borderColor={'#D9D9D9'} borderRadius={'10px'}>

            <Flex  w={'full'} h={'75%'} flexDir={'column'} gap={5} p={'20px'} overflowY="auto">
              {messages.map((msg) => (
                user?._id === msg.senderId ?
                  <Box wordBreak={'break-word'} borderRadius={'8px'} px={'10px'} py={'5px'} alignSelf={'end'} minW={'50px'} maxW={'60%'} display={'flex'} justifyContent={'flex-end'} bg={'#007AFF'} color={'white'}>{msg.content}</Box> :
                  <Box wordBreak={'break-word'} borderRadius={'8px'} px={'10px'} py={'5px'} alignSelf={'start'} minW={'50px'} maxW={'60%'} bg={'#F2F2F7'} justifyContent={'flex-start'}>{msg.content}</Box>
              ))}
            </Flex>

            <Flex w={'100%'} h={'10%'} px={'20px'} gap={2}>
              <Input
                w={'90%'}
                h={'40px'}
                placeholder='Mensagem'
                value={msg}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {                   
                    sendMessage(msg);
                  }
                }}
              />

              <Button onClick={() => sendMessage(msg)}>Enviar</Button>
            </Flex>

          </Flex>
        </Flex >
      </Flex>
    </Flex>
  )
}