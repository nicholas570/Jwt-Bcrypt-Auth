import React, { createContext } from 'react';

import loginService from '../services/login';

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('Token') || null;

  const login = (history, state, setResult, setUserData) => {
    loginService(history, state, setResult, setUserData);
  };

  return (
    <authContext.Provider value={{ token, login }}>
      {children}
    </authContext.Provider>
  );
};
