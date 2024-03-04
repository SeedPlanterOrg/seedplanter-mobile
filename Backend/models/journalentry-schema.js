const mongoose = require('mongoose');


const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plants",
  },
  date: Date,
  images: {
    type: [String],
    max: 4
  },
  notes: {
    type: [String],
  },
  waterLevel:{
    type: Number,
  },
  fertilizerLevel: {
    type: Number,
  },
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema )
  