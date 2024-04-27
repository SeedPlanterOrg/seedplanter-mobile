const mongoose = require('mongoose');

/**
 * Schema definition for a journal entry in MongoDB using Mongoose.
 * This schema records personal or gardening-related entries by users, capturing details about the entry such as date, images, and notes.
 * It also includes metadata like water and fertilizer levels associated with the entry, and other organizational attributes like page number, subject, and title.
 *
 * Fields:
 *   userId: Reference to a User model, holds the MongoDB ObjectId of the user who owns the journal entry.
 *   date: Date of the journal entry, capturing when the entry was made.
 *   images: Array of strings, each string is a URL to an image; maximum of 4 images allowed.
 *   notes: Array of strings, captures various notes the user wants to associate with the journal entry.
 *   waterLevel: Numeric value, records the water level noted in the journal entry.
 *   fertilizerLevel: Numeric value, records the fertilizer level noted in the journal entry.
 *   page_number: Numeric value, indicates the page number of the journal entry for physical journal correlation.
 *   subject: Array of strings, captures the subjects related to the journal entry; up to 4 subjects can be listed.
 *   title: String, provides a title for the journal entry, summarizing its content or theme.
 */

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
  