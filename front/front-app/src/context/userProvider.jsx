import React, { createContext, useState } from 'react';

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    user: JSON.parse(localStorage.getItem('User')),
    token: localStorage.getItem('Token'),
    refreshToken: localStorage.getItem('RefreshToken'),
  });

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};
