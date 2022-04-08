import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../Actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const alert = useAlert();
  
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const demo = (err) => {
    toast(err, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  useEffect(() => {
  
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
   <>
     {loading ? <Loader/> :  <>
      <MetaData title="E-COMMERCE" />
      <div className="banner">
        <p>Welcome to E-Commerce</p>
        <h1 className="my-3">Find Amazing Products Below</h1>
        <a href="#container" className="my-3">
          <button>
            Scroll <CgMouse />{" "}
          </button>
        </a>
      </div>
      <h2 className=" my-3 featured-products">Featured Products</h2>
      <hr className="featuredProducts-hr" />
      <div id="container">
        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </>}
    <ToastContainer/>
   </>
  );
};

export default Home;
