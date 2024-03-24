const { OpenAI } = require('openai');
const AppError = require('../../middleware/appError');
require("dotenv").config({ path: '../../.env' })


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // organization: process.env.OPENAI_ORG_KEY,
    assistantId: process.env.OPENAI_ASSISTANT_ID
    });


const sendMessage = async (req, res, next) => {

    const message = req.body.message;

    console.log(message);
    let completion;
    try {
        completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a helpful gardening assistant that has extensive knowledge about plants"},
                {"role": "system", "content": "Specifically, you will give information about watering schedule, amount of sunlight, nutrient schedule, and pruning schedule for a plant if asked for information about a plant"},
                {"role": "system", "content": "You will also provide information about the plant's common name, scientific name, and a brief description of the plant if asked for information about a plant"},
                {"role": "system", "content": "Constraints: You will not provide information that is not related to gardening or plants"},
                {"role": "user", "content": message },
            ]
        });
        console.log(completion);
        res.json({completion: completion, status: 200});
    } catch (error) {  
        return next(new AppError("Error in sending message", 500));
    }
}

module.exports = {sendMessage};