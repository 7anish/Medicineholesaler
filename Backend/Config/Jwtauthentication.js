const jwt = require('jsonwebtoken')
require('dotenv').config()
const KEY = process.env.JWT_KEY

// generating the jwt token 
const generateToken = (email, id , role)=>{
    return jwt.sign({
        email : email,
        id : id,
        role : role
    } , KEY , {expiresIn :'7d'})
}

// verifying the jwt token
const verifyToken = (token)=>{
    return jwt.verify(token , KEY)
}

module.exports = {
    generateToken ,
    verifyToken
}