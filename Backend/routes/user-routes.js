// get instance of express & mongoose 
const express = require('express');
// setup .env
require("dotenv").config();
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controllers/user-controller');

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);

module.exports = router;
