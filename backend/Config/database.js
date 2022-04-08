const mongoose = require("mongoose");

const connectDatabase = () => {
  try {
    mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(
        `Mongodb is connected with server at: ${data.connection.host}`
      );
    });
  } catch (error) {
    console.log(error);
  }
  
};

module.exports = connectDatabase;
