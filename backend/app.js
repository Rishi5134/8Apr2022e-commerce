const express = require('express');
const app = express();
const product = require('./Routes/productRouter');
const errorMiddleware = require('./Middleware/error')
const user = require('./Routes/userRouter');
const cookieParser = require('cookie-parser');
const order = require('./Routes/orderRouter');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.use(errorMiddleware);
 
app.use('/api/v1', product );
app.use('/api/v1', user);
app.use('/api/v1', order);

module.exports = app;