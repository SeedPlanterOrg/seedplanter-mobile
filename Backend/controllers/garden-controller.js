const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

// const HttpError = require('../models/http-error');
// const getCoordsForAddress = require('../util/location');
const Garden = require('../models/garden-schema');
// const tasks = require('../models/tasks-schema');
const AppError = require('../middleware/appError');
const Task = require('../models/tasks-schema');

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

const getGardenById = async (req, res, next) => {
  const gardenId = req.params.gardenId; // { uid: 'v1' }

  let garden;
  try {
    place = await Garden.findById(gardenId); //find garden by uid
  } catch (err) {
    return next('Something went wrong, could not find a garden.',500);
  }

  if (!garden) {
    return next(new AppError('Could not find a garden for the provided id.', 404));
  }

  res.json({ garden: garden.toObject({ getters: true }) }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getGardenByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let garden;
  try {
    garden = await Garden.find({ userId: userId });
  } catch (err) {
    return next(new AppError('Fetching garden failed, please try again later', 500));
  }

  if (!garden || garden.length === 0) {
    return next(
      new AppError('Could not find garden for the provided user id.', 404)
    );
  }

  res.json({ garden: garden .map(garden => garden.toObject({ getters: true })) });
};

const createGarden = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new AppError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { userId, plants } = req.body;

  let gardenPlants = [];
  try {
    for (let plantId of plants) {
      const plant = await PlantModel.findById(plantId);
      if (!plant) {
        return next(new AppError(`No plant found with id: ${plantId}`, 404));
      }
      gardenPlants.push(plant);
    }
  } catch (error) {
    return next(new AppError('Fetching plants failed, please try again later', 500));
  }

  const createdGarden = new Garden({
    userId,
    plants: gardenPlants,
    tasks: [],
    gardenHealthLevel: 0 // initial garden health level
  });

  try {
    await createdGarden.save();
  } catch (err) {
    return next(new AppError('Creating garden failed, please try again.', 500));
  }

  res.status(201).json({ garden: createdGarden });
};

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

exports.getGardenByUserId = getGardenByUserId;
exports.createGarden = createGarden;
// exports.updateGarden = updateGarden;
// exports.deleteGarden = deleteGarden;