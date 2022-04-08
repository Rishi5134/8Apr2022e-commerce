const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../Utils/apiFeature");

// Creating products by ADMIN
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
  
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  
});
// Getting products

exports.getAllProducts = catchAsyncErrors( async (req, res, next) => {

// return next(new ErrorHandler("dummy error", 500));

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()

      let products = await apifeature.query.clone();
      let filteredProductsCount = products.length;
      apifeature.pagination(resultPerPage);

   products = await apifeature.query;
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount
    });
  
});

// Updating products by ADMIN

exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
 
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    } else {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(200).json({
        success: true,
        message: "Product Updated",
      });
    }
  
});

//Deleting a product by ADMIN

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
 
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
 
});

//Getting a single product

exports.getSingleProductDetails = catchAsyncErrors( async (req, res, next) => {
 
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  
});

exports.createProductReview = catchAsyncErrors( async (req, res, next) => {
 
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  
});

exports.getProductReviews = catchAsyncErrors( async (req, res, next) => {
 
    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  
});

exports.deleteReview = catchAsyncErrors( async (req, res, next) => {
 
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {reviews, ratings, numOfReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      success: true,
    });
 
});
