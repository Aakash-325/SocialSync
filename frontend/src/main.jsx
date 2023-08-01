import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext.jsx";

const theme = extendTheme({
  colors: {
    grey: {
      50: "#FFFFFF",
      100: "#F6F6F6",
      200: "#F0F0F0",
      300: "#E0E0E0",
      400: "#C2C2C2",
      500: "#A3A3A3",
      600: "#858585",
      700: "#666666",
      800: "#4D4D4D",
      900: "#333333",
      1000: "#1A1A1A",
      1100: "#0A0A0A",
      1200: "#000000",
    },
    primary: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
  },
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: `'Rubik', sans-serif`,
    poppins: `'Poppins', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
