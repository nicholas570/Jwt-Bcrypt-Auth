import React, { createContext, useState } from 'react';

import registerService from '../services/register';
import loginService from '../services/login';
import logoutService from '../services/logout';
import accessPrivateRoutesService from '../services/accessPrivateRoutes';

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('Token') || null);

  const register = (history, state, setToken, setResult, setUserData) =>
    registerService(history, state, setToken, setResult, setUserData);

  const login = (history, state, setToken, setResult, setUserData) =>
    loginService(history, state, setToken, setResult, setUserData);

  const logout = (history) => logoutService(history);

  const accessPrivateRoutes = (history, token, userData, setIsValid) =>
    accessPrivateRoutesService(history, token, userData, setIsValid);

  return (
    <authContext.Provider
      value={{ token, setToken, register, login, logout, accessPrivateRoutes }}>
      {children}
    </authContext.Provider>
  );
};
