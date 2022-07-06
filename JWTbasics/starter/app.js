// before this project all our routes were public meaning anyone could access them and use them however they please
// so how do we restrict the access
// a very popular method is using JWT -- long strings
// imagine we have 2 routes 
// a dashboard -- protected so even if we click all day long on get DATA we have no access

// a register route - and only if you register you get a token then you can accces data

// JWT looks like
// xxxxx.yyyy.zzzzz

//1.Header - type of token , algo - encoded with BAse64Url
//2.Payload - this is where we place data for eg userID 
// siganture - we have to keep it on the server

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1',mainRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
 