import Axios from "axios";
import API from "../../constants/API";

export const GET_PRODUCT = "GET_PRODUCT";

export const getProduct = () => async (dispatch) => {
  let res = null;
  try {
    res = await Axios.get(API.PRODUCT_GET);
  } catch (error) {
    alert(error);
  }
  return dispatch({
    type: GET_PRODUCT,
    payload: res.data.data.rows,
  });
};
