import { ChakraProvider, Flex } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import myTheme from './mytheme';
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={myTheme} cssVarsRoot={'theme'}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Flex direction="column" w="100%" h="100vh">
            <AppRoutes />
          </Flex>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;