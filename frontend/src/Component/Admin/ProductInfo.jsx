import React from 'react'

const ProductInfo = ({product}) => {
  return (
    <>
    <div>

  <th scope='row'>{product._id}</th>
  <td>{product.name}</td>
  <td>{product.category}</td>
  <td>{product.description}</td>
  <td>{product.price}</td>
  <td>{product.ratings}</td>
  <td>{product.Stock}</td>
  <td>{product.numOfReviews}</td>
  <td>{product.createdAt}</td>
    </div>
    </>
  )
}

export default ProductInfo