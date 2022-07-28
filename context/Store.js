import { createContext, useEffect, useReducer, useState } from 'react';

export const Store = createContext();

const initialState = {
  cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};
// The next doesn't work
// const initialState = {
//   cart: localStorage.getItem('nappi-cart')
//     ? JSON.parse(localStorage.getItem('nappi-cart'))
//     : { cartItems: [] },
// };

function reducer(state, action) {
  switch (action.type) {
    case 'CART_LOCALSTORAGE': {
      // const cartItems = action.payload;
      // return { ...state, cart: { ...cartItems } };
      const cartData = action.payload;
      return { ...state, cart: cartData };
    }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      //   if (typeof window !== undefined)
      localStorage.setItem(
        'nappi-cart',
        JSON.stringify({ ...state.cart, cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      //   if (typeof window !== undefined)
      localStorage.setItem(
        'nappi-cart',
        JSON.stringify({ ...state.cart, cartItems })
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_RESET': {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    }
    case 'CART_CLEAR_ITEMS': {
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    // const storedCart = JSON.parse(localStorage.getItem('nappi-cart'));

    const storedData = JSON.parse(localStorage.getItem('nappi-cart'));

    // if (storedCart !== null) {
    // dispatch({ type: 'CART_LOCALSTORAGE', payload: storedCart });
    if (storedData !== null) {
      dispatch({ type: 'CART_LOCALSTORAGE', payload: storedData });
    }
  }, []);

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
