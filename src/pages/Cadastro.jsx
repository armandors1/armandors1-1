import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Cadastro() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        contato: "",
        local: "feirinha",
        tipo: "apto",
        numero: "",
        pppoe: "",
        senha: "",
        velocidade: "",
        valor: "",
        status: "ativado",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const colecao = form.local === "feirinha" ? "feirinha-clientes" : "residencia-clientes";

        try {
            await addDoc(collection(db, colecao), form);
            alert("Cliente cadastrado com sucesso!");
            navigate(`/${form.local}`);
        } catch (err) {
            alert("Erro ao cadastrar cliente.");
            console.error(err);
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 sm:p-6 bg-white shadow rounded-lg mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Cliente</h1>
            <form onSubmit={handleSubmit} className="grid gap-y-4">
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome do cliente"
                    required
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    placeholder="CPF" maxLength="14"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="contato"
                    value={form.contato}
                    onChange={handleChange}
                    placeholder="Contato"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                        name="local"
                        value={form.local}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="feirinha">Feirinha</option>
                        <option value="residencia">Residência</option>
                    </select>
                    <select
                        name="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="apto">Apto</option>
                        <option value="banca">Banca</option>
                    </select>
                </div>
                <input
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    placeholder="Número do Apto/Banca"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="pppoe"
                    value={form.pppoe}
                    onChange={handleChange}
                    placeholder="Usuário PPPoE"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="Senha PPPoE"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="velocidade"
                    value={form.velocidade}
                    onChange={handleChange}
                    placeholder="Velocidade (megas)"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name="valor"
                    value={form.valor}
                    onChange={handleChange}
                    placeholder="Valor (R$)"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ativado">Ativado</option>
                    <option value="desativado">Desativado</option>
                </select>

                <button
                    type="submit"
                    className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}