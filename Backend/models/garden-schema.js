const mongoose = require("mongoose");
const Plants  = mongoose.model('PlantModel');
const User = mongoose.model('User');
// const Task = mongoose.model('Task');


const gardenPlantSchema = new mongoose.Schema({
  gardenId: {
    type: String,
    required: true
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Plant"
  },
  waterLevel: {
    type: Number,
    max: 100
  },
  lastWateringDate: {
    type: Date
  },
  fertilizerLevel: {
    type: Number,
    max: 100
  },
  lastFertilizingDate: {
    type: Date
  },
  journalEntries: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "JournalEntry"
  }],
  imagesUrls: [{
    type: String
  }]
});

const GardenPlant = mongoose.model("GardenPlant", gardenPlantSchema);
module.exports = GardenPlant;

const GardenSchema = new mongoose.Schema({
  gardenId: {
    type: String,
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
  plants: [gardenPlantSchema], //array of plants in the users garden

  // tasks: [{  //array of tasks
  //   type: mongoose.Schema.Types.ObjectId, ref: "Task",
  //   }],

  gardenHealthLevel: [{ //garden health level
    type: Number,
    max: 100
  }]

});

const Garden = mongoose.model("Garden", GardenSchema);

module.exports = Garden;
