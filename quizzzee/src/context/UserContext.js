import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedData = localStorage.getItem('isLoggedIn');
    return storedData ? JSON.parse(storedData) : false 
  });
  const [userEmail, setUserEmail] = useState(() => {
    const storedData = localStorage.getItem('userEmail');
    return storedData ? JSON.parse(storedData) : "" 
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('userEmail', JSON.stringify(userEmail));
  }, [userEmail]);


  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ userEmail, isLoggedIn, login, logout, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};
