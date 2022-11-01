import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetail,
  newReview,
} from "../../states/actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Carousel from "./Carousel";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import ReviewCard from "./ReviewCard";
import MetaData from "../layouts/MetaData";
import { addItemToCart } from "../../states/actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../states/constants/productConstant";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // like in backend we do req.params.id
    if (error) {
      alert.show(error, { type: "error" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
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
                <Rating {...options} />
                <span>({product.noOfReviews} Reviews)</span>
              </div>

              <div className="detailBlock-3">
                <h1>₹{product.price}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button
                      className="btn"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <input readOnly type="number" value={quantity} />
                    <button
                      className="btn"
                      onClick={() => {
                        if (quantity < product.stock) setQuantity(quantity + 1);
                      }}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>{" "}
                  <button
                    className="btn"
                    onClick={addToCartHandler}
                    disabled={product.stock < 1 ? true : false}
                  >
                    Add to cart
                  </button>
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
                onClick={() => {
                  submitReviewToggle();
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </>
      )}
      <div className="reviews">
        <h3 className="reviewHeading">REVIEWS</h3>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              precision={0.5}
              max={5}
              name="review-rating"
              onChange={(e) => {
                setRating(parseFloat(e.target.value));
              }}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {product.reviews && product.reviews[0] ? (
          <div className="reviewCards">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
          </div>
        ) : (
          <p className="noReview">No review yet ..</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
