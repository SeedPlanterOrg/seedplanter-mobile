
const mongoose = require("mongoose")

const plantSchema = new mongoose.Schema({
    binomial_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    daily_watering: {
        type: Number,
        required: true,
        min: 0,
    },
    zone: {
        hardy:{
            type: Number,
            required: true,
            min: 0,
        },
        seasons: {
            annual: [String],
            perennial: [String],
            Bennial: [String],
        },
    },
    average_height:{ 
        type: Number,
        required: true,
        min: 0,
    },
    spacing: {
        type: Number,
        required: true,
        min: 0,
    },
    fertilize: {
        type: String,
        required: true,
    },
    light:{
        type: String,
        required: true,
    },
    features: [String],
    care_level:{ 
        type: String,
        required: true,
    },
    image_urls:[String]
})

// Exports the schema to other files and set are collection to Plants
module.exports = mongoose.model("Plants", plantSchema);

 