import { GET_PRODUCT } from "../actions/product";

const initialState = {
  products: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT:
      return { ...state, products: payload };
    default:
      return state;
  }
};
