import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QrGeneratorTool = () => {
    const [formUrl, setFormUrl] = useState('https://provedor-two.vercel.app/solicitar-internet');
    const [errorMessage, setErrorMessage] = useState('');
    const [copySuccess, setCopySuccess] = useState('');

    const handleGenerate = () => {
        setErrorMessage('');
        setCopySuccess('');

        if (!formUrl) {
            setErrorMessage('Por favor, insira o URL do formulário.');
            return;
        }

        try {
            new URL(formUrl); // Validação básica de URL
        } catch (e) {
            setErrorMessage('Por favor, insira um URL válido (ex:https://provedor-two.vercel.app).');
            return;
        }
    };

    const handleCopy = () => {
        const el = document.createElement('textarea');
        el.value = formUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        setCopySuccess('Link copiado!');
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4 font-inter">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 hover:scale-[1.01]">
                <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6 border-b-4 border-purple-300 pb-2">
                    Gerador de Link e QR Code
                </h1>
                <p className="text-center text-gray-700 mb-8 text-lg">
                    Cole o URL do seu formulário de solicitação de internet abaixo para gerar um QR Code e um link fácil de compartilhar com seus clientes.
                </p>

                {errorMessage && (
                    <div className="p-4 mb-6 rounded-lg text-center font-semibold bg-red-100 text-red-800 border border-red-300">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label htmlFor="formUrl" className="block text-gray-700 text-sm font-bold mb-2">
                            URL do Formulário de Solicitação <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="formUrl"
                            value={formUrl}
                            onChange={(e) => setFormUrl(e.target.value)}
                            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 border-gray-300"
                            placeholder="Ex: https://provedor-two.vercel.app/solicitar-internet"
                            aria-label="URL do Formulário"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleGenerate}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                            aria-label="Gerar QR Code e Link"
                        >
                            Gerar QR Code e Link
                        </button>
                    </div>

                    {formUrl && !errorMessage && (
                        <div className="mt-8 text-center bg-gray-50 p-6 rounded-lg shadow-inner">
                            <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b border-purple-200 pb-2">Seu Link e QR Code</h2>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Link para Compartilhar:</label>
                                <div className="flex items-center justify-center bg-white border border-gray-300 rounded-lg p-3 break-words overflow-hidden">
                                    <span className="text-blue-600 text-lg font-medium">{formUrl}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        aria-label="Copiar Link"
                                    >
                                        Copiar
                                    </button>
                                </div>
                                {copySuccess && <p className="text-green-600 text-sm mt-2">{copySuccess}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">QR Code para Escanear:</label>
                                <div className="mx-auto w-fit p-4 bg-white border-2 border-purple-200 rounded-lg shadow-md">
                                    <QRCode value={formUrl} size={192} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QrGeneratorTool;
