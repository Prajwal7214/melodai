import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('melodai_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
         console.error("Failed to parse user from local storage.");
      }
    }
  }, []);

  const login = (email) => {
    // Simulated login, extracting initials from email
    const namePart = email.split('@')[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const initials = namePart.slice(0, 2).toUpperCase();
    
    const userData = { email, name, initials };
    setUser(userData);
    localStorage.setItem('melodai_user', JSON.stringify(userData));
  };

  const signup = (email, name) => {
    const initials = name ? name.substring(0, 2).toUpperCase() : email.substring(0, 2).toUpperCase();
    const userData = { email, name: name || email.split('@')[0], initials };
    setUser(userData);
    localStorage.setItem('melodai_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('melodai_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
