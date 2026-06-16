import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../api/api";
import cadastroSchema from "../schemas/cadastroSchema";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  async function handleCadastro(e) {
    e.preventDefault();
    setErro(""); // Limpar o erro antes de validar

    console.log("API URL:", import.meta.env.VITE_API_URL);
    console.log("BASE URL:", api.defaults.baseURL);


    if (senha !== confSenha) {
        setErro('As senhas não conferem');
        return;
    }

    //Validação Zod
    const resultado = cadastroSchema.safeParse({ nome, email, senha });

    if (!resultado.success) {
      const erros = resultado.error.flatten().fieldErrors;

      const mensagem = erros.nome?.[0] || erros.email?.[0] || erros.senha?.[0] || "Erro de validação";

      setErro(mensagem);
      return;
    }

    try {
      const resposta = await api.post("/usuarios/cadastro", {
        nome,
        email,
        senha,
      });

      setErro("");
      setSucesso(resposta.data.mensagem);

      setTimeout(() => {
        navigate('/login');
      }, 1500)

    } catch (erro) {
      const mensagem = erro.response?.data?.erro || "Erro no cadastro";

      setErro(mensagem);
      setSucesso(""); // limpa sucesso
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl rounded-3xl border-slate-700 bg-slate-900 p-10 box-shadow">

        <div className="mb-10 text-center">
          <h1 className="mt-4 text-4xl font-bold text-blue-500">LibManager</h1>
          <p className="text-gray-500 text-sm">Cadastrar novo bibliotecário</p>
        </div>

        <form className="space-y-6" onSubmit={handleCadastro}>

          {erro && (<p className="text-red-500 text-sm text-center">{erro}</p>)}
          {sucesso && (<p className="text-green-600 text-sm text-center">{sucesso}</p>)}
          
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-slate-300 mb-2">
                Nome
            </label>

            <input 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            id="nome"
            type="text"
            placeholder="Digite aqui seu nome"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400"
            required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              E-mail
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Senha
            </label>
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              id="senha"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="confSenha" className="block text-sm font-medium text-slate-300 mb-1">Confirmar Senha</label>
            <input
                value={confSenha}
                onChange={(e) => setConfSenha(e.target.value)}
                id="confSenha"
                type="password"
                placeholder="Confirmar Senha"
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-blue-400" 
            />
          </div>

          <div className="flex items-center justify-center text-sm text-slate-400">
            <NavLink to="/login" className="text-blue-300 hover:text-blue-200 cursor-pointer transition">Já possui cadastro? <strong>Faça login</strong></NavLink>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-blue-500 px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-blue-400"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
