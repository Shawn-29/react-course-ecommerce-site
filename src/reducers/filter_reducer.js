import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  switch (action.type) {
    case LOAD_PRODUCTS:

      /* when products first load, set the default max product price
        to that of the most expensive product */
        const maxPrice = Math.max(...action.payload.map(product => product.price));

      return {
        ...state,
        /* create shallow-copied arrays of products so we can filter
          products yet still retain an array of all the products */
        allProducts: [...action.payload],

        filteredProducts: [...action.payload],
        filters: {
          /* retain other filter values */
          ...state.filters,

          maxPrice: maxPrice,
          price: maxPrice
        }
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        isGridView: true
      };
    case SET_LISTVIEW:
      return {
        ...state,
        isGridView: false
      };
    case UPDATE_SORT:
      return {
        ...state,
        sortType: action.payload
      };
    case SORT_PRODUCTS:

      const {sortType, filteredProducts} = state;

      // console.log('sortType:', sortType);

      const tempProducts = [...filteredProducts];

      switch (sortType) {
        case 'price-lowest':
          tempProducts.sort((a, b) => {

            if (a.price < b.price) {
              /* a will be placed before b */
              return -1;
            }
            if (a.price > b.price) {
              /* a will be placed after b */
              return 1;
            }
            return 0;
          });
  
          /* same as above code */
          // tempProducts.sort((a, b) => a.price - b.price);
        break;
        case 'price-highest':
          tempProducts.sort((a, b) => b.price - a.price);
        break;
        case 'name-a':
          /* String.prototype.localeCompare compares two strings and accepts
            optional locale and options arguments for further customization */
          tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
        case 'name-z':
          tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      }

      return {
        ...state,
        filteredProducts: tempProducts
      };

    case UPDATE_FILTERS:
      const {inputName, inputValue} = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          /* update a filter category;
            note the dynamic property access with the [] */
          [inputName]: inputValue
        }
      };

    case FILTER_PRODUCTS:

      const {allProducts} = state;

      /* get filter values */
      const {
        text,
        category,
        company,
        color,
        price,
        isFreeShipping
      } = state.filters;

      /* before filtering, get all available products */
      let prodsToFilter = [...state.allProducts];

      /* filter products by text */
      if (text) {
        prodsToFilter = prodsToFilter.filter((product) => {
          return product.name.toLowerCase().startsWith(text.toLowerCase());
        });
      }

      /* filter products by category */
      if (category !== 'all') {
        prodsToFilter = prodsToFilter.filter((product) => {
          return product.category === category;
        });
      }

      /* filter products by company */
      if (company !== 'all') {
        prodsToFilter = prodsToFilter.filter((product) => {
          return product.company === company;
        });
      }

      /* filter products by color */
      if (color !== 'all') {
        prodsToFilter = prodsToFilter.filter((product) => {
          return product.colors.includes(color);
        });
      }

      /* filter by price */
      prodsToFilter = prodsToFilter.filter((product) => {
        return product.price <= price;
      });

      /* filter by free shipping */
      if (isFreeShipping) {
        prodsToFilter = prodsToFilter.filter((product) => {
          return product.shipping === isFreeShipping;
        });
      }

      return {
        ...state,
        filteredProducts: prodsToFilter
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          /* retain price amounts */
          minPrice: state.filters.minPrice,
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,

          /* reset rest of filters */
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          isFreeShipping: false
        }
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer;