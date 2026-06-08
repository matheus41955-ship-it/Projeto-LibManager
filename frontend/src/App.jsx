import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import RotaPrivada from './assets/components/RotaPrivada'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Cadastro from './pages/Cadastro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />}/>

        
        <Route path="/dashboard" element={ <RotaPrivada><Dashboard /></RotaPrivada>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
