const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
// const authenticate = require('../middleware/authenticate');
// const chatController = require('../controllers/chat-controller');
// const chatAPI = require('../api/chatbot/assistant/chatbot-assistant');

// router.use(authenticate);

// router 
//     .route("/")
//     .get( (req, res) => {
//         res.status(200).json({message:"Get Chat"});
//      })
//     .post((req, res) => {
//         res.status(200).json({message: "Set Chat"});
//     })
//     // .put((req, res) => {
//     //     res.status(200).json({message: "Update Chat"});
//     // })
//     // .delete((req, res) => {
//     //     res.status(200).json({message: "Delete Chat "});
//     // })
//     // .patch((req, res) => {
//     //     res.status(200).json({message: "Patch Chat"}); 
//     // })

//     // router.use(authenticate);

    // router.post('/new', chatAPI.createAssistant);
    

    module.exports = router;