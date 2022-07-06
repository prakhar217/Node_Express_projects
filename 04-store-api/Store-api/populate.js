// to automate the building of database

require('dotenv').config()

const connectDB = require('./db/connect')


const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        // we should terminate the process after being succesful so 
        console.log('Succesful')
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

start()