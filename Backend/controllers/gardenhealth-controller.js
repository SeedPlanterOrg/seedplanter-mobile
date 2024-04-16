// const {getGardenByUserId, createGarden} = require('../controllers/garden-controller');
// const mongoose = require("mongoose");
// const PlantModel = require('../models/plant-schema');
// const {GardenModel, GardenPlantModel} = require('../models/garden-schema');
// const { validationResult } = require('express-validator');
// const AppError = require('../middleware/appError');


// const uri = process.env.PLANTDB_URL;
// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// const updateGardenHealth = async (req, res, next) => {
//     //send userId in req
//     const data = getGardenByUserId(req, res, next);
//     const garden = data.garden;
//     const plants = data.gardenPlants;

//     const daily = 1;
//     const weekly = 7;
//     const monthly = 30;
//     const millisecondsInDay = 86400000;

//     // find averages for all of the health levels for the garden health level
//     // update the new garden health level

//     // get the health level for all of the garden plants
//     // calculate the new water level for the plant based on the last dates, interval, and frequency

//     /* 
//         frequency: daily, weekly, monthly
        
//         Enum:
//         daily: 1
//         weekly: 7
//         monthly: 30

//         wateringInterval: any integer
//         fertilizingInterval: any integer

//         lastWateringDate: date
//         lastFertilizingDate: date 


//     */

//     // calculate the new fertilizer level for the plant using the same method as above

//     // update plants in DB

//     // send back new garden and garden plants (data)



//     //await updatePlantHealth();
//     //await updateGardenHealth();
// }

// module.exports = { updateGardenHealth };