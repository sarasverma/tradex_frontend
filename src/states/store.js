import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

export const store = configureStore(
  { reducer: reducers },
  {},
  applyMiddleware(thunk)
);
