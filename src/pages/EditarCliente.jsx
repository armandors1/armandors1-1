import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditarCliente() {
    const { id, origem } = useParams(); // origem = "feirinha" ou "residencia"
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: "",
        contato: "",
        pppoe: "",
        velocidade: "",
        status: "ativado",
    });

    useEffect(() => {
        const buscarCliente = async () => {
            try {
                const ref = doc(db, `${origem}-clientes`, id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setForm(snap.data());
                } else {
                    alert("Cliente não encontrado.");
                    navigate(`/${origem}`);
                }
            } catch (error) {
                console.error("Erro ao buscar cliente:", error);
            }
        };
        buscarCliente();
    }, [id, origem, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        try {
            const ref = doc(db, `${origem}-clientes`, id);
            await updateDoc(ref, form);
            alert("Cliente atualizado com sucesso!");
            navigate(`/${origem}`);
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao salvar.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Editar Cliente - {origem}</h2>

            <form onSubmit={handleSalvar} className="space-y-4">
                <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    className="border p-2 w-full rounded"
                    required
                />

                <input
                    name="contato"
                    value={form.contato}
                    onChange={handleChange}
                    placeholder="Contato"
                    className="border p-2 w-full rounded"
                />

                <input
                    name="pppoe"
                    value={form.pppoe}
                    onChange={handleChange}
                    placeholder="Usuário PPPoE"
                    className="border p-2 w-full rounded"
                />

                <input
                    name="velocidade"
                    type="number"
                    value={form.velocidade}
                    onChange={handleChange}
                    placeholder="Velocidade (megas)"
                    className="border p-2 w-full rounded"
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                >
                    <option value="ativado">Ativado</option>
                    <option value="desativado">Desativado</option>
                </select>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/${origem}`)}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
