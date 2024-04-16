const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");
// const HttpError = require('../models/http-error');
// const getCoordsForAddress = require('../util/location');
const {GardenModel, GardenPlantModel} = require('../models/garden-schema');
const PlantModel = require('../models/plant-schema');
// const tasks = require('../models/tasks-schema');
const AppError = require('../middleware/appError');
const Task = require('../models/tasks-schema');

const uri = process.env.PLANTDB_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let DUMMY_GARDENS = [
    {
      gardenId: 'g1',
      userId: 'u1',
      plants: [
        {
          _id: 'p1', // Assuming an _id for each plant for identification
          plantId: 'plant1', // Reference to a Plant model if applicable
          waterLevel: 75,
          lastWateringDate: new Date('2024-03-01'),
          fertilizerLevel: 50,
          lastFertilizingDate: new Date('2024-03-02'),
          wateringInterval: 3,
          wateringFrequency: 'daily',
          fertilizingInterval: 7,
          fertilizingFrequency: 'weekly',
          journalEntries: [
            'je1', // These could be references to actual JournalEntry documents in a real application
          ],
          imagesUrls: [
            'http://example.com/image1.jpg',
          ],
        },
        {
          _id: 'p2',
          plantId: 'plant2', // Reference to another Plant model if applicable
          waterLevel: 60,
          lastWateringDate: new Date('2024-03-03'),
          fertilizerLevel: 40,
          lastFertilizingDate: new Date('2024-03-04'),
          wateringInterval: 2,
          wateringFrequency: 'daily',
          fertilizingInterval: 2,
          fertilizingFrequency: 'weekly',
          journalEntries: [
            'je2', // Another hypothetical journal entry reference
          ],
          imagesUrls: [
            'http://example.com/image2.jpg',
          ],
        }
      ],
      tasks: [
        {
          _id: 't1', // Assuming an _id for each task for identification
          name: 'Water Plant',
          description: 'Water all plants in the garden',
          date: new Date('2024-03-05'),
          completed: false, 
        }
      ],
      gardenHealthLevel: 80,
    }
  ];

// const getGardenById = async (req, res, next) => {
//   const gardenId = req.body.gardenId; // { uid: 'v1' }

//   let garden;
//   try {
//     place = await GardenModel.findById(gardenId); //find garden by uid
//   } catch (err) {
//     return next('Something went wrong, could not find a garden.',500);
//   }

//   if (!garden) {
//     return next(new AppError('Could not find a garden for the provided id.', 404));
//   }

//   res.json({ garden: garden.toObject({ getters: true }) }); // => { place } => { place: place }
// };

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

// const getGardenByUserId = async (req, res, next) => {
//   const userId = req.body.userId;

//   let garden;
//   try {
//     garden = await GardenModel.find({ userId: userId });
//   } catch (err) {
//     return next(new AppError('Fetching garden failed, please try again later', 500));
//   }

//   if (!garden || garden.length === 0) {
//     return next(
//       new AppError('Could not find garden for the provided user id.', 404)
//     );
//   }

//   res.json({ garden: garden .map(garden => garden.toObject({ getters: true })) });
// };

// const getGardenById

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

    res.status(200).json({
      garden: garden,
      gardenPlants: gardenPlantList});
  } catch (err) {
    console.log(`Failed to get_garden ${err}`);
    return next(new AppError('Fetching garden failed, please try again later', 500));
  }
}

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
      gardenHealthLevel: 100 // initial garden health level
    });
    
    // await createdGarden.save();
    res.status(201).json({message: "Garden Created"});
  
  } catch (err) {
    console.log("ERROR: " + err);
    return next(new AppError('Creating garden failed, please try again later', 500));
  }
};

const addPlant = async (req, res, next) => {
  console.log(req.body);
  await mongoose.connect(uri, clientOptions);
  const userId = req.body.gardenPlant.id;
  const plantId = req.body.gardenPlant.plantId;
  
  // get static plant
  const catalogPlant = await PlantModel.find({id: plantId});

  try {
      // create new garden plant 
      const newGardenPlant = await GardenPlantModel.create({
      gardenId: userId,
      plantId: plantId, 
      water: req.body.gardenPlant.water,
      fertilize: req.body.gardenPlant.fertilize,
      waterLevel: req.body.gardenPlant.waterLevel,
      lastWateringDate: req.body.gardenPlant.date,
      wateringInterval: req.body.gardenPlant.wateringInterval,
      wateringFrequency: req.body.gardenPlant.wateringFrequency,
      fertilizerLevel: req.body.gardenPlant.fertilizerLevel,
      lastFertilizingDate: req.body.gardenPlant.lastFertilizingDate,
      fertilizingFrequency: req.body.gardenPlant.fertilizingFrequency,
      fertilizingInterval: req.body.gardenPlant.fertilizingInterval,
      notes: [req.body.gardenPlant.notes],
      imagesUrls: catalogPlant[0].image_urls,
      plantDetails: catalogPlant[0],
    });

    // find the garden by the user id they are the same
    console.log(`New Garden Plant Saved: ${newGardenPlant}`);
    const updateGarden = await GardenModel.findById(req.body.gardenPlant._id);
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

const deletePlantById = async (req, res, next) => {
  try {
    // (TODO: ) remove plant from garden plant array then delete plant
    const userId = req.body.userId;
    const plantId = req.body.plantId; // Get the ID from the request parameters

    // Use the findByIdAndDelete method to remove the document
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

// const deleteGarden = async (req, res, next) => {
//   const placeId = req.params.pid;

//   let place;
//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete garden',
//       500
//     );
//     return next(error);
//   }

//   try {
//     await place.remove();
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not delete place.',
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ message: 'Deleted place.' });
// };

module.exports = { 
  getGardenByUserId,
  createGarden, 
  addPlant,
  deletePlantById };
// exports.updateGarden = updateGarden;
// exports.deleteGarden = deleteGarden;