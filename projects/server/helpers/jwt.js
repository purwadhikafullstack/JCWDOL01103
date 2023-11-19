const jwt = require('jsonwebtoken')

const tokenKey = "secretKey123"

const createToken = (payload) => {
    return jwt.sign(payload, tokenKey,{
        // expiresIn:'6h'
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

module.exports = {createToken, authToken}