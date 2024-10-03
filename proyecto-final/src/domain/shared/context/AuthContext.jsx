import {useMutation} from "@tanstack/react-query";
import { createContext, useState } from "react";
import { useLocation } from 'wouter';
import {login} from "../api/authApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [, navigate] = useLocation();

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: login,

        onError: (error) => {
            setErrorMessage(error.response?.data?.message || "Error desconocido");
        },
        onSuccess: (data) => {
            localStorage.setItem("authToken", data.token) || sessionStorage.setItem("authToken", data.token)
            navigate("/dashboard")
        }
    })

    const setUserData = (data) => {
        setUser(data);
    }
    return (
        <AuthContext.Provider value={{user, setUserData, loginMutation, errorMessage}}>
            {children}
        </AuthContext.Provider>
    )
}