import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

import { AuthProvider } from "./context/AuthProvider";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <DarkModeContextProvider>
    <AuthProvider>
      <StyledEngineProvider injectFirst>

      <App />
      </StyledEngineProvider>
    </AuthProvider>
  </DarkModeContextProvider>
</React.StrictMode>,
)
