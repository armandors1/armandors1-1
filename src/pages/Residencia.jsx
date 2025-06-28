import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaSearch, FaCheck, FaTimes } from "react-icons/fa"; // Importando os ícones necessários

export default function Residencia() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
    const navigate = useNavigate();

    useEffect(() => {
        carregarClientes();
    }, []);

    async function carregarClientes() {
        setLoading(true);
        try {
            const colecaoRef = collection(db, "residencia-clientes");
            const snapshot = await getDocs(colecaoRef);
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClientes(lista);
        } catch (error) {
            console.error("Erro ao carregar clientes da residência:", error);
        } finally {
            setLoading(false);
        }
    }

    async function excluirCliente(id) {
        if (!window.confirm("Deseja realmente excluir esse cliente?")) return;
        try {
            await deleteDoc(doc(db, "residencia-clientes", id));
            setClientes((old) => old.filter((c) => c.id !== id));
        } catch (error) {
            alert("Erro ao excluir cliente");
            console.error(error);
        }
    }

    async function toggleStatus(cliente) {
        try {
            const novoStatus = cliente.status === "ativado" ? "desativado" : "ativado";
            await updateDoc(doc(db, "residencia-clientes", cliente.id), {
                status: novoStatus,
            });
            setClientes((old) =>
                old.map((c) => (c.id === cliente.id ? { ...c, status: novoStatus } : c))
            );
        } catch (error) {
            alert("Erro ao atualizar status");
            console.error(error);
        }
    }

    async function togglePagamento(cliente) {
        try {
            const novoPago = cliente.pago === "sim" ? "não" : "sim";
            await updateDoc(doc(db, "residencia-clientes", cliente.id), {
                pago: novoPago,
            });
            setClientes((old) =>
                old.map((c) =>
                    c.id === cliente.id ? { ...c, pago: novoPago } : c
                )
            );
        } catch (error) {
            alert("Erro ao atualizar status de pagamento");
            console.error(error);
        }
    }

    function formatarValor(valor) {
        const numero = Number(valor);
        return numero.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    // Lógica de filtro para a barra de busca
    const filteredClientes = clientes.filter((cliente) =>
        Object.values(cliente).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading) return <p className="p-4">Carregando clientes...</p>;

    return (
        <div className="p-4 sm:p-6 max-w-screen-xl mx-auto"> {/* Adicionado max-w-screen-xl e mx-auto para centralizar e limitar largura */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Clientes da Residência</h1>

            {/* Search Bar - Ajustado para ser menor e ter largura responsiva */}
            <div className="mb-4 relative w-full sm:w-1/2 lg:w-1/3">
                <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="p-2 pl-9 text-sm border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            {/* End Search Bar */}

            {/* Condição para "nenhum cliente encontrado" com base no filtro de busca */}
            {filteredClientes.length === 0 && searchTerm !== "" ? (
                <p>Nenhum cliente encontrado com os termos de busca.</p>
            ) : filteredClientes.length === 0 && searchTerm === "" ? (
                <p>Nenhum cliente encontrado na residência.</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg"> {/* Adicionado overflow-x-auto para tabelas em telas pequenas */}
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3 border border-gray-300">Nome</th>
                                <th scope="col" className="px-2 py-1 border border-gray-300 hidden sm:table-cell min-w-[7.5rem] whitespace-nowrap">CPF</th> {/* Ajustes de largura e ocultar em telas pequenas */}
                                <th scope="col" className="px-4 py-3 border border-gray-300">Contato</th>
                                <th scope="col" className="px-4 py-3 border border-gray-300 hidden md:table-cell">Número</th> {/* Ocultar em telas médias */}
                                <th scope="col" className="px-4 py-3 border border-gray-300 hidden lg:table-cell">Usuário PPPoE</th> {/* Ocultar em telas grandes */}
                                <th scope="col" className="px-4 py-3 border border-gray-300 hidden lg:table-cell">Senha PPPoE</th> {/* Ocultar em telas grandes */}
                                <th scope="col" className="px-4 py-3 border border-gray-300">Velocidade</th>
                                <th scope="col" className="px-4 py-3 border border-gray-300">Valor</th>
                                <th scope="col" className="px-4 py-3 border border-gray-300">Pago</th>
                                <th scope="col" className="px-4 py-3 border border-gray-300">Status</th>
                                <th scope="col" className="px-4 py-3 border border-gray-300 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente) => (
                                <tr key={cliente.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-gray-300">{cliente.nome}</td>
                                    <td className="px-2 py-1 border border-gray-300 hidden sm:table-cell whitespace-nowrap">{cliente.cpf}</td> {/* Ajustes de largura e ocultar em telas pequenas */}
                                    <td className="px-4 py-3 border border-gray-300">{cliente.contato}</td>
                                    <td className="px-4 py-3 border border-gray-300 hidden md:table-cell">{cliente.numero}</td> {/* Ocultar em telas médias */}
                                    <td className="px-4 py-3 border border-gray-300 hidden lg:table-cell">{cliente.pppoe}</td> {/* Ocultar em telas grandes */}
                                    <td className="px-4 py-3 border border-gray-300 hidden lg:table-cell">{cliente.senha}</td> {/* Ocultar em telas grandes */}
                                    <td className="px-4 py-3 border border-gray-300">{cliente.velocidade}</td>
                                    <td className="px-4 py-3 border border-gray-300">{formatarValor(cliente.valor)}</td>
                                    <td className="px-4 py-3 border border-gray-300">
                                        <button
                                            onClick={() => togglePagamento(cliente)}
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${cliente.pago === "sim"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                }`}
                                        >
                                            {cliente.pago === "sim" ? "Sim" : "Não"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 border border-gray-300 capitalize">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${cliente.status === "ativado"
                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                            }`}>
                                            {cliente.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 border border-gray-300 space-y-1 sm:space-y-0 sm:space-x-1 flex flex-col sm:flex-row items-center justify-center">
                                        <button
                                            onClick={() => navigate(`/editar/${cliente.id}/residencia`)}
                                            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            title="Editar"
                                        >
                                            <FaEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => excluirCliente(cliente.id)}
                                            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            title="Excluir"
                                        >
                                            <FaTrashAlt className="w-4 h-4" />
                                        </button>
                                        {/* Botão de Status com Ícones - Lógica de cores e ícones invertida */}
                                        <button
                                            onClick={() => toggleStatus(cliente)}
                                            className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2
                                                ${cliente.status === "ativado"
                                                    ? "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500" // Se está ATIVADO, mostra VERDE (✓) para a ação de ATIVAR (o status futuro)
                                                    : "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500" // Se está DESATIVADO, mostra VERMELHO (✕) para a ação de DESATIVAR (o status futuro)
                                                }
                                            `}
                                            title={cliente.status === "ativado" ? "Desativar Cliente" : "Ativar Cliente"}
                                        >
                                            {cliente.status === "ativado" ? (
                                                <FaCheck className="w-4 h-4" /> // Se está ATIVADO, mostra o CHECK (✓)
                                            ) : (
                                                <FaTimes className="w-4 h-4" /> // Se está DESATIVADO, mostra o X (✕)
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}