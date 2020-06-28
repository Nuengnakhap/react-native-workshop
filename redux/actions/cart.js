export const setCart = (payload) => (dispatch) => {
  return dispatch({
    type: "SET_CART",
    payload,
  });
};

export const deleteCart = (index) => (dispatch) => {
  return dispatch({
    type: "DELETE_CART_BY_ID",
    payload: index,
  });
};

export const resetCart = () => (dispatch) => {
  return dispatch({
    type: "RESET_CART",
  });
};
