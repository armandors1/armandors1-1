import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigate("/"); // redireciona para a home/dashboard
        } catch (error) {
            setErro("Usuário ou senha inválidos");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-4 text-blue-700">Seja bem-vindo!</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                {erro && (
                    <p className="mb-4 text-red-600 font-semibold">{erro}</p>
                )}

                <label className="block mb-2 font-semibold" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="block mb-2 font-semibold" htmlFor="senha">
                    Senha
                </label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    className="w-full p-2 mb-6 border border-gray-300 rounded"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
