// to connect to the database

const mongoose = require("mongoose");

// now when you push this to github everyone can see our link and use it
//so the solution is to use .env file to keep our secrets
// in package.json , we have

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

// first we are activating the server , then we are connecting to the data base
// so it would be more helpful if we connect to the database first and if succesful only then start the server , so in order to do that
//

module.exports = connectDB;
