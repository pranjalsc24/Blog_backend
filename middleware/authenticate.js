const jwt = require("jsonwebtoken")
const env = require("dotenv")

exports.authenticate = (req, res, next) => {
     // console.log("pranjal");
     const authHeader = req.headers.authorization
     const token = authHeader && authHeader.split(' ')[1]
     const decode = jwt.verify(token, process.env.secret_key)
     // console.log(decode);
     req.user = decode
     next()
}