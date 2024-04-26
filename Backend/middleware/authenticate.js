/*
    File: authenticate.js
    Description:
        *This file is responsible for authenticating users
        *The file contains a function that is used to authenticate users
    Function: authenticate() - Function used to authenticate users
*/

const jwt = require('jsonwebtoken')
const AppError = require("./appError");
require("dotenv").config();


module.exports = (req, res, next) => {

    // Check if the request is an options request
    if(req.method === 'OPTIONS') {
        return next();
    }

    // Check if the request has an authorization header
    let token;
    try{
        token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer Token'
        if(!token){
            throw new AppError('Authentication failed!', 401);
        }
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        // Check if the error is a JsonWebTokenError or a TokenExpiredError
        if (err instanceof jwt.JsonWebTokenError) {
            return next(new AppError('Invalid token.', 401));
        } else if (err instanceof jwt.TokenExpiredError) {
            return next(new AppError('Token has expired.', 401));
        } else {
            return next(new AppError('Authentication failed!', 401));
        }
    }


}