const ErrorHandler = require("../Utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require("../Models/UserModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        console.log(token);

        if (!token) {
            return next(new ErrorHandler("Please Login", 401));            
        } 

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();

    } catch (error) {
        next(error);
    }
}
 
exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`)
            )
        };
        next();
    }
}