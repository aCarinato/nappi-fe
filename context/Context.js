import React, { useContext, useState } from 'react';

const mainContext = React.createContext({
  //   productsData: [],
  //   setProductsData: () => {},
});

export function useMainContext() {
  return useContext(mainContext);
}

export function ContextProvider({ children }) {
  const [productsData, setProductsData] = useState([]);

  const value = {
    productsData,
    setProductsData,
  };

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>;
}
