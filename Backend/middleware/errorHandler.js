/*
    This file is used to handle errors in the application.
*/

module.exports = (err, req, res, next) =>  { //error handling middleware

    // Set the status code, status, and success of the error
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    const success = err.success || false;

    res.status(err.statusCode).json({
        success: success,
        status: err.status,
        message: err.message
    });
};