// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
require("../models/user-schema.js"); // register schema
var User = require('mongoose').model('User'); // load schema
const AppError = require('../middleware/appError');
require("dotenv").config();
const jwt = require('jsonwebtoken');


const getUsers = async (req, res, next) => {
    let users;
    try{
     users = await User.find({}, '-password');
    }catch(err) {
        return next (new AppError ("Fetching users failed, please try again later.", 500));
    }
    if(!users) {
        return next(new AppError("No users found.", 404));
    }
    res.json({users: users.map(users => users.toObject({getters: true}))});
};


const signup = async (req, res, next) => {
  const errors = validationResult(req); //validate req.body
  if (!errors.isEmpty()) {
    return next (new AppError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, password } = req.body;


    let existingUser
    try {
        existingUser = await User.findOne({email: email})
    }catch {
        return next(new AppError('Signing up failed, please try again later.', 500));
    }

    if (existingUser) { //if user exists -> return next function and pass new error
        return next(new AppError ('User exists already, please login instead', 422));
    }

    let hashedPassword;
    try{
    hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return next(new AppError('Could not create user, please try again.'));
    }

  const createdUser = new User({
    id: uuidv4(),
    name, // name: name
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new AppError('Sign Up failed, please try again.'));
  }

  let token;

  try{
    token = jwt.sign({userId: createdUser.id, email: createdUser.email}, 'SECRET123', {expiresIn: '1h'});
  } catch (err) {
    return next(new AppError('Sign Up failed, please try again', 500));
  }

  res.status(201).json({userId: createdUser.id, email: createdUser.email, token: token});
};



const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser  
    try {
        existingUser = await User.findOne({email: email})
    }catch {
        return next(new AppError('Log in failed, please try again later.', 500));
    }

    if (!existingUser) {
        return next(new AppError ("Invalid credentials, could not log in.", 401));
    }

    let isValidPassword = false;
    try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err) {
      return next(new AppError('Could not log you in, please check you credentials and try again.'));
    }

    if(!isValidPassword){
      return next(new AppError('Invalid credentials, could not log you in'), 401);
    }


  let token;

  try{
    token = jwt.sign({userId: existingUser.id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
  } catch (err) {
    return next(new AppError('Log In failed, please try again', 500));
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;