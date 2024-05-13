import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "./components/AppContext.js";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AppContextProvider>
        <ColorModeScript />
        <App />
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
