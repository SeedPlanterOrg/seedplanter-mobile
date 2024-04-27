const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");
const journalEntryModel = require('../models/journalentry-schema');
const bodyParser = require('body-parser');

// getEntryById.js

/**
 * Route handler to retrieve a journal entry by its ID.
 * @param {Object} req - request object, contatins query param of id.
 * @param {Object} res - response object.
 * @param {Function} next - next middleware function.
 */
const getEntryById = async (req, res, next) => {
    try {
        const id = req.query.id;
        console.log('id: ' + id);
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        // Retrieve all entries from the database
        const entry = await journalEntryModel.findById(id);
        console.log(entry);
        // Check if there are any entries found
        if (!entry || entry.length === 0) {
            // If no entries are found, send a 404 response
            return res.status(404).json({ message: "No entry found" });
        }

        // If entries are found, send them in the response
        res.status(200).json(entry);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: error.message });
    }
};

/**
 * Route handler to retrieve a journal entry by its ID.
 * @param {Object} req - request object, contatins query param of id.
 * @param {Object} res - response object.
 * @param {Function} next - next middleware function.
 */
const getAllEntries = async (req, res, next) => {
    try {
        // Extract the ID from the request parameters
        const userId = req.query.id;

        // Use findById to retrieve the entry with the given ID
        const entry = await journalEntryModel.find({ userId: userId });

        // Check if the entry was found
        if (!entry) {
            // If not found, send a 404 response
            return res.status(404).json({ message: "Entry not found" });
        }

        // If found, send the entry in the response
        res.status(200).json(entry);
    } catch (error) {
        // Handle any errors that occur
        // You could call next with the error, or handle it directly
        // next(error);
        res.status(500).json({ message: error.message });
    }
};


// deleteEntryById.js

/**
 * Deletes an entry by its ID.
 * @param {_id} id - The ID of the entry.
 * @returns {JSON} The Json status
 */
const deleteEntryById = async (req, res, next ) => {
    try {
        const id = req.query.id; // Get the ID from the request parameters

        // Use the findByIdAndDelete method to remove the document
        const deletedEntry = await journalEntryModel.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        // Send a response indicating successful deletion
        res.status(200).json({ message: "Entry successfully deleted" });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

// createEntry.js

/**
 * Creates a new entry.
 * @param {JSON} entryData - reqest, response & next call back 
 * @returns {JSON} returns created entry.
 */
const createEntry = async (req, res, next ) => {
    try {
        
        // The JSON data sent from the client will be available in req.body
        const entryData = req.body;
        console.log("Data " + entryData.userId);
        console.log(journalEntryModel);
        // Validate entryData here as necessary

        // Create a new journal entry and save it to the database using .create method
        const createdEntry = await journalEntryModel.create(entryData);
        console.log("entry " + createdEntry);
        // Send the created entry back as a response
        res.status(201).json(createdEntry);
    } catch (error) {
        // Handle any errors
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

/**
 * Updates a journal entry with new data provided in the request body. 
 * The function locates an existing journal entry using its ID, updates it with new values, and returns the updated document.
 * It handles cases where the journal entry is not found by sending a 404 status response.
 * Any errors during the update process are passed to the next error handling middleware.
 *
 * @param {Object} req - The request object containing the updated data for the entry.
 * @param {Object} res - The response object used to send back the updated entry or an error message.
 * @param {Function} next - The next middleware function in the stack for error handling.
 * @returns {Promise} A promise that resolves with the updated entry or an error.
 */
const updateEntry = async (req, res, next) => {
    try {
        const updatedData = req.body;
        const id = updatedData._id;

        // Find the document by ID and update it with the new values.
        // { new: true } returns the updated document.
        console.log('Data to update: ' + updatedData);
        let updatedEntry = await journalEntryModel.findByIdAndUpdate(id, updatedData, { new: true });

        // Optionally, you might want to check if updatedEntry is not null (which means no document was found with that ID)
        if (!updatedEntry) {
            return res.status(404).send('Entry not found');
        }

        // Send back the updated entry or handle it otherwise
        res.send(updatedEntry);
    } catch (error) {
        // Error handling
        console.error('Failed to update the entry:', error);
        next(error);
    }
};

module.exports = {
    getEntryById,
    deleteEntryById,
    createEntry,
    getAllEntries,
    updateEntry
};