import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../Actions/productActions";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom"
import Loader from '../layout/Loader/Loader';
import './Dashboard.css';


const categories = [
  "Headphone", "Laptop", "Mobile", "Watch", "Footwear", "Camera"
]


const Dashboard = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  // const {keyword} = useParams();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/admin/${keyword}`);
    } else {
      history(`/products/admin`);
    }
  }

  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const setcurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  useEffect(() => {

    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, error, keyword, currentPage, price, category]);

  return (
    <>
      <h2 className=" my-3 featured-products">PRODUCTS</h2>
      <div className="dashbord">

        <div className="AdminSearchBox mx-3">

          <form onSubmit={searchSubmitHandler}>

            <input type="search" onChange={(e) => { setKeyword(e.target.value) }} placeholder='Search products...' className='dashSearch' />


          </form>
          <h5 className='mx-3'>Categories</h5>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li className="admin-category-link" key={category} onClick={() => { setCategory(category) }} >{category}</li>
            ))}
          </ul>
        </div>

        <div className='w-100 d-flex justify-conten-evenly align-items-center table-data '>

          <table className='table container table-hover'>
            <thead>
              <tr className='text-center'>
                <th className='mx-5' >Id</th>
                <th className='mx-5' >Name</th>
                <th className='mx-5' >Category</th>
                <th className='mx-5' >Description</th>
                <th className='mx-5' >Price</th>
                <th className='mx-5' >Ratings</th>
                <th className='mx-5' >Stock</th>
                <th className='mx-5' >Reviews</th>
                <th className='mx-5' >Created At</th>
              </tr>
            </thead>
            <tbody>

              {
                products && products.map((product) => (<tr key={product._id} >
                  <td data-label='Id' className='text-centr'>{product._id}</td>
                  <td data-label='Name' className='text-cener'>{product.name}</td>
                  <td data-label='Category' className='textcenter'>{product.category}</td>
                  <td data-label='Description' className='txt-center'>{product.description}</td>
                  <td data-label='Price' className='text-cener'>{product.price}</td>
                  <td data-label='Ratings' className='text-cnter'>{product.ratings}</td>
                  <td data-label='Stock' className='text-cener'>{product.Stock}</td>
                  <td data-label='Reviews' className='text-cnter'>{product.numOfReviews}</td>
                  <td data-label='Created At' className='tex-center'>{product.createdAt}</td>
                </tr>))
              }
            </tbody>

          </table>
        </div>
        {resultPerPage < filteredProductsCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setcurrentPageNo}
              nextPageText='Next'
              lastPageText='Last'
              firstPageText='1st'
              prevPageText='Prev'
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>)}

      </div>
    </>

  )
}

export default Dashboard