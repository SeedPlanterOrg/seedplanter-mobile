// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
// const HttpError = require('../models/http-error');
require("../models/user-schema.js"); // register schema
var User = require('mongoose').model('User'); // load schema
const AppError = require('../middleware/appError');

// const DUMMY_USERS = [
//   {
//     id: 'u1',
//     name: 'Shivam Patel',
//     email: 'test@test.com',
//     password: 'test123'
//   }
// ];

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

  const createdUser = new User({
    id: uuidv4(),
    name, // name: name
    email,
    password,
    garden,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new AppError('Sign Up failed, please try again.'));
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser
    try {
        existingUser = await User.findOne({email: email})
    }catch {
        return next(new AppError('Signing up failed, please try again later.', 500));
    }

    if (!existingUser || existingUser.password != password) {
        return next(new AppError ("Invalid credentials, could not log in."));
    }

//   const identifiedUser = DUMMY_USERS.find(u => u.email === email);
//   if (!identifiedUser || identifiedUser.password !== password) {
//     throw new AppError('Could not identify user, credentials seem to be wrong.', 401);
//   }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;