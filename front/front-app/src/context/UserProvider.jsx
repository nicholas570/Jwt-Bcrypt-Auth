import React, { createContext, useState } from 'react';

export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    user: JSON.parse(localStorage.getItem('User') || null),
  });

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};
