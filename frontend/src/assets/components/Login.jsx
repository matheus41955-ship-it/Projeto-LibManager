function Login() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl rounded-3xl border-slate-700 bg-slate-900 p-10 box-shadow">
        <div className="mb-10 text-center">
          <h1 className="mt-4 text-4xl font-bold text-blue-500">LibManager</h1>
          <p className="text-gray-500 text-sm">Login de bibliotecário</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-slate-300 mb-1">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400"
              required
            />
          </div>

          <div className="flex items-center justify-center text-sm text-slate-400">
            <button type="button" className="text-blue-300 hover:text-blue-200 transition">Esqueceu a senha?</button>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-blue-500 px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-blue-400"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login