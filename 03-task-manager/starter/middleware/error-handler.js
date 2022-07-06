const { CustomAPIError } = require("../errors/custom-error")

const errorHandlerMiddlerware = (err,req,res,next)=>{
    // console.log(err);
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(err.statusCode).json({msg:'Something went wrong'})
}



module.exports = errorHandlerMiddlerware