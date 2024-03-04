const User = require('../models/user-schema');

//Create new user
exports.signup = async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.statues(200).json({
        status: 'success',
        data: {
            user: newUser
        }

    })
}