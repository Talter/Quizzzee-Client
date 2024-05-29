import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedData = localStorage.getItem('isLoggedIn');
    return storedData ? JSON.parse(storedData) : false 
  });
  const [userId, setUserId] = useState(() => {
    const storedData = localStorage.getItem('userId');
    return storedData ? JSON.parse(storedData) : "" 
  });

  const login = (id) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userId', JSON.stringify(id));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId("")
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ userId, isLoggedIn, login, logout, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
