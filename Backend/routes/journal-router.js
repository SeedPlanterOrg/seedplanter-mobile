// get instance of express & mongoose 
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate')
const { getEntryById, 
    deleteEntryById, createEntry, getAllEntries, updateEntry } = require ('../controllers/journal-controller');

// setup .env
require("dotenv").config();

// router.use(authenticate); // makes routes accessible by only the user
// routes to handle various journal interactions
router.get('/get_entry_by_id', getEntryById);
router.get('/get_journal', getAllEntries);
router.delete('/delete_entry_by_Id', deleteEntryById);
router.post('/create_entry', createEntry);
router.put('/update_entry', updateEntry);

// ping routes 
router 
    .route("/")
    .get((req, res) => {
        res.status(200).json({mesage :"/get"});
        console.log("succes user");
    })
    .put((req, res) => {
        res.status(200).json({mesage: "/put"});
        // console.log("succes plantDeck");
    })
    .patch((req, res) => {
        res.status(200).json({message: "/patch"});
        // console.log("succes plantDeck");
    })
    .delete((req, res) => {
        res.status(200).json({message: "/delete"});
        // console.log("succes plantDeck");
    })

module.exports = router;