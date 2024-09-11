import { ChakraProvider, Flex } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import myTheme from './mytheme';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={myTheme} cssVarsRoot={'theme'}>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Flex direction="column" w="100%" h="100vh">
            <AppRoutes />
          </Flex>
        </Router>
      </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;