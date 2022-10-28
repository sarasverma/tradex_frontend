import { ADD_TO_CART } from "../constants/cartConstant";
import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
