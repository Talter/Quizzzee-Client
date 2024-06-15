import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedData = localStorage.getItem('isLoggedIn');
    return storedData ? JSON.parse(storedData) : false;
  });
  const [userId, setUserId] = useState(() => {
    const storedData = localStorage.getItem('userId');
    return storedData ? JSON.parse(storedData) : "";
  });
  const [favorites, setFavorites] = useState(() => {
    const storedData = localStorage.getItem('favorites');
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    localStorage.setItem('userId', JSON.stringify(userId));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [isLoggedIn, userId, favorites]);

  const login = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId("");
    localStorage.clear();
  };

  const addFavorites = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavorites = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((item) => item !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const updateFavorites = (arrayOfFavorites) => {
    setFavorites(arrayOfFavorites);
    localStorage.setItem('favorites', JSON.stringify(arrayOfFavorites));
  };

  return (
    <UserContext.Provider
      value={{ userId, isLoggedIn, favorites, login, logout, setUserId, addFavorites, updateFavorites, removeFavorites }}
    >
      {children}
    </UserContext.Provider>
  );
};
