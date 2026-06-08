import AcessoNegado from "../../pages/AcessoNegado";

function RotaPrivada({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <AcessoNegado />;
    }

    return children;
}

export default RotaPrivada;