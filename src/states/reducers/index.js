import { combineReducers } from "redux";
import { productDetailReducer, productReducer } from "./productReducer";
import { profileReducer, userReducer } from "./userReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
});

export default reducers;
