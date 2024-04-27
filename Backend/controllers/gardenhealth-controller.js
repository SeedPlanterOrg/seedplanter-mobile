/*
  File: gardenhealth-controller.js
  Description:
    *This file is responsible for updating the health level of the garden 
    *The file contains a function to the water and fertilizer levels of each plant in the users garden
  Functions: updateGardenHealth() - Function used to update the health of the garden
*/
const {GardenModel, GardenPlantModel} = require('../models/garden-schema');
const AppError = require('../middleware/appError');
const mongoose = require('mongoose');
const moment = require('moment'); // Ensure moment is installed
const { generateTask } = require('./task-controller');

// Function to update the health of the garden
const updateGardenHealth = async (garden, gardenPlants) => {

  // Initialize the variables needed to calculate the average garden health level
  let totalWaterLevel = 0;
  let totalFertilizerLevel = 0;
  let count = 0;

  // Object to store frequency multipliers for watering and fertilizing (used to manipulate dates)
  const frequencyMultiplier = {
    daily: 1,
    weekly: 7,
    monthly: 30,
  };

  // Get the current date and time -> this function is called when the getGarden function is called in the frontend
  const now = moment();

  // Log the garden and garden plant details
  // Debugging
  // console.log("------------------------------------------------------------------");
  // console.log("GARDEN PLANT LIST: " + gardenPlants);
  // console.log("------------------------------------------------------------------");
  // console.log("GARDEN : " + garden);
  // console.log("------------------------------------------------------------------");

  await Promise.all(gardenPlants.map(async (plant) => {
    const millisecondsInADay = 24 * 60 * 60 * 1000;

  // Update and calculate watering details
  if (plant.lastWateringDate && plant.wateringFrequency && plant.wateringInterval) {
    
    // Calculate the number of milliseconds to add to the last watering date to get the next watering date
    const millisecondsToAdd = (frequencyMultiplier[plant.wateringFrequency] * millisecondsInADay) / plant.wateringInterval;
    plant.nextWateringDate = moment(plant.lastWateringDate).add(millisecondsToAdd, 'milliseconds').toDate();
  
    // Calculate the water level of the plant
    const timeSinceLastWater = now.diff(moment(plant.lastWateringDate)); // Difference between now and the last watering date = time since last water
    const timeUntilNextWater = moment(plant.nextWateringDate).diff(now); // Difference between the next watering date and now = time until next water
    plant.waterLevel = timeUntilNextWater / (timeUntilNextWater + timeSinceLastWater);

    // If the water level is less than or equal to 0, the plant needs watering
    if (plant.waterLevel < 0 || plant.notifyWater === false) {
      console.log(`Plant ${plant._id} needs watering`);
      plant.waterLevel = 0; 
      plant.notifyWateringTask = true;
      // generateTask(plant, 'water'); //pending
    }

    // Add the plants water level to the total water level
    totalWaterLevel += plant.waterLevel;
    
    // Log the water level of the plant
    console.log(`Water Level for plant ${plant._id}: ${plant.waterLevel}`);
    
    // Increment the count of plants
    count++;
  }
  
  // Update and calculate fertilizing details
  if (plant.lastFertilizingDate && plant.fertilizingFrequency && plant.fertilizingInterval) {

    // Calculate the number of milliseconds to add to the last fertilizing date to get the next fertilizing date
    const millisecondsToAdd = (frequencyMultiplier[plant.fertilizingFrequency] * millisecondsInADay) / plant.fertilizingInterval;
    plant.nextFertilizingDate = moment(plant.lastFertilizingDate).add(millisecondsToAdd, 'milliseconds').toDate();

    // Calculate the fertilizer level of the plant
    const timeSinceLastFertilize = now.diff(moment(plant.lastFertilizingDate));
    const timeUntilNextFertilize = moment(plant.nextFertilizingDate).diff(now);
    plant.fertilizerLevel = timeUntilNextFertilize / (timeUntilNextFertilize + timeSinceLastFertilize);

    // If the fertilizer level is less than or equal to 0, the plant needs fertilizing
    if (plant.fertilizerLevel <= 0 || plant.notifyFertilize === false) {
      console.log(`Plant ${plant._id} needs fertilizing`);
      plant.fertilizerLevel = 0; 
      plant.notifyFertilizingTask = true;
      // generateTask(plant, 'fertilize'); //pending
    }

    // Add the fertilizer level to the total fertilizer level
    totalFertilizerLevel += plant.fertilizerLevel;

    // Log the fertilizer level of the plant
    console.log(`Fertilizer Level for plant ${plant._id}: ${plant.fertilizerLevel}`);
  }

    // Save updated plant details to the database
    try {
        await mongoose.model('GardenPlantModel').findByIdAndUpdate(plant._id, plant);
    } catch (err) {
      console.log(err);
      throw new AppError('Failed to update garden plant levels', 500);
    }

  }));

  // Calculate and update garden health level
  if (count > 0) {

    // Calculate the average water and fertilizer levels
    const averageWaterLevel = totalWaterLevel / count;
    const averageFertilizerLevel = totalFertilizerLevel / count;
    let gardenHealthLevel = (averageWaterLevel + averageFertilizerLevel) / 2;

    // Clamp the gardenHealthLevel to be within 0 and 1
    // gardenHealthLevel = Math.max(0, Math.min(gardenHealthLevel, 1));

    console.log(`Clamped Garden Health Level: ${gardenHealthLevel}`);

    // Update the garden health level in the database
    try {
        //find garden by userId and update the garden health level
        await GardenModel.findOneAndUpdate(garden.userId, { gardenHealthLevel });
    } catch (err) {
        console.log(err);
        //throw an error if the garden health level cannot be updated
        throw new AppError('Failed to update garden health level', 500);
    }
}
};

module.exports = { updateGardenHealth };