import { combineReducers } from "redux";
import { productDetailReducer, productReducer } from "./productReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./userReducer";
import { cartReducer } from "../reducers/cartReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

export default reducers;
