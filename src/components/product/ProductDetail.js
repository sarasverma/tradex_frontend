import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../states/actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ReactStars from "react-rating-stars-component";
import Carousel from "./Carousel";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";

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
      alert.show("Some error occured !", { type: "error" });
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
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to cart</button>
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
                className="submitReview"
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
    </>
  );
};

export default ProductDetail;
