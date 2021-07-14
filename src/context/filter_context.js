import React, { useEffect, useContext, useReducer } from 'react'
import filterReducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filteredProducts: [],
  allProducts: [],
  isGridView: true,
  sortType: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    isFreeShipping: false
  }
};

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  const {products} = useProductsContext();

  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {

    dispatch({type: LOAD_PRODUCTS, payload: products});

  }, [products]);

  useEffect(() => {

    // console.log(products, state.sortType, state.filters);

    /* first, filter the products... */
    dispatch({type: FILTER_PRODUCTS});

    /* ... then sort the products */
    dispatch({type: SORT_PRODUCTS});

  }, [products, state.sortType, state.filters]);

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };

  const setListView = () => {
    dispatch({type: SET_LISTVIEW});
  };

  const updateSort = (e) => {
    // const inputName = e.target.name;
    const inputSortType = e.target.value;

    // console.log('inputName:', inputName);
    // console.log('inputSortType:', inputSortType);

    dispatch({type: UPDATE_SORT, payload: inputSortType})
  };

  /* call this function whenever a filter changes */
  const updateFilters = (e) => {

    let inputName = e.target.name,
      inputValue = e.target.value;
    // console.log('element name:', inputName, '\nelement value:', inputValue);

    /* if the clicked element is a button, the filter value will be on the
      textContent attribute (could instead use the dataset attribute) */
    if (inputName === 'category') {
      inputValue = e.target.textContent;
    }
    else if (inputName === 'color') {
      inputValue = e.target.dataset.color;
    }
    /* values coming from a range input are strings so convert
      them to numeric values */
    else if (inputName === 'price') {
      inputValue = Number(inputValue);
    }
    /* for the free shipping checkbox */
    else if (inputName === 'isFreeShipping') {
      inputValue = e.target.checked;
    }

    dispatch({type: UPDATE_FILTERS, payload: {inputName, inputValue}});
  };

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS});
  };

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
