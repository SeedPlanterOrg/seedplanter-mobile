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
        res.status(200).json({message: "/plantDeck/post"});
        console.log("succes plantDeck");
    })
    .put((req, res) => {
        res.status(200).json({mesage: "/plantDeck/put"});
        console.log("succes plantDeck");
    })
    .patch((req, res) => {
        res.status(200).json({message: "/plantDeck/patch"});
        console.log("succes plantDeck");
    })
    .delete((req, res) => {
        res.status(200).json({message: "/plantDeck/delete"});
        console.log("succes plantDeck");
    })

module.exports = router;