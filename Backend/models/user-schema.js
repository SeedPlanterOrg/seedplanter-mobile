const mongoose = require('mongoose');
const validator = require('validator');
const Plants  = mongoose.model('PlantModel');

/*
  * Schema definition for a user in MongoDB using Mongoose.
  * This schema captures user details such as name, email, password, phone number, and garden information.
  * It also includes metadata like points earned by the user and chat history.
  *   name: String, name of the user, required.
  *   email: String, email address of the user, required, unique, and validated for correct format.
  *   password: String, password of the user, required and validated for minimum length.
  *   phone: String, phone number of the user.
  *   points: Number, points earned by the user.
  *   garden: Reference to a Garden model, holds the MongoDB ObjectId of the garden associated with the user.
  *   chats: Array of chat objects, records chat history of the user.
*/ 

//Chat Schema to save chats in the database
//This is unused for now
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

//User Schema to save user details in the database
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