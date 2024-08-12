import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from '../actions/cartActions';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {

  console.log('cartReducer state:', state);
  console.log('cartReducer action:', action.type);
  switch (action.type) {
    case ADD_TO_CART:
      console.log('Adding product to cart:', action.payload);
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }], // Add product with quantity 1
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
