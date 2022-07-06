// require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

const connectDB = require("./db/connect");

require("dotenv").config();

// Set up and connect Database

// NOSql , Non Reelational database - MONGO-DB
//basically we can store data in JSON format and it doesnt care how data is related , no tables

// free cloud hosting Mongo DB

// how to setup and configure MongoDB Atalas

// once our database is setup , we have to connect it to server
// we will do it with the help of moongoose\

// to connect
// we need to import mongoose

//middleware

app.use(express.json()); // if we dont use this we dont have data in req.body

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

// this function is used to invoke database first then start the server

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);// this way our connection string is an env variable // now lets setup our structure for future documents and assign them to collection 
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {}
};

start();
