const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name:{
            type: string,
            required: true,
        },
        email:{
            type: string,
            required: true,
        },
        passwordHash:{
            type: string,
            required: true,
        },
        phone:{
            type: string,
            required: false,
        },
        isAdmin:{
            type: boolean,
            required: false,
        }

});

userSchema.virtual('id').get(function () {
    return this._id.toHexString;
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;