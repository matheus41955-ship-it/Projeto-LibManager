import { NavLink } from 'react-router-dom'

function Menu() {
  const styleButton =
    'bg-transparent border-none outline-none p-0 m-0 cursor-pointer text-gray-400 transition-colors hover:text-pink-400 active:text-pink-400'

  return (
    <aside className="w-72 bg-gray-800 border-r-4 border-gray-600 min-h-screen">
      <nav className="flex flex-col gap-4 p-6">
        <h1 className="text-blue-500 text-4xl text-center mb-10">
          LibManager
        </h1>

        <NavLink to="/dashboard" className={styleButton}>
          Dashboard
        </NavLink>

        <NavLink to="/login" className={styleButton}>
          Login
        </NavLink>
      </nav>
    </aside>
  )
}

export default Menu