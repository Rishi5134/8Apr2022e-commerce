import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productActions";
import Loader from "../layout/Loader/Loader";
import "./Product.css";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
  "Headphone", "Laptop", "Mobile", "Watch", "Footwear", "Camera"
]

const Products = () => {
  const alert = useAlert();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,

  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredProductsCount;

  function filterMenu() {
    var x = document.getElementById("responsiveFilterBox");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating, error));
  }, [dispatch, keyword, currentPage, price, category, rating, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>

          <MetaData title="PRODUCTS --> E-COMMERCE" />
          <h1 className="productsHeading">Products</h1>

          <div className="resFilterDiv">

            <div className="filterToggle"  id="filterToggle"><button className="btn btn-danger" onClick={() => { filterMenu() }}>Filter</button></div>
            <div className="responsiveFilterBox" id="responsiveFilterBox">
              <div className="d-flex flex-row justify-content-evenly w-100 responsiveFilterBox-block-2">
                

              <div>

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li className="category-link text-white" key={category} onClick={() => { setCategory(category) }} >{category}</li>
                  ))}
                </ul>

              </div>
              <div>


                <fieldset className="filterOptions">
                  <Typography>Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={25000}
                  />
                  <Typography component="legend" className="typoRating">Ratings Above</Typography>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => { setRating(newRating) }}
                    aria-labelledBy='continuous-slider'
                    min={0}
                    max={5}
                    className='ratingSlider'
                    valueLabelDisplay="auto"
                  />
                </fieldset>

              </div>
              
              </div>


            </div>

          </div>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li className="category-link" key={category} onClick={() => { setCategory(category) }} >{category}</li>
              ))}
            </ul>

            <fieldset className="filterOptions">
              <Typography component="legend" className="typoRating">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => { setRating(newRating) }}
                aria-labelledBy='continuous-slider'
                min={0}
                max={5}
                className='ratingSlider'
                valueLabelDisplay="auto"
              />
            </fieldset>


          </div>


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

export default Products;
