/*
  File: task-controller.js
  Description:
      *This file is responsible for handling tasks
      *The file contains functions that are used to handle tasks
      *This file is still under construction
      *Is called in the garden-health.controller.js file
  Functions:
      *generateTask() - Function used to generate a task
      *getTasksByUserId() - Function used to get tasks by user id
      *deleteTask() - Function used to delete a task
*/
const mongoose = require('mongoose');
const AppError = require('../middleware/appError');
const Task = require('../models/tasks-schema');
// const GardenPlant = require('../models/garden-plant-schema');
const {GardenModel, GardenPlantModel} = require('../models/garden-schema');


// Function to generate a task
const generateTask = async (plant, taskType) => {
    const task = {
      userId: plant.userId,
      gardenId: plant.gardenId,
      plantId: plant._id,
      taskType,
      taskDate: new Date(),
      taskCompleted: false,
    };
  
    // Save the task to the database
    try {
        const savedTask = await mongoose.model('Task').create(task);
    } catch (err) {
      console.log(err);
      throw new AppError('Failed to create task', 500);
    }
  };

// Function to get tasks by user id
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

// Function to delete a task
const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    const taskType = req.params.taskType;
    const gardenPlantId = req.params.plantId;
    // const userId = req.params.userId;
  
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
        // If the task is a watering task, update the water level and last watering date
        gardenPlant.waterLevel = 1;
        gardenPlant.lastWateringDate = new Date();
        gardenPlant.notifyWateringTask = false;
    } else if (taskType === 'Fertilize') {
        // If the task is a fertilizing task, update the fertilizer level and last fertilizing date
        gardenPlant.fertilizerLevel = 1;
        gardenPlant.lastFertilizingDate = new Date();
        gardenPlant.notifyFertilize = false;
    }

    gardenPlant.save();
    
    // Delete the task from the database
    try {
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
      console.log(err);
      return next(new AppError('Failed to delete task', 500));
    }
  };
  
  module.exports = { generateTask, deleteTask };