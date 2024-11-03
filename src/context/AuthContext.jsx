import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("");

    
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:4000/api/users/login", {
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            const decodedUser = parseJwt(token); 
            setUser(decodedUser);
            setUserRole(response.data.role)
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales incorrectas");
        }
    };

    
    const logout = () => {
        localStorage.removeItem("token");
        setUserRole("")
        setUser(null);
    };

    
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
