import { ChakraProvider, Flex } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import myTheme from './mytheme';
import { Home } from './home';
import { Login } from './login/login';
import { RedefinirSenha } from './login/redefinirSenha';
import { RedefinirSenhaEmail } from './login/redefinirSenhaEmail';

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={myTheme} cssVarsRoot={'theme'}>
      <QueryClientProvider client={queryClient}>
      <Flex direction="column" w="100%" h="100vh">
        <Home />
      </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;