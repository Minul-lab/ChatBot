import { createContext, useContext, useState } from 'react';
import { doctors, patients } from '../data/mockData';

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
  const [error, setError] = useState(null);

  const login = (email, password, loginType) => {
    setError(null);
    
    // Find user based on login type
    const userList = loginType === 'doctor' ? doctors : patients;
    const user = userList.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError(`Invalid ${loginType} credentials`);
      throw new Error('Invalid credentials');
    }

    // Create user object for storage
    const userObj = {
      ...user,
      role: loginType,
      password: undefined // Don't store password in state/storage
    };

    setCurrentUser(userObj);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userObj));
    return userObj;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setError(null);
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
    <AuthContext.Provider value={{ currentUser, isAuthenticated, error, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
