const mongoose = require("mongoose");
require("dotenv").config();
const Plant = require("../models/plant-schema");
const uri = process.env.PLANTDB_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

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