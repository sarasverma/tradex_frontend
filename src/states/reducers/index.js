import { combineReducers } from "redux";
import {
  newReviewReducer,
  productDetailReducer,
  productReducer,
} from "./productReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./userReducer";
import { cartReducer } from "../reducers/cartReducer";
import {
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./orderReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

export default reducers;
