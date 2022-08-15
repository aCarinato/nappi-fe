import React, { useContext, useEffect, useState } from 'react';

const mainContext = React.createContext({
  //   productsData: [],
  //   setProductsData: () => {},
  authState: {},
  adminState: {},
  login: () => {},
  logout: () => {},
  loginAdmin: () => {},
  logoutAdmin: () => {},
});

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  const [productsData, setProductsData] = useState([]);

  // USER AUTHENTICATION
  const [authState, setAuthState] = useState({
    username: '',
    email: '',
    token: '',
  });

  // ADMIN AUTHENTICATION
  const [adminState, setAdminState] = useState({
    isAdmin: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthState(JSON.parse(localStorage.getItem('nappi-user-auth')));
      setAdminState(JSON.parse(localStorage.getItem('nappi-admin-auth')));
    }
  }, []);

  // USER AUTH

  const loginHandler = (username, email, token) => {
    //  saves the credentials in local storage and in the state
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

  // ADMIN AUTH

  const loginAdminHandler = () => {
    localStorage.setItem('nappi-admin-auth', JSON.stringify({ isAdmin: true }));
    setAdminState({ isAdmin: true });
  };

  const logoutAdminHandler = () => {
    localStorage.removeItem('nappi-admin-auth');
    setAdminState({ isAdmin: false });
  };

  const value = {
    productsData,
    setProductsData,
    // AUTH
    authState: authState,
    adminState: adminState,
    login: loginHandler,
    logout: logoutHandler,
    loginAdmin: loginAdminHandler,
    logoutAdmin: logoutAdminHandler,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
