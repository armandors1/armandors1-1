import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { SolicitacoesProvider } from "./contexts/SolicitacoesContext"; // ✅ importar aqui

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SolicitacoesProvider>
        <App />
      </SolicitacoesProvider>
    </AuthProvider>
  </React.StrictMode>
);
