import { combineReducers } from "redux";
import { productDetailReducer, productReducer } from "./productReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
});

export default reducers;
