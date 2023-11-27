const jwt = require('jsonwebtoken')

const tokenKey = process.env.JWT_TOKEN

const createToken = (payload) => {
    return jwt.sign(payload, tokenKey,{
        expiresIn:'12h'
    })
}

const decodeToken = (payload) => {
    return jwt.verify(payload, tokenKey, (err, decode) => {
        if(err){
            return null
        }
        return decode
    })
}

const authToken = (req, res, next) => {
    jwt.verify(req.token, tokenKey, (err, decode) => {
        if(err){
            return res.status(401).send("User not auth!")
        }
        req.user = decode
        next()
    })
}

module.exports = {createToken, authToken, decodeToken}