import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import RotaPrivada from './assets/components/RotaPrivada'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

import Dashboard from './pages/Dashboard'
import NovoLivro from './pages/NovoLivro'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
