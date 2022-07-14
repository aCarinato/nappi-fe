import React, { useContext, useEffect, useState } from 'react';

const mainContext = React.createContext({
  //   productsData: [],
  //   setProductsData: () => {},
  authState: {},
  login: () => {},
  logout: () => {},
});

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  const [productsData, setProductsData] = useState([]);

  // AUTHENTICATION
  const [authState, setAuthState] = useState({
    username: '',
    email: '',
    token: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthState(JSON.parse(localStorage.getItem('nappi-user-auth')));
    }
  }, []);

  const loginHandler = (username, email, token) => {
    // localStorage.setItem('token', token);

    localStorage.setItem(
      'nappi-user-auth',
      JSON.stringify({
        username,
        token,
        email,
      })
    );

    setAuthState({
      username,
      token,
      email,
    });
  };

  const logoutHandler = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('nappi-user-auth');
    setAuthState({
      username: '',
      email: '',
      token: '',
    });
  };

  const value = {
    productsData,
    setProductsData,
    // AUTH
    authState: authState,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
