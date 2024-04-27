/*
    File: tasks-schema.js
    Description:
        *This file is responsible for creating a schema for tasks
        *The file contains a schema for tasks
*/
const mongoose = require("mongoose");
const Plants  = mongoose.model('PlantModel');
const User = mongoose.model('User');


// Schema for tasks
// This feature is under construction
const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plants' },
    description: String, // e.g., 'Watering', 'Fertilizing'
    date: Date,
    image_urls: [String],
    completed: Boolean
  });

module.exports = mongoose.model('Task', taskSchema );