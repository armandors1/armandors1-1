import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            alert("Erro ao sair");
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <nav className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-8">Provedor</h2>
                <p className="mb-6 text-sm">Olá, {user?.email || "Usuário"}</p>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                >
                    📊 Dashboard
                </NavLink>
                <NavLink
                    to="/feirinha"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                >
                    🛍 Feirinha
                </NavLink>
                <NavLink
                    to="/residencia"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                >
                    🏠 Residência
                </NavLink>
                <NavLink
                    to="/cadastro"
                    className={({ isActive }) =>
                        "mb-4 px-3 py-2 rounded " + (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
                    }
                >
                    📝 Cadastro
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                    Sair
                </button>
            </nav>

            {/* Main content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
