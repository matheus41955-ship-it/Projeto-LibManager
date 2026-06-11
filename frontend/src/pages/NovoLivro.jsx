import Menu from "../assets/components/Menu";
import { useEffect, useState } from "react";
import api from "../api/api";

function NovoLivro() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [ano, setAno] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(() => {
        async function buscarCategorias() { //Função pra pegar as categorias do banco
            try {
                const resposta = await api.get("/livros/categorias");
                setCategorias(resposta.data); // Resposta em array
            } catch (erro) {
                console.error("Erro ao buscar as categorias", erro);
            }
        }

        buscarCategorias();
    }, []);

    async function cadastrarLivro(e) {
        e.preventDefault();
        setErro(""); // Limpar o erro antes de validar

        try {
            const resposta = await api.post("/livros/addLivro", {
                titulo,
                autor,
                editora,
                id_categoria: categoria,
                ano_publicacao: ano,
            });

            setErro("");
            console.log(resposta.data);
            setSucesso(resposta.data.mensagem);
            setTimeout(() => {
                setSucesso("");
            }, 2500) // 2,5s pra mensagem sumir

        } catch (erro) {
            const mensagem = erro.response?.data?.erro || "Erro ao cadastrar livro";

            setErro(mensagem);
            setSucesso(""); // limpa o sucesso
        }
    }

    return (
        <div className="min-h-screen flex">
            <Menu />

            <main className="bg-gray-900 flex-1 p-16 text-white flex items-center justify-center">
                <div className="bg-gray-800 rounded-2xl p-10 w-full max-w-4xl">
                    <h1 className="bg-linear-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent text-4xl font-bold mb-15">CADASTRAR NOVO LIVRO</h1>

                    <div className="flex justify-center">
                        {/* Mensagens de erro e sucesso */}
                        {erro && <p className="text-red-500 mt-4">{erro}</p>}
                        {sucesso && <p className="text-green-600 mt-4">{sucesso}</p>}
                    </div>
                    <form onSubmit={cadastrarLivro}>

                        <label htmlFor="titulo" className="block font-medium text-slate-200 mb-1">Título do livro:</label>
                        <input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} name="livro" type="text" placeholder="Coloque o título do livro aqui" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />
                        
                        <label htmlFor="autor" className="block font-medium text-slate-200 mb-1">Autor:</label>
                        <input id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} name="autor" type="text" placeholder="Coloque o nome do autor" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />

                        <label htmlFor="autor" className="block font-medium text-slate-200 mb-1">Editora:</label>
                        <input id="autor" value={editora} onChange={(e) => setEditora(e.target.value)} name="autor" type="text" placeholder="Coloque o nome da editora" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />

                        <label htmlFor="categoria" className="block font-medium text-slate-200 mb-1">Categoria:</label>
                        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} name="categoria" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6">
                            <option value="" className="bg-slate-900">Selecionar Categoria</option>
                            
                            {categorias.map((cat) => (
                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="publicacao" className="block font-medium text-slate-200 mb-1">Ano de publicação:</label>
                        <input id="publicacao" value={ano} onChange={(e) => setAno(e.target.value)} name="publicacao" type="number" placeholder="Coloque o ano de publicação" required className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition mb-6" />
                        <div className="flex justify-center">
                        <button type="submit" className="bg-blue-600 px-4 py-2 rounded cursor-pointer transition-colors hover:bg-blue-700">Enviar</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default NovoLivro;