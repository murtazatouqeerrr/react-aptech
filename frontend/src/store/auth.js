import { useContext, createContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
        const storeTokenInLS  =  (serverToken) => {
            return localStorage.setItem("token", serverToken);
        }
        return (
            <AuthContext.Provider value={{storeTokenInLS}}>
                {children}
            </AuthContext.Provider>
        )
    }
        export const useAuth = () => {
            const AuthContextValue = useContext(AuthContext);
            if(!AuthContextValue){
                throw new Error("useAuth must be used within an AuthProvider");
            }
            return AuthContextValue;
        }