import { SET_CART, DELETE_CART_BY_ID, RESET_CART } from "../actions/cart";

const initialState = {
  cart: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      if (!state.cart[action.payload.id]) {
        state.cart[action.payload.id] = action.payload;
      } else {
        if (action.payload.outOfStock) {
          state.cart[action.payload.id].outOfStock = true;
          state.cart[action.payload.id].item = 0;
          state.cart[action.payload.id].total = 0;
        } else {
          state.cart[action.payload.id].outOfStock = false;
          state.cart[action.payload.id].item += action.payload.item;
          state.cart[action.payload.id].total += action.payload.total;
        }
      }
      return { cart: state.cart };
    case DELETE_CART_BY_ID:
      delete state.cart[action.payload];
      return { cart: state.cart };
    case RESET_CART:
      return { cart: {} };
    default:
      return state;
  }
};
