// Código atualizado com cartões mais largos e visual ajustado

import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function BuscaClientes() {
    const [busca, setBusca] = useState("");
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    async function buscarClientes() {
        if (!busca.trim()) return;
        setLoading(true);

        try {
            const feirinhaRef = collection(db, "feirinha-clientes");
            const residenciaRef = collection(db, "residencia-clientes");

            const [feirinhaSnapshot, residenciaSnapshot] = await Promise.all([
                getDocs(feirinhaRef),
                getDocs(residenciaRef),
            ]);

            const feirinhaClientes = feirinhaSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const residenciaClientes = residenciaSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const allClientes = [...feirinhaClientes, ...residenciaClientes];

            const encontrados = allClientes.filter(
                (c) =>
                    c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
                    c.cpf?.includes(busca) ||
                    c.contato?.includes(busca) ||
                    c.pppoe?.toLowerCase().includes(busca.toLowerCase()) ||
                    c.senha?.toLowerCase().includes(busca.toLowerCase())
            );

            setClientes(encontrados);
        } catch (error) {
            alert("Erro ao buscar clientes: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                    🔍 Buscar Clientes
                </h1>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 p-6 border rounded-xl shadow-md bg-white">
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-extrabold text-blue-700">
                                Minha Empresa Internet
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Gerenciamento de Clientes
                            </p>
                        </div>

                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Digite nome, CPF, contato..."
                            className="border p-3 rounded-lg mb-4 w-full"
                        />

                        <button
                            onClick={buscarClientes}
                            className={`bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg w-full font-semibold transition-all ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Buscando..." : "Buscar"}
                        </button>
                    </div>

                    <div className="w-full md:w-2/3 p-2 md:p-4 bg-gray-50 rounded-xl shadow-inner overflow-y-auto max-h-[80vh]">
                        {clientes.length === 0 && !loading && busca.trim() && (
                            <p className="text-gray-600 text-center">
                                Nenhum cliente encontrado com "{busca}".
                            </p>
                        )}
                        {clientes.length === 0 && !busca.trim() && (
                            <p className="text-gray-600 text-center">
                                Digite algo para começar a buscar clientes.
                            </p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
                            {clientes.map((c) => (
                                <div
                                    key={c.id}
                                    className="bg-white p-6 rounded-2xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300"
                                >
                                    <h3 className="text-2xl font-extrabold text-blue-700 mb-4 text-center uppercase tracking-wide">
                                        {c.nome}
                                    </h3>

                                    <table className="w-full text-base text-gray-800">
                                        <tbody>
                                            <tr><td className="font-semibold py-1 pr-2">CPF:</td><td className="py-1">{c.cpf}</td></tr>
                                            <tr><td className="font-semibold py-1 pr-2">Contato:</td><td className="py-1">{c.contato}</td></tr>
                                            <tr><td className="font-semibold py-1 pr-2">Local:</td><td className="py-1 capitalize">{c.local}</td></tr>
                                            <tr><td className="font-semibold py-1 pr-2">Usuário PPPoE:</td><td className="py-1">{c.pppoe}</td></tr>
                                            <tr><td className="font-semibold py-1 pr-2">Senha PPPoE:</td><td className="py-1">{c.senha}</td></tr>
                                            <tr><td className="font-semibold py-1 pr-2">Velocidade:</td><td className="py-1">{c.velocidade} Mbps</td></tr>
                                            <tr><td className="font-semibold py-1 pr-2">Valor:</td><td className="py-1">R$ {c.valor}</td></tr>
                                        </tbody>
                                    </table>

                                    <div className="mt-6 flex justify-between items-center">
                                        <span className="text-sm font-bold">
                                            Status: <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${c.status === "ativado" ? "bg-green-500" : "bg-red-500"}`}>{c.status?.toUpperCase()}</span>
                                        </span>
                                        <span className="text-sm font-bold">
                                            Pago: <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${c.pago === "sim" ? "bg-green-500" : "bg-red-500"}`}>{c.pago?.toUpperCase()}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
