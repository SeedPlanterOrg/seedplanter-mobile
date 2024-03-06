// get instance of express & mongoose 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const gardenController = require ('../controllers/garden-controller');

// setup .env
require("dotenv").config();

router 
    .route("/")
    .get((req, res) => {
        res.status(200).json({mesage :"/garden/get"});
        console.log("succes user");
    })
    .post((req, res) => {
        res.status(200).json({message: "/garden/post"});
        console.log("succes plantDeck");
    })
    .put((req, res) => {
        res.status(200).json({mesage: "/garden/put"});
        console.log("succes plantDeck");
    })
    .patch((req, res) => {
        res.status(200).json({message: "/gardenk/patch"});
        console.log("succes plantDeck");
    })
    .delete((req, res) => {
        res.status(200).json({message: "/garden/delete"});
        console.log("succes plantDeck");
    })

module.exports = router;