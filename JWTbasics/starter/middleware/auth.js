
const jwt = require("jsonwebtoken"); // to make a JWT
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddlerware = async (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("NO token provide", 401);
  }

  const tokens = authHeader.split(" ")[1];

  //authorization
  try {
    const decoded = jwt.verify(tokens, process.env.JWT_SECRET);

    const { id, username } = decoded;

    req.user = { id, username };

    next();

    // console.log(decoded)
  } catch {
    throw new CustomAPIError("Not authorize to access this route", 401);
  }
}

module.exports = authenticationMiddlerware