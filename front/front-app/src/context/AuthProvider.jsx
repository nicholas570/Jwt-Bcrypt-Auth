import React, { createContext } from 'react';

import registerService from '../services/register';
import loginService from '../services/login';
import logoutService from '../services/logout';
import accessPrivateRoutesService from '../services/accessPrivateRoutes';

export const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('Token') || null;

  const register = (history, state, setResult, setUserData) =>
    registerService(history, state, setResult, setUserData);

  const login = (history, state, setResult, setUserData) =>
    loginService(history, state, setResult, setUserData);

  const logout = (history) => logoutService(history);

  const accessPrivateRoutes = (history, userData, setIsValid) =>
    accessPrivateRoutesService(history, userData, setIsValid);

  return (
    <authContext.Provider
      value={{ token, register, login, logout, accessPrivateRoutes }}>
      {children}
    </authContext.Provider>
  );
};
