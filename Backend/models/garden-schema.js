const mongoose = require("mongoose");
const Plants  = mongoose.model('PlantModel');
const User = mongoose.model('User');
// const Task = mongoose.model('Task');


const gardenPlantSchema = new mongoose.Schema({
  gardenId: {
    type: String,
    required: true,
  },
  plantId: {
    type: Number, 
    required: true
  },
  water: {
    type: Boolean,
    required: true
  },
  fertilize: {
    type: Boolean,
    required: true
  },
  waterLevel: {
    type: Number,
    max: 100
  },
  lastWateringDate: {
    type: Date
  },
  wateringInterval: {
    type: Number
  },
  wateringFrequency: { 
    type: String
  },
  nextWateringDate: {
    type: Date
  },
  fertilizerLevel: {
    type: Number,
    max: 100
  },
  lastFertilizingDate: {
    type: Date
  },
  // fertilizingInterval: {
  //   type: Number
  // },
  // fertilizingFrequency: {
  //   type: String
  // },
  // nextFertilizingDate: {
  //   type: Date
  // },
  notes: [{
    // for now 
    //type: mongoose.Schema.Types.ObjectId, 
    //ref: "JournalEntry"
    type: String // delete me once journal is up
  }],
  imagesUrls: [{
    type: String
  }],
  plantDetails: {
    type: Object,
    required: true
  },
});

const GardenPlantModel = mongoose.model("GardenPlantModel", gardenPlantSchema);


const GardenSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
  gardenId: {
    type: String,
    required: true,
  },
  plants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "GardenPlantModel"}], //array of plants in the users garden
  tasks: [{  //array of tasks
    type: mongoose.Schema.Types.ObjectId, ref: "Task",
    }],

  gardenHealthLevel: { //garden health level
    type: Number,
    max: 100
  }

});

const GardenModel = mongoose.model("GardenModel", GardenSchema);

module.exports = { 
  GardenModel,
  GardenPlantModel
};
