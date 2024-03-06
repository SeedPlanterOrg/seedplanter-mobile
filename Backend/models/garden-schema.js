const mongoose = require("mongoose");
const Plants  = mongoose.model('PlantModel');


const userGardenSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
  plants: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "Plants",
    waterLevel: {
        type: Number
    },
    fertilizerLever: {
        type: Number
    },
    journalEntries: [{
        type: mongoose.Schema.Types.ObjectId, ref:"JournalEntry",
    }],
    }],
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "Task",
    }],
  gardenHealthLevel: [{
    type: Number,
  }]
});

const UserGarden = mongoose.model("UserGarden", userGardenSchema);

module.exports = UserGarden;
