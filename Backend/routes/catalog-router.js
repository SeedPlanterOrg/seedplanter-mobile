const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const build = require("../utils/plantCatalogDBC");
const bodyParser = require('body-parser');

const PlantModel = require("../models/plant-schema");
const uri = process.env.PLANTDB_URL;
const plantAPI = process.env.PERENNIALAPI_KEY;
const key = process.env.PERENNIALAPI_KEY_RAW;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// plant objects 
const { PlantOBJ, Zone, Seasson } = require('../utils/plantObj');

/**
 * Route handler for fetching a specific page of plant data from a MongoDB database using Mongoose.
 * This route expects a 'page' query parameter which is used to fetch a corresponding set of plant data.
 * The function establishes a connection to the database, retrieves the specified page of plant data, and returns it to the client.
 * It handles database connection errors and data fetching errors by logging the errors and sending appropriate HTTP status codes with error messages.
 * The database connection is explicitly closed after the data fetching operation, regardless of its success or failure.
 *
 * @param {Object} req - The HTTP request object, expects a 'page' query parameter.
 * @param {Object} res - The HTTP response object used for sending back the fetched data or error messages.
 */
router.get("/", async (req, res) => {
    const page = req.query.page;

    try {
        await mongoose.connect(uri, clientOptions);
    } catch(error) {
        console.error("Error connecting to database: ", error);
        res.status(500).json({message: "Failed to retrieve documents"});
    }
    
    console.log("You are in plantCatalog.js");
    try {
        // sends back a page of plants for frontend 
        const data = await PlantModel.find({ page: page });
        console.log("Sending Json Data");
        res.status(200).json({data});
    } catch(error) {
        console.error("Error fetching data:", error);
        res.status(500).json({message: "Failed to retrieve documents"});
    } finally {
        await mongoose.disconnect();
    }
});

/**
 * Route handler for fetching a single plant's data from a MongoDB database using Mongoose based on a plant ID.
 * This route expects an 'id' query parameter which specifies the plant ID to fetch from the database.
 * The function connects to the database, queries for the plant using the provided ID, and returns the plant data if found.
 * If no plant data is found, or if an error occurs during the database connection or the query process,
 * it logs the error and returns an appropriate HTTP status code with an error message.
 * The database connection is explicitly closed after attempting to fetch the data, ensuring clean resource management regardless of the outcome.
 *
 * @param {Object} req - The HTTP request object, expects an 'id' query parameter.
 * @param {Object} res - The HTTP response object used for sending back the plant data or error messages.
 */
router.get("/plant", async (req, res) => {
    const id = req.query.id;
    try {
        await mongoose.connect(uri, clientOptions);
    } catch(error) {
        console.error("Error connecting to database: ", error);
        res.status(500).json({message: "Failed to retrieve document"});
    }
    
    console.log("You are in plantCatalog.js");
    try {
        const data = await PlantModel.find({ id: id });
        if (!data || data.length === 0) {
            res.status(500).json({data});
        } else {
            console.log('Query succeeded:', data);
            console.log("Sending Json Data");
            res.status(200).json({data});
        }
        
    } catch(error) {
        console.error("Error fetching data:", error);
        res.status(500).json({message: "Failed to retrieve documents"});
    } finally {
        await mongoose.disconnect();
    }
});

/**
 * Route handler for receiving and processing a JSON object representing plant data.
 * This POST route captures a JSON object from the request body, which includes plant information.
 * The function logs the receipt of the data, specifically noting the name of the plant, and then attempts to process this data
 * using a `build` function, which presumably handles the construction or storage of the plant data in a database.
 * Errors during the `build` process are logged. Upon successful receipt and initiation of processing,
 * the route sends back a 200 HTTP status code with a message confirming the receipt of the data.
 *
 * @param {Object} req - The HTTP request object, expects a JSON object in the body containing plant data.
 * @param {Object} res - The HTTP response object used to confirm the receipt of data.
 */
router.post("/", (req, res) => {
    console.log("Posting in plantCatalog");
    console.log("name :" + req.body.name);  
    const javascriptObject = req.body;
    build(javascriptObject).catch(console.dir);
    res.status(200).json({message: "recieved JSON file"});
});

// ping functions for put and delete
router.put("/", (req, res) => {
    console.log("Puting in update");
    res.status(200).json({message: "recieved JSON file"});
});

router.delete("/", (req, res) => {
    console.log("Deleteing item")
    res.status(200).json({message: "deleted"});
});

/**
 * Route handler for updating plant data by fetching new information from an external API and updating the local database.
 * This PATCH route expects a 'page' query parameter to fetch a specific page of plant data from the 'perenual' API.
 * The function first retrieves the plant list from the external API, then for each plant, fetches detailed information,
 * including care guides. It constructs an array of new plant objects with detailed attributes. These are then batch inserted into
 * the MongoDB database. If any step fails, appropriate error handling is performed and an error message is returned.
 *
 * Steps:
 * 1. Fetch the list of plants from the external API based on the page number.
 * 2. Connect to the local MongoDB database.
 * 3. For each plant, fetch detailed information and construct a plant object.
 * 4. Insert the new plant data into the database.
 * 5. Disconnect from the database and return the new plant data or an error message.
 *
 * @param {Object} req - The HTTP request object, expects a 'page' query parameter.
 * @param {Object} res - The HTTP response object used for sending back either the list of updated plant data or an error message.
 */
router.patch("/", async (req, res) => {
    console.log("Inside plantCatalog /patch");
    try {
        // get a new page of plants from perrinual
        const pageNumber = req.query.page;
        const response = await fetch(`https://perenual.com/api/species-list?key=${key}&page=${pageNumber}`, { method: 'GET' });
        const data = await response.json();
        const dataArray = Object.values(data);
        const plantObjects = [];
        
        // connect to our db
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // for every entry in the page we need to pull its details and guide 
        for (const entry of dataArray[0]) {
            
            // try a fetch if it fails log it and get a new plant 
            try {
                let image_url = [];
                const id = entry.id;
                const detailsResponse = await fetch(`https://perenual.com/api/species/details/${id}?key=${key}`, { method: 'GET' });
                const details = await detailsResponse.json();
                let careGuide;
                if(entry.default_image === null){
                    image_url.push("");
                } else {
                    image_url.push(entry.default_image.original_url);
                }
                const zone = new Zone(details.hardiness.max, entry.cycle);
                
                // based off entry details try to get plant-guide
                let careGuidesURL = details['care-guides'];
                try{
                    const careGuideResponse = await fetch(careGuidesURL);
                    careGuide = await careGuideResponse.json();
                    
                } catch (err) {
                    console.error("Failed to fetch care-guides: " + err);
                }

                const plantObj = new PlantOBJ({
                    id: entry.id,
                    page: pageNumber,
                    binomial_name: entry.scientific_name[0],
                    name: entry.common_name,
                    daily_watering: entry.watering,
                    zone: zone,
                    light: entry.sunlight,
                    care_level: details.care_level,
                    image_urls: image_url,
                    description: details.description,
                    watering_description: careGuide.data[0].section[0].description,
                    sunlight_description: careGuide.data[0].section[1].description,
                    pruning_description: careGuide.data[0].section[2].description,
                    hardiness_url: details.hardiness_location.full_url
                });
                plantObjects.push(plantObj);
            } catch (error) {
                console.error("Error fetching plant details:", error);
            }
           
        }

        // add to datbase
        try{
            await PlantModel.insertMany(plantObjects);
            await mongoose.disconnect();
            res.status(200).json(plantObjects);
        } catch (err){
            console.log("failed to insert plant list:" + err);
            res.status(500).json({ error: "Failed to insert plant data" });
        }
 
    } catch (error) {
        console.error("Failed to get plant data:", error);
        res.status(500).json({ error: "Failed to get plant data" });
    }
    
});

module.exports = router;