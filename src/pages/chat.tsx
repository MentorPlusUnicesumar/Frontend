import { useContext, useEffect, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';

export function Chat() {
    const {socket, user} = useContext(AuthContext)
    const [messages, setMessages] = useState<string[]>([]);
    

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
        <Flex w={'full'} h={'full'}>
            {messages.map((msg, index) => (
                <Text key={index}>{msg}</Text>
        ))}

        <Button onClick={sendMessage}>Enviar mensagem</Button>
        </Flex>
      )
}