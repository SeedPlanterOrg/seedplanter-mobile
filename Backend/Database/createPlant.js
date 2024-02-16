const mongoose = require("mongoose");
require("dotenv").config();
const Plant = require("./Plant");
const uri = process.env.PLANTDB_URL;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };



async function run() {
  try {
    console.log("Async running");
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    try {
        const plant = await Plant.create({
            binomial_name: "Licktis",
            name: "cherry",
            daily_watering: 3,
            zone: {
                hardy: 60,
                seasons:
                {
                    annual: null,
                    perennial: ["10A", "11B"],
                    Bennial: null 
                },
            },
            average_height: 5,
            spacing: 10,
            fertilize: "weekly",
            light: 8,
            features: ["Has thorns", "Is Ugly"],
            care_level: "easy",
            image_urls: ["www.test1", "www.test2", "www.test3"]});
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
run().catch(console.dir);