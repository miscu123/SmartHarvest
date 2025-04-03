import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [user, setUser] = useState(null);

 const login = (userData) => {
   setIsAuthenticated(true);
   setUser(userData);
 };

 const logout = () => {
   setIsAuthenticated(false);
   setUser(null);
 };

 return (
   <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
     {children}
   </AuthContext.Provider>
 );
};

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (context === undefined) {
   throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
};