import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layouts/MetaData";
import { clearErrors, getProduct } from "../../states/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filterProductsCount,
  } = useSelector((state) => state.products);

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 20000]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filterProductsCount;

  let { keyword } = useParams();
  useEffect(() => {
    if (error) {
      alert.show(error, { type: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, error, alert, keyword, currentPage, price]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Tradex | ${keyword ? "Search" : "Home"}`} />
          <h2 className="heading">Featured products</h2>
          <div className="productsContainer">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>

          {/* filter related stuff */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              size="small"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={20000}
            />
            <Typography>Categories</Typography>
          </div>

          {/* pagination related stuff */}
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
