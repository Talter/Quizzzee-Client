import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const setGlobalExpiry = (ttl) => {
  const now = new Date();
  localStorage.setItem('global_expiry', now.getTime() + ttl);
};

const isExpired = () => {
  const expiryStr = localStorage.getItem('global_expiry');
  if (!expiryStr) {
    return true;
  }
  const now = new Date();
  const expiry = parseInt(expiryStr, 10);
  if (now.getTime() > expiry) {
    localStorage.clear();
    return true;
  }
  return false;
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  const itemStr = localStorage.getItem(key);
  return itemStr ? JSON.parse(itemStr) : null;
};

export const UserProvider = ({ children }) => {
  // const ttlShort = 1 * 60 * 60 * 1000;
  const ttlShort = 0;
  const ttlLong = 3 * 24 * 60 * 60 * 1000;

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !isExpired() && getItem('isLoggedIn') !== null ? getItem('isLoggedIn') : false;
  });
  const [userId, setUserId] = useState(() => {
    return !isExpired() && getItem('userId') !== null ? getItem('userId') : '';
  });
  const [favorites, setFavorites] = useState(() => {
    return !isExpired() && getItem('favorites') !== null ? getItem('favorites') : [];
  });
  const [token, setToken] = useState(() => {
    return !isExpired() && getItem('token') !== null ? getItem('token') : '';
  });
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setItem('isLoggedIn', isLoggedIn);
    }
    if (userId !== '') {
      setItem('userId', userId);
    }
    if (favorites.length !== 0) {
      setItem('favorites', favorites);
    }
    if (token !== '') {
      setItem('token', token);
    }
    if (isLoggedIn || userId !== '' || favorites.length !== 0 || token !== '') {
      const ttl = remember ? ttlLong : ttlShort;
      setGlobalExpiry(ttl);
    }
  }, [isLoggedIn, userId, favorites, token, remember]);

  const login = (id, token, remember) => {
    setIsLoggedIn(true);
    setUserId(id);
    setToken(token);
    setRemember(remember);
    const ttl = remember ? ttlLong : ttlShort;
    setGlobalExpiry(ttl);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setFavorites([]);
    setToken('');
    setRemember(false);
    localStorage.clear();
  };

  const addFavorites = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, id];
      setItem('favorites', newFavorites);
      const ttl = remember ? ttlLong : ttlShort;
      setGlobalExpiry(ttl);
      return newFavorites;
    });
  };

  const removeFavorites = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((item) => item !== id);
      setItem('favorites', newFavorites);
      const ttl = remember ? ttlLong : ttlShort;
      setGlobalExpiry(ttl);
      return newFavorites;
    });
  };

  const updateFavorites = (arrayOfFavorites) => {
    setFavorites(arrayOfFavorites);
    setItem('favorites', arrayOfFavorites);
    const ttl = remember ? ttlLong : ttlShort;
    setGlobalExpiry(ttl);
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
        addFavorites,
        updateFavorites,
        removeFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
