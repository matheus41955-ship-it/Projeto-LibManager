import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const styleButton ='bg-transparent border-none outline-none p-0 m-0 cursor-pointer transition-colors';

  function Logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="w-72 bg-gray-800 border-r-4 border-gray-600 min-h-screen">
      <nav className="flex flex-col gap-4 p-6">
        <h1 className="text-blue-500 text-4xl text-center mb-10">LibManager</h1>

        <NavLink to="/dashboard" className={({ isActive }) => `${styleButton} ${isActive ? "text-pink-400" : "text-gray-400 hover:text-pink-400"}`}>Dashboard</NavLink>
        <NavLink to="/novo-livro" className={({ isActive }) => `${styleButton} ${isActive ? "text-pink-400" : "text-gray-400 hover:text-pink-400"}`}>Novo Livro</NavLink>
        <NavLink to="/leitores" className={({ isActive }) => `${styleButton} ${isActive ? "text-pink-400" : "text-gray-400 hover:text-pink-400"}`}>Gerenciar Leitores</NavLink>

        <button onClick={Logout} className="rounded-2xl bg-blue-600 text-white shadow-2xl transition-all cursor-pointer hover:bg-blue-700">Sair</button>
      </nav>
    </aside>
  )
}

export default Menu