import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const localStorageObject = localStorage.getItem("token");//gets token from localstorage and stores it in localStorageObject
    const initialToken = JSON.parse(localStorageObject);
    const [token, setToken] = useState(initialToken || null);

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(token));
    }, [token]);

    return <AuthContext.Provider value={{ token, updateToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };