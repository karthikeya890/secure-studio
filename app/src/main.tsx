import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme/index.ts'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import './index.css'


function Root() {
  return (
    <StrictMode>
      <ChakraProvider value={system}>
        <App />
        <Toaster />
      </ChakraProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
