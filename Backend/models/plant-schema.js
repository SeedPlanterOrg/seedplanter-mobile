
const mongoose = require("mongoose")

/**
 * Schema definition for a plant in MongoDB using Mongoose, designed to interface with data from the "perianal" API.
 * This schema captures comprehensive details about plants, including botanical and common names, care requirements, and environmental preferences.
 * It provides a structured format for storing plant information such as watering needs, sunlight requirements, and zoning information, which are crucial for gardening databases.
 *
 * Fields:
 *   id: Numeric identifier of the plant, correlates with the API data source.
 *   page: Numeric page number, possibly used for pagination in data listings.
 *   binomial_name: String, scientific name of the plant, required.
 *   name: String, common name of the plant, required.
 *   daily_watering: String, specifies daily watering needs, required, with validation for non-negative values.
 *   zone: Object containing:
 *     hardy: Numeric value, specifies the hardiness zone of the plant, with validation for non-negative values.
 *     season: String, specifies the growing season optimal for the plant.
 *   light: Array of strings, lists types of light conditions suitable for the plant, required.
 *   care_level: String, specifies the level of care the plant needs.
 *   image_urls: Array of strings, URLs to images of the plant.
 *   description: String, general description of the plant.
 *   watering_description: String, detailed description of the plant’s watering needs.
 *   sunlight_description: String, detailed description of the plant’s sunlight requirements.
 *   pruning_description: String, detailed description of the plant’s pruning needs.
 *   hardiness_url: String, URL to more information on plant hardiness.
 */
const PlantModel = new mongoose.Schema({
    id: {
        type: Number
    },
    page: {
        type: Number
    },
    binomial_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    daily_watering: {
        type: String,
        required: true,
        min: 0,
    },
    zone: {
        hardy:{
            type: Number,
            min: 0
        },
        season: {
            type: String
        },
    },
    light:{
        type: [String],
        required: true,
    },
    care_level:{ 
        type: String
    },
    image_urls:[String],
    description: String,
    watering_description: String,
    sunlight_description: String,
    pruning_description: String,
    hardiness_url: String
});

// Exports the schema to other files and set are collection to Plants
module.exports = mongoose.model("PlantModel", PlantModel);


 