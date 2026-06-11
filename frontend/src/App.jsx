import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import RotaPrivada from './assets/components/RotaPrivada'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

import Dashboard from './pages/Dashboard'
import NovoLivro from './pages/NovoLivro'
import ListaLeitores from './pages/ListaLeitores'
import AdicionarLeitor from './pages/AdicionarLeitor'
import AtribuirEmprestimo from './pages/AtribuirEmprestimo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Telas de login e cadastro */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />}/>

        {/* Telas após o usuário estar autenticado */}
        <Route path="/dashboard" element={ <RotaPrivada><Dashboard /></RotaPrivada>} />
        <Route path='/novo-livro' element={ <RotaPrivada><NovoLivro /></RotaPrivada> } />
        <Route path='/leitores' element={ <RotaPrivada><ListaLeitores /></RotaPrivada> } />
        <Route path='/novo-leitor' element={ <RotaPrivada><AdicionarLeitor /></RotaPrivada> } />
        <Route path='/emprestimo' element={ <RotaPrivada><AtribuirEmprestimo /></RotaPrivada> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
