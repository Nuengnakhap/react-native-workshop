import Axios from "axios";
import API from "../../constants/API";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_PROFILE = "USER_PROFILE";

export const setLogin = (profile) => (dispatch) => {
  Axios.defaults.headers = { authorization: `Bearer ${profile}` };
  dispatch({ type: USER_LOGIN, payload: profile });

  Axios.get(API.USER_PROFILE).then((res) =>
    dispatch({ type: USER_PROFILE, payload: res.data.data })
  );
};

export const setLogout = (profile) => (dispatch) => {
  Axios.defaults.headers = { authorization: "" };
  dispatch({ type: USER_LOGOUT });
};
