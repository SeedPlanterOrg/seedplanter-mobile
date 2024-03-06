const User = require('../models/user-schema');
const catchAsync = require('./../utils/catchAsync');

//Create new user
exports.signup = catchAsync( async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }

    })
});