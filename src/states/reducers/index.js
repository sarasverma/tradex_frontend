import { combineReducers } from "redux";
import { productDetailReducer, productReducer } from "./productReducer";

const reducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
});

export default reducers;
