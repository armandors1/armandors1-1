import { useState, useEffect } from "react";

export default function ClienteEdit({ cliente, onSave, onCancel }) {
    const [form, setForm] = useState({
        nome: "",
        contato: "",
        pppoe: "",
        velocidade: "",
        status: "ativado",
    });

    useEffect(() => {
        if (cliente) {
            setForm({
                nome: cliente.nome || "",
                contato: cliente.contato || "",
                pppoe: cliente.pppoe || "",
                velocidade: cliente.velocidade || "",
                status: cliente.status || "ativado",
            });
        }
    }, [cliente]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(form);
    }

    if (!cliente) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>

                <label className="block mb-2">
                    Nome:
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                </label>

                <label className="block mb-2">
                    Contato:
                    <input
                        name="contato"
                        value={form.contato}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </label>

                <label className="block mb-2">
                    PPPoE:
                    <input
                        name="pppoe"
                        value={form.pppoe}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </label>

                <label className="block mb-2">
                    Velocidade (megas):
                    <input
                        name="velocidade"
                        type="number"
                        value={form.velocidade}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                        min={0}
                    />
                </label>

                <label className="block mb-4">
                    Status:
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option value="ativado">Ativado</option>
                        <option value="desativado">Desativado</option>
                    </select>
                </label>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
