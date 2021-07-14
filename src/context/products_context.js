import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import productsReducer from '../reducers/products_reducer'
import { products_url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  isLoading: false,
  isError: false,
  products: [],
  featuredProducts: [],
  
  /* single product properties */
  singleProduct: {}
};

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {

  const [state, dispatch] = useReducer(productsReducer, initialState);

  const openSidebar = () => {
    dispatch({type: SIDEBAR_OPEN});
  };

  const closeSidebar = () => {
    dispatch({type: SIDEBAR_CLOSE});
  };

  const fetchProducts = async (url) => {

    /* begin loading */
    dispatch({type: GET_PRODUCTS_BEGIN});

    try {
      /* axios already converts the response from JSON to a JavaScript object */
      const response = await axios.get(url);
      // console.log('response:', response);
      
      const products = response.data;
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: products});
      
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR});
    }

  };

  const fetchSingleProduct = async (url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});

    try {
      const response = await axios.get(url);

      const singleProduct = response.data;

      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct});

    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    }
  };

  useEffect(() => {
    fetchProducts(products_url);
    
  }, []);

  return (
    <ProductsContext.Provider value={{
      ...state,
      openSidebar,
      closeSidebar,
      fetchSingleProduct
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
