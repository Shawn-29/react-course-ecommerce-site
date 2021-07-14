import React, { useEffect, useContext, useReducer } from 'react'
import cartReducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  }
  else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  /* remember, all currencies are in cents */
  shippingFee: 534
};

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* add to cart */
  const addToCart = (id, color, amount, product) => {
    dispatch({type: ADD_TO_CART, payload: {
      id, color, amount, product
    }});
  };

  /* remove item */
  const removeItem = (id) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id});
  };

  /* increase or decrease cart item quantity */
  const toggleAmount = (id, value) => {

    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}});
  };

  /* clear cart */
  const clearCart = () => {
    dispatch({type: CLEAR_CART});
  };

  /* whenever the cart changes, update local storage */
  useEffect(() => {

    dispatch({type: COUNT_CART_TOTALS});

    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return <CartContext.Provider value={{
    ...state,
    addToCart,
    removeItem,
    toggleAmount,
    clearCart
  }}>
    {children}
  </CartContext.Provider>;
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
