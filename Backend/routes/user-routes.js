// get instance of express & mongoose 
const express = require('express');
// setup .env
require("dotenv").config();
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/user-controller');

router.get('/', userController.getUsers);

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
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;
