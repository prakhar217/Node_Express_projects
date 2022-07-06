require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

const connectDB = require('./db/connect')

require('dotenv').config()

const notFound = require('./middleware/not-found')
const errorHandlerMiddlerware = require('./middleware/error-handler')
//middleware

app.use(express.json()); // if we dont use this we dont have data in req.body

//setting up static files

app.use(express.static('./public'))

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound)

app.use(errorHandlerMiddlerware)
const port = process.env.PORT || 3000; // port variable for deployment
// hardCoded values are decent solution in our local enviroment 
// but for delployment , the site the project is hosted on might want to use port avilable

 

// this function is used to invoke database first then start the server

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`));

    } catch(error){

    }
}

start()


