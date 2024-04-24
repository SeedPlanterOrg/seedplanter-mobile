const mongoose = require("mongoose");
require("dotenv").config();
const Plant = require("../models/plant-schema");
const uri = process.env.PLANTDB_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

/**
 * Asynchronous function to create and save a new plant document to MongoDB.
 * Connects to MongoDB using predefined URI and client options, and pings the server to ensure the connection is live.
 * Takes a plant object, constructs a new Plant model, and attempts to save it to the database.
 * It logs the plant data before and after insertion to facilitate debugging and monitoring.
 * If any part of the process fails (e.g., database connection issues, document validation errors), it logs the error message.
 * Finally, it ensures the MongoDB connection is closed after the operation completes, regardless of success or failure.
 *
 * @param {Object} plantObj - An object containing all necessary data to create a plant document. Expected structure:
 *                            {
 *                              id: Number,
 *                              binomial_name: String,
 *                              name: String,
 *                              daily_watering: String,
 *                              zone: { hardy: Number, seasons: String },
 *                              light: [String],
 *                              care_level: String,
 *                              image_urls: [String],
 *                              description: String
 *                            }
 */
async function build(plantObj) {
  
  try {
    console.log("Async running");
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(plantObj);
    try {
        const plant = await Plant.create({
            id: plantObj.id,
            binomial_name: plantObj.binomial_name,
            name: plantObj.name,
            daily_watering: plantObj.daily_watering,
            zone: {
                hardy: plantObj.zone.hardy,
                seasons: plantObj.zone.seasons
            },
            light: plantObj.light,
            care_level: plantObj.care_level,
            image_urls: plantObj.image_urls,
            description: plantObj.description
          });
            
        await plant.save();
        console.log(plant);
    } catch (e){
        console.log(e.message);
    }
   
  } finally {

    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
//build().catch(console.dir);

module.exports = build;