import { setLogin, setLogout } from "./user";
import { setCart, deleteCart, resetCart } from "./cart";
import { getProduct } from "./product";

export const Actions = {
  // USER ACTIONS
  setLogin,
  setLogout,

  // CART ACTIONS
  setCart,
  deleteCart,
  resetCart,

  // PRODUCT ACTIONS
  getProduct,
};
