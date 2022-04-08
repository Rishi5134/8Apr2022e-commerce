const ErrorHandler = require('../Utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

//Wrong id is entered or Casting Error

if(err.name === "CastError"){
    const message = `Resource not found or Invalid : ${err.path}`;
    err = new ErrorHandler(message,400);
}

//Mongoose Duplicate Key Error
if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400);
}

//JWT Expired Error
if (err.name = "TokenExpiredError") {
    const message = `JWT Token Expired, Try again`;
    err = new ErrorHandler(message,400);
}

//Wrong JWT Error
if (err.name = "JsonWebTokenError") {
    const message = `JWT Token is Invalid, Try again`;
    err = new ErrorHandler(message,400);
}

    res.status(err.statusCode).json({
        success:false,
        // error:err.stack,
        message: err.message
    })
}