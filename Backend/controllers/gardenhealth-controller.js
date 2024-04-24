const {GardenModel, GardenPlantModel} = require('../models/garden-schema');
const AppError = require('../middleware/appError');
const mongoose = require('mongoose');
const moment = require('moment'); // Ensure moment is installed
const { generateTask } = require('./task-controller');

const updateGardenHealth = async (garden, gardenPlants) => {
  let totalWaterLevel = 0;
  let totalFertilizerLevel = 0;
  let count = 0;
  const frequencyMultiplier = {
    daily: 1,
    weekly: 7,
    monthly: 30,
  };

  const now = moment();

  console.log("------------------------------------------------------------------");
  console.log("GARDEN PLANT LIST: " + gardenPlants);
  console.log("------------------------------------------------------------------");
  console.log("GARDEN : " + garden);
  console.log("------------------------------------------------------------------");

  await Promise.all(gardenPlants.map(async (plant) => {
    const millisecondsInADay = 24 * 60 * 60 * 1000;
  // Update and calculate watering details
  if (plant.lastWateringDate && plant.wateringFrequency && plant.wateringInterval) {
    const millisecondsToAdd = (frequencyMultiplier[plant.wateringFrequency] * millisecondsInADay) / plant.wateringInterval;
    plant.nextWateringDate = moment(plant.lastWateringDate).add(millisecondsToAdd, 'milliseconds').toDate();
  
    const timeSinceLastWater = now.diff(moment(plant.lastWateringDate));
    const timeUntilNextWater = moment(plant.nextWateringDate).diff(now);
    plant.waterLevel = timeUntilNextWater / (timeUntilNextWater + timeSinceLastWater);


    if (plant.waterLevel < 0 || plant.notifyWater === false) {
      console.log(`Plant ${plant._id} needs watering`);
      plant.waterLevel = 0; 
      plant.notifyWateringTask = true;
      // generateTask(plant, 'water');
    }

    totalWaterLevel += plant.waterLevel;
    
    console.log(`Water Level for plant ${plant._id}: ${plant.waterLevel}`);
  
    count++;
  }
  
  // Update and calculate fertilizing details
  if (plant.lastFertilizingDate && plant.fertilizingFrequency && plant.fertilizingInterval) {
    const millisecondsToAdd = (frequencyMultiplier[plant.fertilizingFrequency] * millisecondsInADay) / plant.fertilizingInterval;
    plant.nextFertilizingDate = moment(plant.lastFertilizingDate).add(millisecondsToAdd, 'milliseconds').toDate();
  
    const timeSinceLastFertilize = now.diff(moment(plant.lastFertilizingDate));
    const timeUntilNextFertilize = moment(plant.nextFertilizingDate).diff(now);
    plant.fertilizerLevel = timeUntilNextFertilize / (timeUntilNextFertilize + timeSinceLastFertilize);

    if (plant.fertilizerLevel <= 0 || plant.notifyFertilize === false) {
      console.log(`Plant ${plant._id} needs fertilizing`);
      plant.fertilizerLevel = 0; 
      plant.notifyFertilizingTask = true;
      // generateTask(plant, 'fertilize');
    }

    totalFertilizerLevel += plant.fertilizerLevel;

  
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
    const averageWaterLevel = totalWaterLevel / count;
    const averageFertilizerLevel = totalFertilizerLevel / count;
    let gardenHealthLevel = (averageWaterLevel + averageFertilizerLevel) / 2;

    // Clamp the gardenHealthLevel to be within 0 and 1
    // gardenHealthLevel = Math.max(0, Math.min(gardenHealthLevel, 1));

    console.log(`Clamped Garden Health Level: ${gardenHealthLevel}`);

    try {
        await GardenModel.findOneAndUpdate(garden.userId, { gardenHealthLevel });
    } catch (err) {
        console.log(err);
        throw new AppError('Failed to update garden health level', 500);
    }
}
};



module.exports = { updateGardenHealth };