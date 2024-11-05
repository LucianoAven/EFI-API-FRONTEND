import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
    const navigate = useNavigate()
    
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:4000/api/users/login", {
                email,
                password,
            });
            const token = response.data.token;
            const role  = response.data.role;
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", role);
            const decodedUser = parseJwt(token);
            console.log(decodedUser)
            localStorage.setItem("user", decodedUser); 
            setUser(decodedUser);
            setUserRole(role)
            navigate("/")
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales incorrectas");
        }
    };

    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        setUserRole(null);
        setUser(null);
    };

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        const storedUser = localStorage.getItem("user");
        if (storedRole) setUserRole(storedRole);
        if (storedUser) setUser(storedUser)
    }, []);


    
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = parseJwt(token);
            setUser(decodedUser);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
