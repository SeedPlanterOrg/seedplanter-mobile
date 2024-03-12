
const jwt = require('jsonwebtoken')
const AppError = require("./appError");
require("dotenv").config();


module.exports = (req, res, next) => {

    if(req.method === 'OPTIONS') {
        return next();
    }

    let token;
    try{
        token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer Token'
        if(!token){
            throw new AppError('Authentication failed!', 401);
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return next(new AppError('Invalid token.', 401));
        } else if (err instanceof jwt.TokenExpiredError) {
            return next(new AppError('Token has expired.', 401));
        } else {
            return next(new AppError('Authentication failed!', 401));
        }
    }


}