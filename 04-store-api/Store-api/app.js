require('dotenv').config()
// const connectDB = require('./db/connect')
//async errors

require('express-async-errors')

const express = require('express')
const app = express();

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

const productsRouter = require('./routes/products')

//middleware

app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('<h1> STORE API </h2> <a href="/api/v1/products"> Products Route </a>')
})

app.use('/api/v1/products',productsRouter)

//product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000;

const start = async () =>{
    try{
        //connectDB
       await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`The server is listening on ${port}`))
    }catch(error){
     console.log(error);
    }
}

start()

