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
    isAdmin: '',
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

  const loginHandler = (username, email, token, isAdmin) => {
    //  saves the credentials in local storage and in the state
    // localStorage.setItem('token', token);

    // console.log(username, email, token, isAdmin);

    localStorage.setItem(
      'nappi-user-auth',
      JSON.stringify({
        username,
        token,
        email,
        isAdmin,
      })
    );

    setAuthState({
      username,
      token,
      email,
      isAdmin,
    });
  };

  const logoutHandler = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('nappi-user-auth');
    setAuthState({
      username: '',
      email: '',
      token: '',
      isAdmin: '',
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
