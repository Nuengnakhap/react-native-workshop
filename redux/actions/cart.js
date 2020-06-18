export const SET_CART = "SET_CART";
export const DELETE_CART_BY_ID = "DELETE_CART_BY_ID";
export const RESET_CART = "RESET_CART";

export const setCart = (payload) => (dispatch) => {
  return dispatch({
    type: SET_CART,
    payload,
  });
};

export const deleteCart = (index) => (dispatch) => {
  return dispatch({
    type: DELETE_CART_BY_ID,
    payload: index,
  });
};

export const resetCart = (payload) => (dispatch) => {
  return dispatch({
    type: RESET_CART,
    payload,
  });
};
