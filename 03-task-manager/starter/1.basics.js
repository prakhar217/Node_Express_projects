// With the help of this project we will learn how to set up and connect to the cloud database
//how to persist our data to the cloud , how to perform all the CRUD operations(Create , read , update , delete)

// by connecting with update the user can create read delete update
// we are going to be responsible for setting up the api that will be responsible communicating with Database

const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

//middleware

app.use(express.json()); // if we dont use this we dont have data in req.body

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// we are building REST(Reepresentational State transfer) API  -- it determines how the API looks like

//app.get('/api/v1/tasks')        -get all the tasks
//app.post('/api/v1/tasks')       -create a new task
//app.get('/api/v1/tasks/:id')    -get single task
//app.patch('/api/v1/tasks/:id')  -update task
//app.delete('/api/v1/tasks/:id') -delete task

// why do we go with /api/v1/ -- essentially thats the just convention // just to tell all of these are the api routes
//v1 so that you can direct them to new version if you make one for eg , version2 (v2)

//

const port = 3000;

app.listen(port, console.log(`server is listening on port ${port}`));
