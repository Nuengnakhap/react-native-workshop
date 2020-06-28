import { PURGE } from "redux-persist";

const initialState = {
  cart: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      if (!state.cart[action.payload.id]) {
        state.cart[action.payload.id] = action.payload;
      } else {
        state.cart[action.payload.id].item += action.payload.item;
        state.cart[action.payload.id].total += action.payload.total;
      }
      return { ...state, cart: state.cart };

    case PURGE:
      return { ...initialState };
    case "RESET_CART":
      return { ...initialState };
    default:
      return state;
  }
};
