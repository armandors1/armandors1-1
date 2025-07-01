import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useSolicitacoes } from "../contexts/SolicitacoesContext";


export default function Layout() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pendentes } = useSolicitacoes(); // acessa o número de solicitações pendentes

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            alert("Erro ao sair");
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-4 bg-white shadow-md flex items-center justify-between"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <h2 className="text-xl font-bold">Provedor</h2>
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    ></path>
                </svg>
            </button>

            {/* Sidebar */}
            <nav
                className={`
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    fixed inset-y-0 left-0 z-25 w-39 bg-white shadow-md p-6 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:flex
                `}
            >
                <h2 className="text-2xl font-bold mb-8">Provedor</h2>
                <p className="mb-6 text-sm">Olá, {user?.email || "Usuário"}</p>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                    onClick={() => setIsSidebarOpen(false)}
                >
                    📊 Dashboard
                </NavLink>
                <NavLink
                    to="/buscar-clientes"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                >
                    🔍 Buscar Clientes
                </NavLink>

                <NavLink
                    to="/feirinha"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                    onClick={() => setIsSidebarOpen(false)}
                >
                    🛍 Feirinha
                </NavLink>
                <NavLink
                    to="/residencia"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                    onClick={() => setIsSidebarOpen(false)}
                >
                    🏠 Residência
                </NavLink>
                <NavLink
                    to="/cadastro"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                    onClick={() => setIsSidebarOpen(false)}
                >
                    📝 Cadastro
                </NavLink>
                <NavLink
                    to="/solicitar-internet"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " +
                        (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                    onClick={() => setIsSidebarOpen(false)}
                >
                    🌐 Solicitar Internet
                </NavLink>
                <NavLink
                    to="/solicitacoes"
                    className={({ isActive }) =>
                        `flex items-center justify-between mb-2 px-4 py-2 rounded-lg transition-colors duration-150 
        ${isActive ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-green-100'}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <span className="flex items-center gap-2">
                        ✅ <span>Solicitações</span>
                    </span>
                    {pendentes > 0 && (
                        <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                            {pendentes}
                        </span>
                    )}
                </NavLink>


                <NavLink
                    to="/gerar-link"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " +
                        (isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-purple-100")
                    }
                >
                    📌 Gerar Link/QR
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                    Sair
                </button>
            </nav>

            {/* Main content */}
            <main className="flex-1 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
