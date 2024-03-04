const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const build = require("../Module/plantCatalog/plantCatalogDBC");
const bodyParser = require('body-parser');

const PlantModel = require("../Module/schemas/PlantSchema");
const uri = process.env.PLANTDB_URL;
const plantAPI = process.env.PERENNIALAPI_KEY;
const key = process.env.PERENNIALAPI_KEY_RAW;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// plant objects 
const { PlantOBJ, Zone, Seasson } = require('../Module/plantCatalog/plantObj');

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
        console.log("Sending Json Data");
        res.status(200).json({data});
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

router.patch("/", async (req, res) => {
    console.log("Inside plantCatalog /patch");
    try {
        const pageNumber = req.query.page;
        const response = await fetch(`https://perenual.com/api/species-list?key=${key}&page=${pageNumber}`, { method: 'GET' });
        const data = await response.json();
        const dataArray = Object.values(data);
        //console.log(dataArray);
        const plantObjects = [];
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        for (const entry of dataArray[0]) {
            
            try {
                let image_url = [];
                const id = entry.id;
                const detailsResponse = await fetch(`https://perenual.com/api/species/details/${id}?key=${key}`, { method: 'GET' });
                const details = await detailsResponse.json();
                if(entry.default_image === null){
                    image_url.push("");
                } else {
                    image_url.push(entry.default_image.original_url);
                }
                const zone = new Zone(details.hardiness.max, entry.cycle);

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
                    description: details.description
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