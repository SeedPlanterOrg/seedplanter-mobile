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

router.post("/", (req, res) => {
    console.log("Posting in plantCatalog");
    console.log("name :" + req.body.name);  
    const javascriptObject = req.body;
    build(javascriptObject).catch(console.dir);
    res.status(200).json({message: "recieved JSON file"});
});

router.put("/", (req, res) => {
    console.log("Puting in update");
    res.status(200).json({message: "recieved JSON file"});
});

router.delete("/", (req, res) => {
    console.log("Deleteing item")
    res.status(200).json({message: "deleted"});
});

// 
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