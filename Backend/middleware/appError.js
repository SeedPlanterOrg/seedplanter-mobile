/*
    File: appError.js
    Description:
        *This file is responsible for error handling
        *The file contains a class that is used to handle errors
    Class: AppError() - Function used to handle errors
*/
class AppError extends Error { //error handling class

    constructor(message, statusCode, success = false) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.success = success;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;