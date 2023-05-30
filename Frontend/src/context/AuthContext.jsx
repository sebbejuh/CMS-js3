import { createContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    //gets token from localstorage and stores it in localStorageObject
    const localStorageObject = localStorage.getItem("token");
    //checks if token is not an "undefined" string (it happens if you log in with incorrect user or password)
    const initialToken = localStorageObject != "undefined" ? JSON.parse(localStorageObject) : null;
    //define state and set function & make sure token exists and isn't null
    const [token, setToken] = useState(initialToken?.token || null);
  
    const updateToken = (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", JSON.stringify(newToken));
    };
    return (
      <AuthContext.Provider value={{ token, updateToken }}>
        {children}
      </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };