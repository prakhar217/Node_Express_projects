// Controller Functions

const Task = require("../models/Task");
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')



const getAllTasks = asyncWrapper(async (req, res) => {
  
    const tasks = await Task.find({}); // with the help of find static function it was possible to get all the documents in the collection 
    res.status(200).json({ tasks:tasks });
    // res.status(200).json({ tasks: tasks , amount:tasks.length});
    // res.status(200).json({ success:true , data:{tasks,nbHits: tasks.length} })
  
 
  // res.send('All items from the file')
})

// here all the try catch block ,  we can use a middleware instead 

const createTask = asyncWrapper(async (req, res) => {
  // res.send('create Task')
  // sicne we can access the data in req.body , why dont we just pipe it through and pass it along to our model create method
  // const task = await Task.create({name:'First TAsk'})
 
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  
    
  
  // we have model , in model we pass schema , and in order to get an instance we go with method name .create(req.body)
})

const getTask = asyncWrapper( async (req, res, next) => {
  //   res.send("get single Task");
  
    const {id:taskID} =req.params // grab the id but store it in taskID 
    const task = await Task.findOne({_id:taskID});
    if(!task){
      // const error = new Error('Not Found');
      // error.status = 404;
      // return next(error)

      return next(createCustomError(`NO task with ID : ${taskID}`,404))
      // return res.status(400).json({msg:`NO task with ID : ${taskID}`})
    }
    res.status(200).json({ task })
  
 
  
  
})


const deleteTask = asyncWrapper( async (req, res) => {

    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
      return res.status(404).json({msg:`NO task with id : ${taskID}`})
    }
    // res.status(200).json({task})
    res.status(200).json({task:null , status:"success" }) //  our frontend doesnt really care which task we are removing , so we just need to display 

  
 
  

})

const updateTask = asyncWrapper( async (req, res) => {
  
    const {id:taskID} = req.params
    // res.status(200).json({id:taskID , data:req.body}) // why do we need to pass data cause if we are updating something we need that info
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,
    runValidators:true}) // without the options object we cannot validate the data

    if(!task){
      return res.status(400).json({msg:`NO task with id : ${taskID}`})
    }
    
    res.status(200).json({task}) 

 
  

})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
