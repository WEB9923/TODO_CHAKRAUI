import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ChakraProvider, ColorModeScript, extendTheme} from "@chakra-ui/react";
const config = {
  initialColorMode: "light",
  useSystemColorMode: false
}
const theme = extendTheme({
  config
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <App/>
  </ChakraProvider>
)
