import React, { useContext, createContext, useState, useEffect } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
  };

  
  const getTokenFromLS = () => {
    return localStorage.getItem("token");
  };

  
  const userAuthentication = async () => {
    const token = getTokenFromLS();
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8000/user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.msg);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  
  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ storeTokenInLS, user, setUser, userAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};