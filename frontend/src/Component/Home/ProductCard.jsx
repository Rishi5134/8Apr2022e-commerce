import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './Home.css';


const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    isHalf: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value:product.ratings
  };
  
  return (
    <>
      <Link className="productCard" to={`/product/${product._id}`} >
        <img src={product.images[0].url} alt={product.name} />
        <p className="mx-2 my-3 text-center">{product.name}</p>
        <div className="mx-2 d-flex justify-content-between">
          <ReactStars {...options} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span className="mx-2">{`₹${product.price}`}</span>
      </Link>
    </>
  );
};

export default ProductCard;
