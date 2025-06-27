import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Feirinha() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        carregarClientes();
    }, []);

    async function carregarClientes() {
        setLoading(true);
        try {
            const colecaoRef = collection(db, "feirinha-clientes");
            const snapshot = await getDocs(colecaoRef);
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setClientes(lista);
        } catch (error) {
            console.error("Erro ao carregar clientes da feirinha:", error);
        } finally {
            setLoading(false);
        }
    }

    async function excluirCliente(id) {
        if (!window.confirm("Deseja realmente excluir esse cliente?")) return;
        try {
            await deleteDoc(doc(db, "feirinha-clientes", id));
            setClientes((old) => old.filter((c) => c.id !== id));
        } catch (error) {
            alert("Erro ao excluir cliente");
            console.error(error);
        }
    }

    async function toggleStatus(cliente) {
        try {
            const novoStatus = cliente.status === "ativado" ? "desativado" : "ativado";
            await updateDoc(doc(db, "feirinha-clientes", cliente.id), {
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
            await updateDoc(doc(db, "feirinha-clientes", cliente.id), {
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

    if (loading) return <p>Carregando clientes...</p>;

    if (clientes.length === 0) return <p>Nenhum cliente encontrado na feirinha.</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Clientes da Feirinha</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">Nome</th>
                        <th className="border border-gray-300 p-2">CPF</th>
                        <th className="border border-gray-300 p-2">Contato</th>
                        <th className="border border-gray-300 p-2">Número</th>
                        <th className="border border-gray-300 p-2">Usuário PPPoE</th>
                        <th className="border border-gray-300 p-2">Senha PPPoE</th>
                        <th className="border border-gray-300 p-2">Velocidade</th>
                        <th className="border border-gray-300 p-2">Valor</th>
                        <th className="border border-gray-300 p-2">Pago</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">{cliente.nome}</td>
                            <td className="border border-gray-300 p-2">{cliente.cpf}</td>
                            <td className="border border-gray-300 p-2">{cliente.contato}</td>
                            <td className="border border-gray-300 p-2">{cliente.numero}</td>
                            <td className="border border-gray-300 p-2">{cliente.pppoe}</td>
                            <td className="border border-gray-300 p-2">{cliente.senha}</td>
                            <td className="border border-gray-300 p-2">{cliente.velocidade}</td>
                            <td className="border border-gray-300 p-2">{formatarValor(cliente.valor)}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => togglePagamento(cliente)}
                                    className={`px-2 py-1 rounded text-white ${cliente.pago === "sim"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-600 hover:bg-red-700"
                                        }`}
                                >
                                    {cliente.pago === "sim" ? "Sim" : "Não"}
                                </button>
                            </td>
                            <td className="border border-gray-300 p-2 capitalize">{cliente.status}</td>
                            <td className="border border-gray-300 p-2 space-x-2">
                                <button
                                    onClick={() => navigate(`/editar/${cliente.id}/feirinha`)}
                                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => excluirCliente(cliente.id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                >
                                    Excluir
                                </button>
                                <button
                                    onClick={() => toggleStatus(cliente)}
                                    className={`px-2 py-1 rounded text-white ${cliente.status === "ativado"
                                        ? "bg-yellow-600 hover:bg-yellow-700"
                                        : "bg-green-600 hover:bg-green-700"
                                        }`}
                                >
                                    {cliente.status === "ativado" ? "Desativar" : "Ativar"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
