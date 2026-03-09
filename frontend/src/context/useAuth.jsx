import { createContext, use, useContext, useEffect, useState } from "react";
import { is_authenticated, login, register } from "../api/api";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading , setLoading] = useState(true);
    const nav = useNavigate();

    const get_authentication_status = async () => {
        try {
            const success =  await is_authenticated();
            setIsAuthenticated(success);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    const login_user = async (username, password) => {
        const success = await login(username, password);
        if(success) {
            setIsAuthenticated(true);
            console.log("Login successful");
            nav("/");
        }

    }

    const register_user = async (username, password, email) => {
        try {
            const success = await register(username, password, email);
            if(success) {
            nav("/login");
        }
        } catch (error) {
            console.error("Registration failed:", error);
            return;
        }
        
        
    }

    useEffect(() => {
        get_authentication_status();
    },[])

    return (
        <AuthContext.Provider value={{isAuthenticated, loading, login_user, register_user}}>
            {children}
        </AuthContext.Provider>
        
    )
}

export const useAuth = () => useContext(AuthContext);