import { USER_LOGIN, USER_LOGOUT, USER_PROFILE } from "../actions/user";

const initialState = {
  isLogin: false,
  profile: null,
  token: null,
};

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return { ...state, token: payload, isLogin: true };

    case USER_LOGOUT:
      return { ...initialState };

    case USER_PROFILE:
      return { ...state, profile: payload };

    default:
      return state;
  }
};
