import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Cargando...</div>; 
    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
