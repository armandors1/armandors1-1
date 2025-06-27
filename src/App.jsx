import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Feirinha from "./pages/Feirinha";
import Residencia from "./pages/Residencia";
import Cadastro from "./pages/Cadastro";
import EditarCliente from "./pages/EditarCliente";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/editar/:id/:origem"
            element={
              <PrivateRoute>
                <EditarCliente />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="feirinha" element={<Feirinha />} />
            <Route path="residencia" element={<Residencia />} />
            <Route path="cadastro" element={<Cadastro />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; // ESSA LINHA É ESSENCIAL
