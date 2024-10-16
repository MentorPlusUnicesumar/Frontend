import { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Img, Text } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';
import { useChat } from '../utils/useChat';
import { useQuery } from 'react-query';
import { MenuUsuario } from '../components/menu';

export function Chat() {
    const {socket, user} = useContext(AuthContext)
    const [messages, setMessages] = useState<string[]>([]);
    const {getChats} = useChat();
    const { data } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => getChats(),
      });

    console.log('chats', data)

    useEffect(() => {
        socket!.on('message', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
          socket!.off('message');
        };

       
      }, []);

      const sendMessage = () => {
        const message = 'Ignorante por cima do pal!';
        socket!.emit('sendMessage', {
            // chatId: ,
            senderId: user?._id,
            content: message,
        });
      };

      return (
        <Flex w={'full'} h={'full'} flexDir={"column"}>
              <MenuUsuario />

              <Flex w={'25%'} h={'full'} bg={'#D2D2D2'}>
                {data?.map((chat) => (
                    <Box display={'flex'} flexDir={'column'} gap={2} alignItems={'center'} w={'100%'} h={'60px'}>                        
                        <Flex>
                            <Img w={'40px'} h={'40px'} borderRadius={'full'} src={user?.typeUser === 'Aluno' ? chat.idMentor.fotos : chat.idAluno.fotos}/>
                            <Text>{user?.typeUser === 'Aluno' ? chat.idMentor.name : chat.idAluno.name}</Text>
                        </Flex>
                        <Box w={'80%'} h={'1px'} bg={'red'}/>
                    </Box>
                ))}
              </Flex>
            {/* {messages.map((msg, index) => (
                <Text key={index}>{msg}</Text>
        ))}

        <Button onClick={sendMessage}>Enviar mensagem</Button> */}
        </Flex>
      )
}