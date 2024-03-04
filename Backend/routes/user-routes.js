// get instance of express & mongoose 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// setup .env
require("dotenv").config();

router 
    .route("/")
    .get((req, res) => {
        res.status(200).json({mesage :"/user/get"});
        console.log("succes user");
    })
    .post((req, res) => {
        res.status(200).json({message: "/user/post"});
        console.log("succes user");
    })
    .put((req, res) => {
        res.status(200).json({mesage: "/user/put"});
        console.log("succes user");
    })
    .patch((req, res) => {
        res.status(200).json({message: "/user/patch"});
        console.log("succes user");
    })
    .delete((req, res) => {
        res.status(200).json({message: "/user/delete"});
        console.log("succes user");
    })

module.exports = router;
