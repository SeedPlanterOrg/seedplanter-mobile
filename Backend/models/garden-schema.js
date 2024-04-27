const mongoose = require("mongoose");
const Plants  = mongoose.model('PlantModel');
const User = mongoose.model('User');
// const Task = mongoose.model('Task');

/**
 * Schema definition for a garden plant in MongoDB using Mongoose.
 * This schema stores the relationship and care details for plants in a user's garden,
 * including identification, care settings, watering and fertilizing schedules, and user notes.
 * It incorporates various fields with validation requirements to ensure data integrity.
 *
 * Fields:
 *   gardenId: String identifier for the garden, required.
 *   userId: Reference to a User model, required.
 *   plantId: Numeric identifier of the plant, required.
 *   water: Boolean indicating if the plant needs watering, required.
 *   fertilize: Boolean indicating if the plant needs fertilizing, required.
 *   waterLevel: Numeric level of water (0-1 scale), with a maximum of 1.
 *   lastWateringDate: Date of the last watering.
 *   wateringInterval: Number of days between watering.
 *   wateringFrequency: String description of how often watering occurs.
 *   nextWateringDate: Date when next watering should occur.
 *   fertilizerLevel: Numeric level of fertilizer (0-1 scale), with a maximum of 1.
 *   lastFertilizingDate: Date of the last fertilizing.
 *   fertilizingInterval: Number of days between fertilizing applications.
 *   fertilizingFrequency: String description of how often fertilizing occurs.
 *   nextFertilizingDate: Date when next fertilizing should occur.
 *   notifyWateringTask: Boolean flag to notify user for watering, defaults to false.
 *   notifyFertilizeTask: Boolean flag to notify user for fertilizing, defaults to false.
 *   notes: Array of strings for user notes (temporary until JournalEntry integration).
 *   imagesUrls: Array of strings for image URLs of the plant.
 *   plantDetails: Object containing detailed information about the plant, required.
 */

const gardenPlantSchema = new mongoose.Schema({
  gardenId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  plantId: {
    type: Number, 
    required: true
  },
  water: {
    type: Boolean,
    required: true
  },
  fertilize: {
    type: Boolean,
    required: true
  },
  waterLevel: {
    type: Number,
    max: 1,
  },
  lastWateringDate: {
    type: Date
  },
  wateringInterval: {
    type: Number
  },
  wateringFrequency: { 
    type: String
  },
  nextWateringDate: {
    type: Date
  },
  fertilizerLevel: {
    type: Number,
    max: 1,
  },
  lastFertilizingDate: {
    type: Date
  },
  fertilizingInterval: {
    type: Number
  },
  fertilizingFrequency: {
    type: String
  },
  nextFertilizingDate: {
    type: Date
  },
  notifyWateringTask: {
    type: Boolean,
    default: false
  },
  notifyFertilizeTask: {
    type: Boolean,
    default: false
  },
  notes: [{
    // for now 
    //type: mongoose.Schema.Types.ObjectId, 
    //ref: "JournalEntry"
    type: String // delete me once journal is up
  }],
  imagesUrls: [{
    type: String
  }],
  plantDetails: {
    type: Object,
    required: true
  },
});

const GardenPlantModel = mongoose.model("GardenPlantModel", gardenPlantSchema);

/**
 * Schema definition for a garden in MongoDB using Mongoose.
 * This schema represents a user's garden, linking to individual plants and tasks associated with garden care.
 * It includes identifiers linking to the user and plants, tasks for garden maintenance, and a health level of the garden.
 *
 * Fields:
 *   userId: Reference to a User model, holds the MongoDB ObjectId of the garden owner.
 *   gardenId: String identifier for the garden, required to uniquely identify a garden.
 *   plants: Array of ObjectIds, each referencing a GardenPlantModel, representing plants in the garden.
 *   tasks: Array of ObjectIds, each referencing a Task model, representing tasks assigned to the garden.
 *   gardenHealthLevel: Numeric value representing the health level of the garden, with a maximum value of 1, indicating garden wellness.
 */
const GardenSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
  gardenId: {
    type: String,
    required: true,
  },
  plants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GardenPlantModel"}], //array of plants in the users garden
  tasks: [{  //array of tasks
    type: mongoose.Schema.Types.ObjectId, ref: "Task",
    }],

  gardenHealthLevel: { //garden health level
    type: Number,
    max: 1,
  }

});

const GardenModel = mongoose.model("GardenModel", GardenSchema);

module.exports = { 
  GardenModel,
  GardenPlantModel
};
