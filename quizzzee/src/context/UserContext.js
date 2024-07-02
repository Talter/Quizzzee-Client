import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedData = localStorage.getItem('isLoggedIn');
    return storedData ? JSON.parse(storedData) : false;
  });
  const [userId, setUserId] = useState(() => {
    const storedData = localStorage.getItem('userId');
    return storedData ? JSON.parse(storedData) : '';
  });
  const [favorites, setFavorites] = useState(() => {
    const storedData = localStorage.getItem('favorites');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [token, setToken] = useState(() => {
    const storedData = localStorage.getItem('token');
    return storedData ? JSON.parse(storedData) : '';
  });
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }
    if (userId !== '') {
      localStorage.setItem('userId', JSON.stringify(userId));
    }
    if (favorites.length !== 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    if(token !== ''){
      localStorage.setItem('token', JSON.stringify(token));
    }
  }, [isLoggedIn, userId, favorites, token]);
  

  const login = (id, token) => {
    setIsLoggedIn(true);
    setUserId(id);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setFavorites([]);
    setToken('')
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
      value={{
        userId,
        isLoggedIn,
        favorites,
        token,
        login,
        logout,
        setUserId,
        addFavorites,
        updateFavorites,
        removeFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
