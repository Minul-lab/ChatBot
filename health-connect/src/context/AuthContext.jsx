import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
