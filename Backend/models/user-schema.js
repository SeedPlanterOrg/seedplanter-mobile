const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
        name:{
            type: string,
            required: [true, 'Please tell us your name!']
        },
        email:{
            type: string,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password:{
            type: string,
            required: [true, 'Please provide a password'],
            minlength: 8
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"]
        },
        phone:{
            type: string,
            required: false,
        }, 
});



// userSchema.virtual('id').get(function () {
//     return this._id.toHexString;
// });

// userSchema.set('toJSON', {
//     virtuals: true,
// });

const User = mongoose.model('User', userSchema);
module.exports = User;