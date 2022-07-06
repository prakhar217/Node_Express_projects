const Product = require('../models/product')

const getAllProductsStatic = async (req,res)=>{
    // throw new Error('Testing  async ERRORS')
    // const search = 'd'
    // const products = await Product.find({
    //     name:{$regex:search,$options : 'i'} //option = 'i' is for case insensitive
    // });
        // const products = await Product.find({}).sort('-name price');
        // const products = await Product.find({}).select('name price')
        // const products = await Product.find({})
        // .sort('name')
        // .select('name price')
        // .limit(10)
        // .skip(1)
        const products = await Product.find({price:{$gt:30}}).sort('price')
    res.status(200).json({products, nbHits:products.length})
}

const getAllproducts = async (req,res)=>{
    // console.log(req.query);
    const { featured , company , name, sort , fields , numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex : name , $options:'i'}
    }

    if(numericFilters){
        const operatorMap = {
          ">": "$gt",
          ">=": "$gte",
          "=":"$eq",
          "<": "$lt",
          "<=": "$lte",
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx , (match)=>`-${operatorMap[match]}-`)
        console.log(filters);
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field , operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    console.log(queryObject);
    let result =  Product.find(queryObject)
    if(sort){
        // products = products.sort() // the problem is following -- since we have await , actually in the product we dont have anymore that queryObject , we need to remove this await for a reason 
        // console.log(sort);
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }
    //for fields
    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1)*limit
    result = result.skip(skip).limit(limit)
    //23
    // if limit to 7 then there are 4 pages 
    // 4 page 7 7 7 2 items per page
    // so like if the user goes for page 1 , then 1 -1 = 0 * limit still zero so we dont skip thats the page 1
    // but if the user goes for page 2 the page - 1 = 2 -1 = 1 * limit(7) so 7 , that means we will skip 7 and thats how we reach page 2
    
     //||\\
    //since we need to use all these function on the queryObject whihc will not be available
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}


module.exports = {
    getAllProductsStatic,
    getAllproducts
}
