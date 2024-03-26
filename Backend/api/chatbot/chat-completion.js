const { OpenAI } = require('openai');
const AppError = require('../../middleware/appError');
require("dotenv").config({ path: '../../.env' })

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // organization: process.env.OPENAI_ORG_KEY,
    assistantId: process.env.OPENAI_ASSISTANT_ID
});

const systemMessages = [
    {"role": "system", "content": "You are a helpful gardening assistant that has extensive knowledge about plants."},
    {"role": "system", "content": "Specifically, you will give information about watering schedule, amount of sunlight, nutrient schedule, and pruning schedule for a plant if asked for information about a plant"},
    {"role": "system", "content": "You will also provide information about the plant's common name, scientific name, and a brief description of the plant if asked for information about a plant"},
    {"role": "system", "content": "Constraints: You will not provide information that is not related to gardening or plants. When asked more than one question, only answer the last question from the user"},
];

const conversations = new Map();

const sendMessage = async (req, res, next) => {
    const userId = req.body.userId;
    const message = req.body.message;
    const startConversation = req.body.startConversation;

    messages = conversations.get(userId) || [];
    if (!startConversation && messages.length === 0) {
        messages = [...messages, ...systemMessages];
    }

    // let messages = !startConversation ? [...systemMessages] : [];
    messages.push({"role": "user", "content": message });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        conversations.set(userId, messages);

        // Send the completion back to the client
        res.json({ completion: completion });
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the chat completion' });
    }
}

module.exports = {sendMessage};