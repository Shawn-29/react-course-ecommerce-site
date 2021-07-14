import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  switch (action.type) {
    case ADD_TO_CART:

      const {id, color, amount, product} = action.payload;

      /*
        products in the cart have their id equal to their original
        id plus their chosen color (to differentiate products in the
        cart that are the same product type but have a different color);
        
        check if an identical product exists in the cart
      */
      const index = state.cart.findIndex((product) => {
        return product.id === id + color;
      });

      if (index > -1) {

        /* get a reference to the cart item whose amount we are updating */
        const foundItem = state.cart[index];

        foundItem.amount = Math.min(foundItem.amount + amount, foundItem.stock);

        /* remember, the state variable provided by this function is the previous state,
          so we must return a new state for the product amount to be updated; cart is
          also destructured in case any useEffect are invoked when the cart changes */
        return {...state, cart: [...state.cart]};
      }

      /* a product of this type and color does not exist in
        the cart so construct a new product */
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        stock: product.stock /* how many of this product is in stock */
      };

      return {
        ...state,
        cart: [
          ...state.cart,
          newItem
        ]
      };

      case REMOVE_CART_ITEM:
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload)
        };

      case CLEAR_CART:
        return {
          ...state,
          cart: []
        };

      case TOGGLE_CART_ITEM_AMOUNT:

        /* get the cart item whose quantity we are adjusting */
        const foundItem = state.cart.find(item => item.id === action.payload.id);

        if (foundItem) {
          // console.log('foundItem:', foundItem);

          if (action.payload.value === 'increase') {
            foundItem.amount = Math.min(foundItem.amount + 1, foundItem.stock);
          }
          else if (action.payload.value === 'decrease') {
            foundItem.amount = Math.max(foundItem.amount - 1, 1);
          }

          return {
            ...state,
            cart: [...state.cart]
          };
        }

        return state;

      case COUNT_CART_TOTALS:
        const {totalItems, totalAmount} = state.cart.reduce((accum, cartItem) => {

          accum.totalItems += cartItem.amount;

          accum.totalAmount += cartItem.price * cartItem.amount;

          return accum;
        }, {
          totalItems: 0,
          totalAmount: 0
        });

        return {
          ...state,
          totalItems,
          totalAmount
        };
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
