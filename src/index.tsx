import { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import "./index.css"

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
