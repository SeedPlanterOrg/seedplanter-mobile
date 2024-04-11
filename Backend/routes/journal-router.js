// get instance of express & mongoose 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate')
const { getEntryById, 
    deleteEntryById, createEntry } = require ('../controllers/journal-controller');

// setup .env
require("dotenv").config();

// router.use(authenticate); // makes routes accessible by only the user
router.get('/get_entry_by_id', getEntryById);
router.delete('/delete_entry_by_Id', deleteEntryById);
router.post('/create_entry', createEntry);

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