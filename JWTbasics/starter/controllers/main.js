// check username , password in post(Login) request

//if exist create new JWT (Why use JWT ? -- simply because it has some security feature, where we can be sure about the integrity of the data , if the token passes the validation)
// http is stateless that means the server does not remember any prvious request send by the user

// send back to front end

// setup authetication so only the request with JWT can access the dashboard

const jwt = require("jsonwebtoken"); // to make a JWT

const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();
const login = async (req, res) => {
  const { username, password } = req.body;

  // mongoose - require validation - it simply splits back the error
  // Join - AN entire addition of layer of validation
  // actuallly checking for both of these values here only

  if (!username || !password) {
    throw new CustomAPIError("Please Provide Email and Password", 400);
  }

  // create ID  - just for demo , nirmally provided by DB!!!

  const id = new Date().getDate();

  //create new token    // try to keep payload smaller , better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); // here we can pass anythingh ,, do not pass the password,, id is very helpful
  // keep the JWT_SECRET long and unguessable , complex
  // this is the secret that is used to sign our token
  console.log(username, password);
  // res.send("Fake Login/Register/SignUp");
  res.status(200).json({ msg: "user created", token });
};
//  how the request with token already present is going to look like
// goal is to secure resource access on the server

const dashboard = async (req, res) => {
  // const authHeader = req.headers.authorization;
  console.log(req.user);
  // console.log(authHeader);
  //authentication 
  // for this we need to set up a authentication 
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({
          msg: `Hello , ${req.user.username}`,
          secret: `Here is your authorize data , your lucky number is ${luckyNumber} `,
        });
  // console.log(tokens);
  // console.log(req.headers); // in the following videos we will extract and validate it and if only it is true we will show dashboard

};

module.exports = {
  login,
  dashboard,
};
