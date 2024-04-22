const mongoose = require('mongoose');


const journalEntryModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  page_number: {
    type: Number,
  }, 
  subject: {
    type: [String],
    max: 4
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model('journalEntryModel', journalEntryModel )
  