const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

router 
    .route("/:id")
    .get( (req, res) => {
        res.status(200).json({message:"Get Chat"});
     })
    .post((req, res) => {
        res.status(200).json({message: "Set Chat"});
    })
    .put((req, res) => {
        res.status(200).json({message: "Update Chat"});
    })
    .delete((req, res) => {
        res.status(200).json({message: "Delete Chat "});
    })
    .patch((req, res) => {
        res.status(200).json({message: "Patch Chat"}); 
    })

    module.exports = router;