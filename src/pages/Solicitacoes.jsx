import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

// This function would ideally interact with a real WhatsApp API or service.
async function enviarMensagemWhatsApp(numero, mensagem) {
    console.log(`Mensagem para ${numero}: ${mensagem}`);
}

export default function Solicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    // State to keep track of the number of new solicitations for notification
    const [newSolicitacoesCount, setNewSolicitacoesCount] = useState(0);
    const navigate = useNavigate();
    const solicitacoesRef = collection(db, "solicitacoes-clientes");

    useEffect(() => {
        // Authenticate user
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate("/login");
            }
        });

        if (auth.currentUser) {
            const unsubscribeSnapshot = onSnapshot(solicitacoesRef, (snapshot) => {
                const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                // Calculate new solicitations for notification
                // This assumes 'solicitacoes' holds the previous state.
                // You might need a more robust way to track "new" if you have
                // other ways requests are removed/added.
                if (solicitacoes.length < lista.length) {
                    setNewSolicitacoesCount(lista.length - solicitacoes.length);
                } else {
                    setNewSolicitacoesCount(0); // Reset if fewer or same number
                }

                setSolicitacoes(lista);
            });

            return () => {
                unsubscribeAuth();
                unsubscribeSnapshot();
            };
        }

        return () => unsubscribeAuth();
    }, [navigate, solicitacoesRef, solicitacoes.length]); // Added solicitacoes.length to dependency array

    async function aprovarSolicitacao(solicitacao) {
        try {
            await deleteDoc(doc(db, "solicitacoes-clientes", solicitacao.id));

            const numero = solicitacao.contato.replace(/\D/g, "");
            const mensagem = `Olá ${solicitacao.nome}, sua solicitação foi aprovada!`;

            await enviarMensagemWhatsApp(numero, mensagem);

            // No need to update locally, onSnapshot handles it automatically
        } catch (error) {
            console.error("Erro ao aprovar solicitação:", error);
            alert("Erro ao aprovar solicitação.");
        }
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Notification Banner */}
            {newSolicitacoesCount > 0 && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                    <p className="font-bold">Nova(s) Solicitação(ões)!</p>
                    <p>Você tem {newSolicitacoesCount} nova(s) solicitação(ões) de internet aguardando.</p>
                </div>
            )}

            <h1 className="text-xl font-bold mb-4">
                Solicitações de Internet ({solicitacoes.length})
            </h1>

            {solicitacoes.length === 0 ? (
                <p>Nenhuma solicitação encontrada.</p>
            ) : (
                <table className="w-full text-sm border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Nome</th>
                            <th className="px-4 py-2 border">Contato</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoes.map((solicitacao) => (
                            <tr key={solicitacao.id} className="text-center">
                                <td className="px-4 py-2 border">{solicitacao.nome}</td>
                                <td className="px-4 py-2 border">{solicitacao.contato}</td>
                                <td className="px-4 py-2 border capitalize">
                                    {solicitacao.status || "pendente"}
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => aprovarSolicitacao(solicitacao)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Aprovar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}