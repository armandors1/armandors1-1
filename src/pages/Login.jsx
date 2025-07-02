<form onSubmit={handleLogin} autoComplete="on">
    <label htmlFor="email" className="block mb-2 text-sm font-medium">
        Email
    </label>
    <input
        id="email"
        type="email"
        placeholder="Digite seu email"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="username"
        required
    />

    <label htmlFor="senha" className="block mb-2 text-sm font-medium">
        Senha
    </label>
    <input
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        className="w-full p-2 mb-6 border border-gray-300 rounded"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        autoComplete="current-password"
        required
    />

    <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
        Entrar
    </button>
</form>
