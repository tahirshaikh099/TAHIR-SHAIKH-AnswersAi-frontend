import React, { createContext, useState, useEffect } from 'react';
import api from '../service/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token) {
      setAuth({ token, userId });
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('userId', response.data.data.userId);
    setAuth({ token: response.data.data.token, userId: response.data.data.userId });
  };

  const refreshToken = async (token) => {
    try {
      const response = await api.post('/auth/refresh', { token });
      localStorage.setItem('token', response.data.data.token);
      setAuth((prevAuth) => ({ ...prevAuth, token: response.data.data.token }));
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
