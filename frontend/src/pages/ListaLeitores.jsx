import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Menu from "../assets/components/Menu";
import api from "../api/api";

function ListaLeitores() {
    const [leitores, setLeitores] = useState([]);
    useEffect(() => {
        async function buscarLeitores() {
            const resposta = await api.get('/leitores')

            console.log(resposta.data)
            setLeitores(resposta.data);
        }
        buscarLeitores()
    }, []);

    async function excluirLeitor(id) {
        const confirmar = window.confirm("Deseja realmente excluir este leitor?");
        if (!confirmar) return; // volta se o cara n confirmar a exclusão

        try {
            const resposta = await api.delete(`/leitores/excluirLeitor/${id}`);

            alert(resposta.data.mensagem);

            // Atualizar a lista
            setLeitores(leitores.filter(leitor => leitor.id_leitor !== id));
        } catch (erro) {
            if (erro.response?.status === 404) {
                alert("Leitor não encontrado");
            } else {
                alert(erro.response?.data?.erro ||"Erro ao excluir leitor, tente novamente mais tarde.");
            }
            console.error(erro);
        }
    }

    return (
    <div className="min-h-screen flex">
      <Menu /> {/* Sidebar em componente pra gnt utilizar em outras paginas */}
      <main className="bg-gray-900 flex-1 p-16 text-white">
        <h1 className="bg-linear-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent text-4xl font-bold mb-20"> GERENCIAR LEITORES</h1>
        <div className="bg-gray-800 rounded border-t-6 border-green-600 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <p className="font-bold text-xl mb-0">Lista de leitores cadastrados</p>
                <NavLink to={'/novo-leitor'} className='bg-pink-500 text-white rounded-4xl shadow-2xl transition-colors cursor-pointer p-2 hover:bg-pink-600'>+ Adicionar Leitor</NavLink>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto text-center">
                    <thead>
                        <tr className="bg-gray-700 border-b-3 border-gray-950 text-blue-400">
                            <th className="p-3">Nome</th>
                            <th className="p-3">E-mail</th>
                            <th className="p-3">Telefone</th>
                            <th className="p-3">Livros Cadastrados</th>
                            <th className="p-3">Gerenciar</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {leitores.map((leitor) => (
                            <tr key={leitor.id_leitor}>
                                <td className="p-3">{leitor.nome}</td>
                                <td className="p-3">{leitor.email}</td>
                                <td className="p-3">{leitor.telefone}</td>
                                <td className="p-3">{leitor.livros?.length ? leitor.livros.join(", ") : "Nenhum livro emprestado"}</td>
                                <td className="p-3">
                                    <button onClick={() => excluirLeitor(leitor.id_leitor)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
    );
}

export default ListaLeitores;