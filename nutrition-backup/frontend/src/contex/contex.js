import React, { createContext, useContext, useEffect, useReducer, useState, } from "react";
import { cartReducer } from "./Reducers";
import productsData from '../pages/productlist.json';



const Cart = createContext();

const getCartData = () => {
  let newCartData = localStorage.getItem("cartData");
  if (newCartData === []) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};


const initialState = {
  cart: getCartData(),
}

const Context = ({ children }) => {

  
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <Cart.Provider value={{ state, dispatch,  }}>

      {children}

    </Cart.Provider>
  );
};



export const CartState = () => {

  return useContext(Cart);

};

export default Context;
