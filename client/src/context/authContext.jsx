import { useEffect, useState, createContext, useContext } from "react";

// Create Auth Context
const AuthContext = createContext({
    auth: { user: null, token: "" },
    setAuth: () => {}
});

// AuthProvider Component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    useEffect(() => {
        try {
            const data = localStorage.getItem("auth");
            if (data) {
                const parsed = JSON.parse(data);
                setAuth({ user: parsed.user, token: parsed.token });
            }
        } catch (error) {
            console.error("Failed to load auth from localStorage", error);
            setAuth({ user: null, token: "" });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use Auth Context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
