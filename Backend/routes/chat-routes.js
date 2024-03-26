const express = require('express');
const router = express.Router();
// const chatCompletionValidator = require('../middleware/validatiors');

const { sendMessage } = require('../api/chatbot/chat-completion');

// router.use(authenticate);

router.post("/sendmessage", sendMessage);


 module.exports = router;