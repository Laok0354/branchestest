require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    
    if (req.cookies.accessToken == null || req.cookies.accessToken == undefined) return res.sendStatus(401)
    
    const token = req.cookies.accessToken;
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        
        if (err) return res.sendStatus(403)
        req.user = user
        console.log(user)
        next()
        
    })
}

module.exports = authenticateToken;