import { useState, useReducer, createContext } from 'react';

export const Store = createContext();

const initialState = {
  cart: { 
    cartItem: localStorage.getItem('cartItems') //information products user select
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],

    shippingAddress: localStorage.getItem('shippingAddress') //information user fill
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : [],

    fullBox: false,
  }
};
function toCart(state, action) {
  switch (action.type) {

    // add product to cart
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find((item) => item._id === newItem._id);
      const cartItem = existItem 
      ? state.cart.cartItem.map((item) =>
         item._id === existItem._id ? newItem : item
      ) : [...state.cart.cartItem, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItem))

      return {...state, cart: {...state.cart, cartItem}}

      //delete product in file CartScreen
    case 'CART_DELETE_ITEM': {
      const cartItem = state.cart.cartItem.filter((item) => item._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(cartItem))
      
      return {...state, cart: {...state.cart, cartItem}}
    }
    //save information shipping address
    case 'SHIPPING_ADDRESS': 
      return {...state, cart: {...state.cart , shippingAddress: action.payload}};
    //clear cart
    case 'CLEAR_CART':
      return { ...state, cart: { ...state.cart, cartItem: [] } };
    default:
      return state;
  }
}

export function StoreProvider({children}) {
  const [state, dispatch] = useReducer(toCart, initialState);
  const value = { state,dispatch };
  //
  return <Store.Provider value={ value }>{children}</Store.Provider>;
}
