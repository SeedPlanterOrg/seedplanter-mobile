const mongoose = require('mongoose');
const validator = require('validator');
const Plants  = mongoose.model('PlantModel');

const chatSchema = new mongoose.Schema({
    id: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  });

const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: [true, 'Please tell us your name!']
        },
        email:{
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password:{
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6
        },
        phone:{
            type: String,
            required: false,
        },
        points:{
            type: Number,
            required: false
        },
        garden:{ 
            type: mongoose.Schema.Types.ObjectId, ref: 'Garden',
            required: false
        },
        chats: [chatSchema]
});



const User = mongoose.model('User', userSchema);
module.exports = User;