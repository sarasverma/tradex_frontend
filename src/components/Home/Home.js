import React, { useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layouts/MetaData";
import { getProduct } from "../../states/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.show("Some error occured !", { type: "error" });
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Tradex | Home" />
          <h2 className="heading">Featured products</h2>
          <div className="productsContainer">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
