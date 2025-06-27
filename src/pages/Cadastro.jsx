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
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Cadastro de Cliente</h1>
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome do cliente"
                    required
                    className="border p-2 rounded"
                />
                <input
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    placeholder="CPF" maxLength="14"
                    className="border p-2 rounded"
                />
                <input
                    name="contato"
                    value={form.contato}
                    onChange={handleChange}
                    placeholder="Contato"
                    className="border p-2 rounded"
                />
                <div className="flex gap-4">
                    <select name="local" value={form.local} onChange={handleChange} className="border p-2 rounded">
                        <option value="feirinha">Feirinha</option>
                        <option value="residencia">Residência</option>
                    </select>
                    <select name="tipo" value={form.tipo} onChange={handleChange} className="border p-2 rounded">
                        <option value="apto">Apto</option>
                        <option value="banca">Banca</option>
                    </select>
                </div>
                <input
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    placeholder="Número do Apto/Banca"
                    className="border p-2 rounded"
                />
                <input
                    name="pppoe"
                    value={form.pppoe}
                    onChange={handleChange}
                    placeholder="Usuário PPPoE"
                    className="border p-2 rounded"
                />
                <input
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="Senha PPPoE"
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    name="velocidade"
                    value={form.velocidade}
                    onChange={handleChange}
                    placeholder="Velocidade (megas)"
                    className="border p-2 rounded"
                />
                <input
                    name="valor"
                    value={form.valor}
                    onChange={handleChange}
                    placeholder="Valor (R$)"
                    className="border p-2 rounded"
                />
                <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
                    <option value="ativado">Ativado</option>
                    <option value="desativado">Desativado</option>
                </select>

                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
