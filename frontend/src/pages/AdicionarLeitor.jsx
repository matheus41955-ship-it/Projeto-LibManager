import Menu from "../assets/components/Menu";
import { useState } from "react";
import api from "../api/api";
import leitorSchema from "../schemas/leitorSchema";

function AdicionarLeitor() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    async function cadastrarLeitor(e) {
        e.preventDefault();
        setErro(""); // Limpar o erro antes de validar

        // Validação do Zod
        const resultado = leitorSchema.safeParse({ nome, email, telefone });

        if (!resultado.success) {
            const erros = resultado.error.flatten().fieldErrors;

            const mensagem = erros.nome?.[0] || erros.email?.[0] || erros.telefone?.[0] || "Erro na validação dos campos";
            setErro(mensagem);
            return;
        }
        try {
            const resposta = await api.post("/leitores/cadastrarLeitor", {
                nome,
                email,
                telefone,
            });

            setErro("");
            console.log(resposta.data);
            setSucesso(resposta.data.mensagem);
            setTimeout(() => {
                setSucesso("");
            }, 2500) // Mensagem de sucesso some dps de 2,5 segundos
            

        } catch (erro) {
            const mensagem = erro.response?.data?.erro || "Erro ao cadastrar Leitor";

            setErro(mensagem);
            setSucesso(""); // limpa o sucesso
        }
    }

    return (
        <div className="min-h-screen flex">
            <Menu />

            <main className="bg-gray-900 flex-1 p-16 text-white flex items-center justify-center">
                <div className="bg-gray-800 rounded-2xl p-10 w-full max-w-4xl">
                    <h1 className="bg-linear-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent text-4xl font-bold mb-3">CADASTRAR NOVO LEITOR</h1>
                    <h2 className="text-gray-400 text-sm mb-12">Cadastrar novos leitores para fazer empréstimos de livros no sistema</h2>

                    <div className="flex justify-center">
                        {/* Mensagens de erro e sucesso */}
                        {erro && <p className="text-red-500 mt-4">{erro}</p>}
                        {sucesso && <p className="text-green-600 mt-4">{sucesso}</p>}
                    </div>
                    <form onSubmit={cadastrarLeitor}>

                        <label htmlFor="nome" className="block font-medium text-slate-200 mb-1">Nome:</label>
                        <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} name="nome" type="text" placeholder="Nome do leitor" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />

                        <label htmlFor="email" className="block font-medium text-slate-200 mb-1">E-mail:</label>
                        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="seuemail@dominio.com" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />

                        <label htmlFor="telefone" className="block font-medium text-slate-200 mb-1">Telefone:</label>
                        <input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} name="telefone" type="text" placeholder="(11) 99999-9999" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />

                        <div className="flex justify-center">
                        <button type="submit" className="bg-blue-600 px-4 py-2 rounded cursor-pointer transition-colors hover:bg-blue-700">Adicionar Leitor</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AdicionarLeitor;