import Menu from "../assets/components/Menu";
import { useEffect, useState } from "react";
import api from "../api/api";

function RealizarDevolucao() {
    const [leitores, setLeitores] = useState([]);
    const [leitor, setLeitor] = useState('');

    const [livro, setLivro] = useState('');
    const [livros, setLivros] = useState([]);

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(() => {
        async function buscarLeitores() {
            try {
                const resposta = await api.get("/leitores/opcoes");
                setLeitores(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar os leitores", erro);
            }
        }

        buscarLeitores();
    }, []);

    async function buscarEmprestimos(idLeitor) {
        try {
            const resposta = await api.get(`/emprestimos/leitor/${idLeitor}`);
            setLivros(resposta.data);

        } catch (erro) {
            console.error('Erro ao buscar os livros', erro);
        }
    }

    async function devolverLivro(e) {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await api.put(`/emprestimos/devolver/${livro}`);

            setSucesso(resposta.data.mensagem);
            setErro('')
        } catch (erro) {
            console.error(erro);
            setErro('Erro ao realizar a devolução');
            setSucesso('');
        }
    }

    return (
        <div className="min-h-screen flex">
            <Menu />

            <main className="bg-gray-900 flex-1 p-16 text-white flex items-center justify-center">
                <div className="bg-gray-800 rounded-2xl p-10 w-full max-w-4xl">
                    <h1 className="bg-linear-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent text-4xl font-bold mb-15">DEVOLVER LIVRO</h1>

                    <div className="flex justify-center">
                        {/* Mensagens de erro e sucesso */}
                        {erro && <p className="text-red-500 mt-4">{erro}</p>}
                        {sucesso && <p className="text-green-600 mt-4">{sucesso}</p>}
                    </div>
                    <form onSubmit={devolverLivro}>

                        <label htmlFor="leitor" className="block font-medium text-slate-200 mb-1">Leitor:</label>
                        <select name="leitor" id="leitor" value={leitor} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6"
                            onChange={(e) => {
                                const id = e.target.value;
                                
                                setLeitor(id);
                                if(id){
                                    buscarEmprestimos(id);
                                } else {
                                    setLivros([]);
                                }
                            }} 
                        >
                            <option value="">Selecionar Leitor</option>
                            
                            {leitores.map((l) => (
                                <option key={l.id_leitor} value={l.id_leitor}>
                                    {l.nome}
                                </option>
                            ))}
                        </select>
                        
                        <label htmlFor="livro" className="block font-medium text-slate-200 mb-1">Livro:</label>
                        <select name="livro" id="livro" value={livro} onChange={(e) => setLivro(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6">
                            <option value="">Selecionar Livro</option>

                            {livros.map((liv) => (
                                <option key={liv.id_emprestimo} value={liv.id_emprestimo}>
                                    {liv.titulo}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-center">
                        <button type="submit" className="bg-blue-600 px-4 py-2 rounded cursor-pointer transition-colors hover:bg-blue-700">Devolver Livro</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default RealizarDevolucao;