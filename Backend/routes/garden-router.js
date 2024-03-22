// get instance of express & mongoose 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate')
const { getGardenByUserId, createGarden, 
    addPlant } = require ('../controllers/garden-controller');

// setup .env
require("dotenv").config();

const GardenModel = require("../models/garden-schema");




//router.use(authenticate); // makes routes accessible by only the user
router.post('/create_garden', createGarden);
router.put('/add_plant', addPlant);
router 
    .route("/")
    .get((req, res) => {
        res.status(200).json({mesage :"/garden/get"});
        console.log("succes user");
    })
    .put((req, res) => {
        res.status(200).json({mesage: "/garden/put"});
        // console.log("succes plantDeck");
    })
    .patch((req, res) => {
        res.status(200).json({message: "/garden/patch"});
        // console.log("succes plantDeck");
    })
    .delete((req, res) => {
        res.status(200).json({message: "/garden/delete"});
        // console.log("succes plantDeck");
    })

module.exports = router;