import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { clearErrors, getProductDetails } from "../../Actions/productActions";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
if (error) {
  alert.error(error);
  dispatch(clearErrors());
}
    dispatch(getProductDetails(id));
  }, [dispatch, error, alert]);

  const options = {
    edit: false,
    isHalf: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    size: 30,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        
      <MetaData title={`${product.name} --> E-COMMERCE`} />
          <div className="productDetails row">
            <div className="col-sm-7">
              <Carousel className="mx-auto" indicators={true}>
                {product.images &&
                  product.images.map((item, i) => (
                    <div className="d-flex justify-content-center">
                      <img
                        src={item.url}
                        className=" CarouselImage "
                        key={item.url}
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="col-sm-5">
              <div className="details1">
                <h1>{product.name}</h1>
                <p className="text-secondary">Product #{product._id}</p>
              </div>
              <div className="details2 my-auto mt-3 mb-2">
                <ReactStars {...options} classNames="productDetailRatings" />
                <span className="my-auto">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detaisl3">
                <h1 className="mb-2">{`₹${product.price}`}</h1>
                <div className="details3-1"> 
                  <div className="details3-1-1">
                    <button>-</button>
                    <input type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button className="mx-3">Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      product.Stock < 1 ? "text-danger" : "text-success"
                    }
                  >
                    {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="details4 mb-3">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <div className="reviews">
            <div className="d-flex justify-content-center">
              <h1 className="review-heading my-3">Reviews</h1>
            </div>
            <div className="d-flex justify-content-center">
              <div className="review-data">
                {product.reviews && product.reviews[0] ? (
                  <div className="d-flex reviewsFromMap">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ReviewCard review={review} key={product.reviews._id} />
                      ))}
                  </div>
                ) : (
                  <p className="noReviews">No Reviews Yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
