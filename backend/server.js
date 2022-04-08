const app =  require('./app');
const dotenv =  require('dotenv');
dotenv.config({path:'BackEnd/Config/config.env'});
const connectDatabase = require('./Config/database');
const cloudinary = require("cloudinary");


//Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log("Server is shutting down due to Uncaught Exception");

    process.exit(1);
})

const port = process.env.PORT;
connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDIANRY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(port, () => {
    // console.log(Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000));
    console.log(`Server is running at PORT: ${port}`);
});

//Unhandled Promise Rejection

process.on('unhandledRejection', (err) => {
console.log(`Error: ${err.message}. `);
console.log(`Error: ${err.stack}. `);
console.log('Serving is shutting down due to Unhandled Promise Rejection.');

server.close(() => {
    process.exit(1);
})
} )