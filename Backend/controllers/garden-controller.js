const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");
const {GardenModel, GardenPlantModel} = require('../models/garden-schema');
const PlantModel = require('../models/plant-schema');
const AppError = require('../middleware/appError');
const Task = require('../models/tasks-schema');
const uri = process.env.PLANTDB_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const { updateGardenHealth } = require('./gardenhealth-controller');

/**
 * Retrieves a garden and its plants for a specific user by user ID from a query.
 * Validates the input, connects to the database, and fetches the garden along with the plants in it.
 * Handles errors and ensures valid input data. If no garden is found or if the garden has no plants,
 * appropriate responses are returned.
 * 
 * @param {Object} req - The request object containing the user ID in query parameters.
 * @param {Object} res - The response object used to send back the fetched garden data.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Promise} A promise that resolves with the response object containing the garden and its plants.
 */
const getGardenByUserId = async (req, res, next) => {
  console.log("Getting garden");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new AppError('Invalid inputs passed, please check your data.', 422)
    );
  }
  try {
    await mongoose.connect(uri, clientOptions);
    const garden = await GardenModel.find({userId: req.query.userId});
    
    if(!garden || garden.length === 0) {
      return res.status(404).json({ message: "Garden not found" });
    } 

    let gardenPlantList = [];
    const gardenPlantIdList = garden[0].plants; 

    // Check if the garden has any plants before trying to access them
    if (gardenPlantIdList && gardenPlantIdList.length > 0) {
      for(let i = 0; i < gardenPlantIdList.length; i++){
        const gardenPlant = await GardenPlantModel.findById(gardenPlantIdList[i]).lean(); 
        if (gardenPlant) {
          gardenPlantList.push(gardenPlant);
        }
      }
    }

    if (gardenPlantList.length >= 1) {
      await updateGardenHealth(garden, gardenPlantList);
    }

    res.status(200).json({
      garden: garden,
      gardenPlants: gardenPlantList});
  } catch (err) {
    console.log(`Failed to get_garden ${err}`);
    return next(new AppError('Fetching garden failed, please try again later', 500));
  }
}

/**
 * Creates a new garden for a user with an initial set of empty properties and a base health level.
 * Validates input data using a validation function and attempts to connect to the database to create a new garden record.
 * Handles input validation errors and database errors by passing them to the next middleware function with an error response.
 * If the garden is successfully created, it returns the created garden object.
 *
 * @param {Object} req - The request object containing user data in the body.
 * @param {Object} res - The response object (unused in this function but typically used to send responses).
 * @param {Function} next - The next middleware function in the stack to handle errors.
 * @returns {Promise} A promise that resolves with the created garden object or an error.
 */
const createGarden = async (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new AppError('Invalid inputs passed, please check your data.', 422)
    );
  }

  await mongoose.connect(uri, clientOptions);
  const userId = req.body.id;
  let newGardenId = userId.toString();
  newGardenId += '1';

  console.log(userId);
  
  try {
    const createdGarden = await GardenModel.create({
      userId: userId,
      gardenId: newGardenId,
      plants: [],
      tasks: [],
      gardenHealthLevel: 1 // initial garden health level
    });
    
    // return to the signup function    
    return createdGarden;
    // res.status(201).json({message: "Garden Created"});
  
  } catch (err) {
    console.log("ERROR: " + err);
    return next(new AppError('Creating garden failed, please try again later', 500));
  }
};

/**
 * Adds a new plant to a user's garden by creating a garden-specific plant instance with detailed care settings.
 * Connects to the database to fetch a catalog plant by ID, creates a new garden plant with specific details and settings,
 * and then adds this plant to the user's garden. Handles input validation internally and database errors by passing
 * them to the next middleware function with an error response.
 * On success, updates the garden record in the database and sends a success response indicating the plant has been added.
 *
 * @param {Object} req - The request object containing the plant data and user/garden identifiers in the body.
 * @param {Object} res - The response object used to send back the success or error status.
 * @param {Function} next - The next middleware function in the stack for error handling.
 * @returns {Promise} A promise that resolves with a success response or an error handling function.
 */
const addPlant = async (req, res, next) => {
  console.log(req.body);
  await mongoose.connect(uri, clientOptions);
  
  // get static plant
  const catalogPlant = await PlantModel.find({id: req.body.gardenPlant.plantId});

  try {
      // create new garden plant 
      const newGardenPlant = await GardenPlantModel.create({
      userId: req.body.gardenPlant.userId,
      gardenId: req.body.gardenPlant.gardenId,
      plantId: req.body.gardenPlant.plantId,
      water: req.body.gardenPlant.water,
      fertilize: req.body.gardenPlant.fertilize,
      waterLevel: req.body.gardenPlant.waterLevel,
      lastWateringDate: req.body.gardenPlant.lastWateringDate,
      wateringInterval: req.body.gardenPlant.wateringInterval,
      wateringFrequency: req.body.gardenPlant.wateringFrequency,
      fertilizerLevel: req.body.gardenPlant.fertilizerLevel,
      lastFertilizingDate: req.body.gardenPlant.lastFertilizingDate,
      fertilizingFrequency: req.body.gardenPlant.fertilizingFrequency,
      fertilizingInterval: req.body.gardenPlant.fertilizingInterval,
      fertilizingFrequency: req.body.gardenPlant.fertilizingFrequency,
      notes: [req.body.gardenPlant.notes],
      imagesUrls: catalogPlant[0].image_urls,
      plantDetails: catalogPlant[0],
    });

    // find the garden by the user id they are the same
    console.log(`New Garden Plant Saved: ${newGardenPlant}`);
    const updateGarden = await GardenModel.findOne({userId: req.body.gardenPlant.userId});
    console.log('updateGardenDUBUG: ' + updateGarden);
    if (!updateGarden) {
      return res.status(404).json({ message: "Garden not found" });
    }
    //
    updateGarden.plants.push(newGardenPlant._id);
    await updateGarden.save();

    console.log(`Garden updated with new plant: ${newGardenPlant.plantId}`);
    res.status(200).json({ message: "Plant added to garden successfully" });

  } catch (err) {
    console.log(err);
    return next(new AppError('Add plant failed, please try again later', 500));
  }
};

/**
 * Deletes a plant from a user's garden by its ID and updates the garden record by removing the plant reference.
 * Attempts to find and delete the garden plant record in the database. If the plant is found and deleted,
 * the function then updates the garden record to remove the reference to this plant. If the plant or garden is not found,
 * it sends an appropriate error response. Handles errors during the database operations by sending an error response.
 *
 * @param {Object} req - The request object containing the userId and plantId in the body.
 * @param {Object} res - The response object used to send back the success or error status.
 * @param {Function} next - The next middleware function in the stack for error handling (unused in current implementation).
 * @returns {Promise} A promise that resolves with a success response if the plant is deleted, or an error response if not.
 */
const deletePlantById = async (req, res, next) => {
  try {
    // (TODO: ) remove plant from garden plant array then delete plant
    const userId = req.body.userId;
    const plantId = req.body.plantId; // Get the ID from the request parameters
    const deletedEntry = await GardenPlantModel.findByIdAndDelete(plantId);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Then, pull the plant ID from the garden's plant array
    const gardenUpdate = await GardenModel.findOneAndUpdate(
      { userId: userId },
      { $pull: { plants: plantId } },
      { new: true }
    );

    if (!gardenUpdate) {
      return res.status(404).json({ message: "Garden not found" });
    }

    // Send a response indicating successful deletion
    res.status(200).json({ message: "Plant successfully deleted from garden" });
  } catch (error) {
      // Handle any errors
      res.status(500).json({ message: error.message });
  }
}

module.exports = { 
  getGardenByUserId,
  createGarden, 
  addPlant,
  deletePlantById };
