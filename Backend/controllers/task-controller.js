// const mongoose = require('mongoose');
// const AppError = require('../utils/app-error');
// const Task = require('../models/task-schema');
// const GardenPlant = require('../models/garden-plant-schema');
// const {GardenModel, GardenPlantModel} = require('../models/garden-schema');



// const generateTask = async (plant, taskType) => {
//     const task = {
//       userId: plant.userId,
//       gardenId: plant.gardenId,
//       plantId: plant._id,
//       taskType,
//       taskDate: new Date(),
//       taskCompleted: false,
//     };
  
//     try {
//         const savedTask = await mongoose.model('Task').create(task);
//         // savedTask.save();
//         constsavedTask._id
//     } catch (err) {
//       console.log(err);
//       throw new AppError('Failed to create task', 500);
//     }
//   };

// const deleteTask = async (req, res, next) => {
//     const taskId = req.params.id;
//     const gardenPlantId = req.params.plantId;
//     // const userId = req.params.userId;
//     //
//     let gardenPlant;
//     try {
//         gardenPlant = await GardenPlantModel.findById(gardenPlantId);
//     } catch (err) {
//         console.log(err);
//         return next(new AppError('Failed to find garden plant', 500));
//     }


//     if (!gardenPlant) {
//         return next(new AppError('Plant not found', 404));
//     }

//     gardenPlant.waterLevel = 1;
//     gardenPlant.fertilizerLevel = 1;
//     gardenPlant.lastWateringDate = new Date();
//     gardentPlant.lastFertilizingDate = new Date();
//     gardenPlant.notifyWateringTask = false;
//     gardenPlant.notifyFertilize = false;

//     gardenPlant.save();
  
//     try {
//       await Task.findByIdAndDelete(taskId);
//       res.status(200).json({ message: 'Task deleted' });
//     } catch (err) {
//       console.log(err);
//       return next(new AppError('Failed to delete task', 500));
//     }
//   };
  
  // module.exports = { generateTask, deleteTask };