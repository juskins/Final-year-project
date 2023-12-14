import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <DarkModeContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </DarkModeContextProvider>
</React.StrictMode>,
)
