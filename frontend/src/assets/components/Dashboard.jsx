import { useState, useEffect } from 'react'
import Menu from './Menu'
import api from '../../api/api'

function Dashboard() {
  const [livros, setLivros] = useState([]);
  useEffect(() => {
    async function buscarLivros() {
      const resposta = await api.get('/livros');

      setLivros(resposta.data);
    }
    buscarLivros()
  }, []);


  return (
    <div className="min-h-screen flex">
      <Menu /> {/* Sidebar em componente pra gnt utilizar em outras paginas */}
      <main className='bg-gray-900 flex-1 p-16 text-white'>
        <h1 className='bg-linear-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent text-4xl font-bold mb-20'>DASHBOARD DO BIBLIOTECARIO</h1>
        <div className="bg-gray-800 rounded border-t-6 border-green-600 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <p className='font-bold text-xl mb-0'>Acervo de Livros</p>
              <p className='font-bold text-left md:text-right mb-0'>{livros.length} livros cadastrados</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-center">
              <thead>
                <tr className='bg-gray-700 border-b-3 border-gray-950 text-blue-400'>
                  <th className='p-3'>Titulo</th>
                  <th className='p-3'>Autor</th>
                  <th className='p-3'>Ano</th>
                  <th className='p-3'>Categoria</th>
                  <th className='p-3'>Ação</th>
                </tr>
              </thead>
              <tbody className='text-gray-300'>
                {livros.map((livro) => (
                  <tr key={livro.id_livro}>
                    <td className='p-3'>{livro.titulo}</td>
                    <td className='p-3'>{livro.autor}</td>
                    <td className='p-3'>{livro.ano_publicacao}</td>
                    <td className='p-3'>{livro.categoria}</td>
                    <td className={`p-3 font-bold ${
                      livro.disponibilidade === "Disponível" ? "text-green-500" : "text-red-500"
                    }`}>{livro.disponibilidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
