import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetail,
} from "../../states/actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ReactStars from "react-rating-stars-component";
import Carousel from "./Carousel";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import ReviewCard from "./ReviewCard";
import MetaData from "../layouts/MetaData";

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  let { id } = useParams();
  const alert = useAlert();

  useEffect(() => {
    // like in backend we do req.params.id
    if (error) {
      alert.show(error, { type: "error" });
      dispatch(clearErrors());
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  return (
    <>
      <MetaData title={`Tradex | Product`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetail">
            <div className="product-images">
              {product.images && <Carousel data={product.images} />}
            </div>
            <div>
              <div className="detailBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailBlock-2">
                <ReactStars {...options} />
                <span>({product.noOfReviews} Reviews)</span>
              </div>

              <div className="detailBlock-3">
                <h1>₹{product.price}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button className="btn"> - </button>
                    <input value="1" type="number" />
                    <button className="btn"> + </button>
                  </div>{" "}
                  <button className="btn">Add to cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutofStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailBlock-4">
                Description : <p>{product.description} </p>
              </div>
              <button
                className="submitReview btn"
                onClick={() =>
                  alert.show("Review submitted !", { type: "success" })
                }
              >
                Submit Review
              </button>
            </div>
          </div>
        </>
      )}
      <div className="reviews">
        <h3 className="reviewHeading">REVIEWS</h3>
        {product.reviews && product.reviews[0] ? (
          <div className="reviewCards">
            {product.reviews &&
              product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (
          <p className="noReview">No review yet ..</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
