import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Img, Input, Link, Text } from '@chakra-ui/react';
import { AuthContext } from '../../context/authContext';
import { Message, useChat } from '../../utils/useChat';
import { useQuery } from 'react-query';
import { MenuUsuario } from '../../components/menu';
import './styles.css';

type ChatSelecionado = {
  id: string;
  nome: string;
};

export function Chat() {
  const { socket, user } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMessage] = useState<string>('');
  const [chatSelecionado, setChatSelecionado] = useState<ChatSelecionado | undefined>();
  const { getChats, getMessagesByChat, markerMessageRead } = useChat();
  
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => getChats(),
  });

  console.log('chats', chats)
  console.log('chatSelecionado', chatSelecionado);

  const { data: messagensByChat } = useQuery({
    queryKey: ["messagensByChat", chatSelecionado],
    queryFn: async () => {
      if (chatSelecionado) {
        return getMessagesByChat(chatSelecionado.id);
      }
      return [];
    },
  });

  useEffect(() => {
    if (messagensByChat) {
      setMessages(messagensByChat);
      markerMessageRead(chatSelecionado?.id);
    }
  }, [messagensByChat]);

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.chatId === chatSelecionado?.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        markerMessageRead(chatSelecionado?.id)
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
  }, [chatSelecionado]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function sendMessage(msg: string) {
    const newMessage: Message = {
      chatId: chatSelecionado!.id,
      senderId: user?._id,
      content: msg,
    };

    socket?.emit('sendMessage', newMessage);
    setMessage('');
    
  }

  return (
    <Flex w="full" h="full" flexDir="column">
      <MenuUsuario />

      <Flex w="full" h="calc(100% - 100px)" flexDir="row" pt="25px"> {/* Ajuste a altura */}
        <Flex w="25%" h="full" flexDir="column" px="20px">
          <Text fontWeight="bold" mb="30px" color="#6A6A6A">Conversas</Text>
          {chats?.map((chat) => {
            const User = user?.typeUser === 'Aluno' ? chat.idMentor.name : chat.idAluno.name;

            return (
              <Link
                key={chat._id}
                onClick={() => setChatSelecionado({ id: chat._id, nome: User })}
                _hover={{ textDecoration: 'none', bg: "#E4E4E4" }}
                borderRadius="10px"
                bg={chatSelecionado?.id === chat._id ? '#E1E1E1' : 'white'}
                w="90%"
                h="55px"
                display="flex"
                alignItems="center"
                px="10px"
                mb="20px"
              >
                <Box display="flex" flexDir="row" gap={2}>
                  <Img w="40px" h="40px" borderRadius="full" src={user?.typeUser === 'Aluno' ? chat.idMentor.fotos : chat.idAluno.fotos} />
                  <Box>
                    <Text fontWeight="bold">{User}</Text>
                    <Text isTruncated maxW="120px" mt="-5px" color="#6A6A6A" fontSize="sm">{chat?.lastMessage?.content || ""}</Text>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Flex>

        <Flex flexDir="column" w="full" h="full">
          <Box display="flex" flexDir="row" gap={1} minH="25px">
            {chatSelecionado && (
              <>
                <Text fontWeight="light" color="#7A7A7A">Chat com</Text>
                <Text color="#7A7A7A" fontWeight="bold">{chatSelecionado.nome}</Text>
              </>
            )}
          </Box>
          <Flex flexDir="column" w="100%" h="100%" borderWidth="1px" borderColor="#D9D9D9" borderRadius="10px" justifyContent={'space-around'}>
            <Flex w="full" h="80%" flexDir="column" gap={5} p="20px" overflowY="scroll" className="scrollable">
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  wordBreak="break-word"
                  borderRadius="8px"
                  px="10px"
                  py="5px"
                  alignSelf={user?._id === msg.senderId ? 'end' : 'start'}
                  minW="50px"
                  maxW="60%"
                  display="flex"
                  justifyContent={user?._id === msg.senderId ? 'flex-end' : 'flex-start'}
                  bg={user?._id === msg.senderId ? '#007AFF' : '#F2F2F7'}
                  color={user?._id === msg.senderId ? 'white' : 'black'}
                >
                  {msg.content}
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Flex>

            <Flex w="100%" h="10%" px="20px" gap={2}>
              <Input
                isDisabled={!chatSelecionado}
                w="90%"
                h="40px"
                placeholder='Mensagem'
                value={msg}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage(msg);
                  }
                }}
              />
              <Button isDisabled={!chatSelecionado} onClick={() => sendMessage(msg)}>Enviar</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
