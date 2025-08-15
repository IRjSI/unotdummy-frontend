import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type AuthContextProps = {
    isLoggedIn: boolean;
    role: string;
    login: (role: string) => void;
    logout: () => void;
    fetchUser: () => void;
    user: any;
    loading: boolean;
};

type User = {
    id: string;
    name: string;
    avatar: string;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthContextProvider({ children }: { children: React.ReactElement }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const refreshToken = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/refresh-token`);
            const newToken = res.data?.token;
            if (newToken) {
                localStorage.setItem("token", newToken);
            }
            return !!res.data?.success;
        } catch (err) {
            console.error("Refresh failed:", err);
            await logout();
            return false;
        }
    };

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            
            if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            const refreshed = await refreshToken();
            if (refreshed) {
                originalRequest.headers['Authorization'] = 
                `Bearer ${localStorage.getItem('token')}`;
                return axios(originalRequest);
            }
            }
            return Promise.reject(error);
        }
    );

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`);
            setUser(res.data.data);
            setRole(res.data.data.role);
            setIsLoggedIn(true);
        } catch (err: any) {
            console.error("Fetch user failed:", err);
            setUser(null);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser()
    }, []);

    const login = (role: string) => {
        setRole(role);
        setIsLoggedIn(true);
        fetchUser();
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signout`);
        } catch (err) {
            console.error("Logout error:", err);
        }

        setIsLoggedIn(false);
        setRole("");
        setUser(null);

        navigate("/");
    };

    const value: AuthContextProps = {
        role,
        isLoggedIn,
        login,
        logout,
        fetchUser,
        user,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
