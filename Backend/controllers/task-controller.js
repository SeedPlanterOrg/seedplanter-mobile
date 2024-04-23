const mongoose = require('mongoose');
const AppError = require('../middleware/appError');
const Task = require('../models/tasks-schema');
// const GardenPlant = require('../models/garden-plant-schema');
const {GardenModel, GardenPlantModel} = require('../models/garden-schema');



const generateTask = async (plant, taskType) => {
    const task = {
      userId: plant.userId,
      gardenId: plant.gardenId,
      plantId: plant._id,
      taskType,
      taskDate: new Date(),
      taskCompleted: false,
    };
  
    try {
        const savedTask = await mongoose.model('Task').create(task);
    } catch (err) {
      console.log(err);
      throw new AppError('Failed to create task', 500);
    }
  };

const getTasksByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    let tasks;
    try {
        tasks = await Task.find({ userId });
    } catch (err) {
        console.log(err);
        return next(new AppError('Failed to get tasks', 500));
    }
    res.status(200).json({ tasks });
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    const taskType = req.params.taskType;
    const gardenPlantId = req.params.plantId;
    // const userId = req.params.userId;
    //
    let gardenPlant;
    try {
        gardenPlant = await GardenPlantModel.findById(gardenPlantId);
    } catch (err) {
        console.log(err);
        return next(new AppError('Failed to find garden plant', 500));
    }


    if (!gardenPlant) {
        return next(new AppError('Plant not found', 404));
    }

    if (taskType === 'Water') {
        gardenPlant.waterLevel = 1;
        gardenPlant.lastWateringDate = new Date();
        gardenPlant.notifyWateringTask = false;
    } else if (taskType === 'Fertilize') {
        gardenPlant.fertilizerLevel = 1;
        gardenPlant.lastFertilizingDate = new Date();
        gardenPlant.notifyFertilize = false;
    }

    gardenPlant.save();
  
    try {
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
      console.log(err);
      return next(new AppError('Failed to delete task', 500));
    }
  };
  
  module.exports = { generateTask, deleteTask };