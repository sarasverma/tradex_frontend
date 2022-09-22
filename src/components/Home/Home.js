import React, { useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layouts/MetaData";
import { getProduct } from "../../states/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct);
  }, [dispatch]);

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
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
