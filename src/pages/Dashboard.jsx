import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const COLORS = ["#3182ce", "#63b3ed", "#f6ad55", "#fc8181"]; // azul, azul claro, laranja, vermelho

export default function Dashboard() {
    const [clientesFeirinha, setClientesFeirinha] = useState(0);
    const [clientesResidencia, setClientesResidencia] = useState(0);
    const [clientesAtivados, setClientesAtivados] = useState(0);
    const [clientesDesativados, setClientesDesativados] = useState(0);

    useEffect(() => {
        contarClientes();
    }, []);

    async function contarClientes() {
        try {
            const feirinhaSnap = await getDocs(collection(db, "feirinha-clientes"));
            setClientesFeirinha(feirinhaSnap.size);

            const residenciaSnap = await getDocs(collection(db, "residencia-clientes"));
            setClientesResidencia(residenciaSnap.size);

            let ativados = 0;
            let desativados = 0;

            feirinhaSnap.forEach((doc) => {
                const data = doc.data();
                if (data.status === "ativado") ativados++;
                else if (data.status === "desativado") desativados++;
            });

            residenciaSnap.forEach((doc) => {
                const data = doc.data();
                if (data.status === "ativado") ativados++;
                else if (data.status === "desativado") desativados++;
            });

            setClientesAtivados(ativados);
            setClientesDesativados(desativados);
        } catch (error) {
            console.error("Erro ao contar clientes:", error);
        }
    }

    const dataGrafico = [
        { name: "Feirinha", value: clientesFeirinha },
        { name: "Residência", value: clientesResidencia },
        { name: "Ativados", value: clientesAtivados },
        { name: "Desativados", value: clientesDesativados },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">📊 Painel de Controle</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow rounded p-4 text-center">
                    <h2 className="text-xl font-semibold mb-2">🏬 Feirinha</h2>
                    <p className="text-3xl font-bold">{clientesFeirinha}</p>
                </div>

                <div className="bg-white shadow rounded p-4 text-center">
                    <h2 className="text-xl font-semibold mb-2">🏠 Residência</h2>
                    <p className="text-3xl font-bold">{clientesResidencia}</p>
                </div>

                <div className="bg-white shadow rounded p-4 text-center">
                    <h2 className="text-xl font-semibold mb-2">✅ Ativados</h2>
                    <p className="text-3xl font-bold">{clientesAtivados}</p>
                </div>

                <div className="bg-white shadow rounded p-4 text-center">
                    <h2 className="text-xl font-semibold mb-2">❌ Desativados</h2>
                    <p className="text-3xl font-bold">{clientesDesativados}</p>
                </div>
            </div>

            {/* Gráfico de pizza */}
            <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={dataGrafico}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#3182ce"
                            label
                        >
                            {dataGrafico.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
