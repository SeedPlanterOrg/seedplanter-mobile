// const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
// const HttpError = require('../models/http-error');
require("../models/user-schema.js"); // register schema
var User= require('mongoose').model('User'); // load your schema
const AppError = require('../middleware/appError');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Shivam Patel',
    email: 'test@test.com',
    password: 'test123'
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next (new AppError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, password, passwordConfirm} = req.body;


    let existingUser
    try {
        existingUser = await User.findOne({email: email})
    }catch {
        const error = new AppError('Signing up failed, please try again later.', 500);
        return next(error);
    }

    if (existingUser) {
        const err = new AppError ('User exists already, please login instead', 422);
        return next(err);
    }

  const createdUser = new User({
    id: uuidv4(),
    name, // name: name
    email,
    password,
    passwordConfirm,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new AppError('Sign Up failed, please try again.');
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new AppError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;