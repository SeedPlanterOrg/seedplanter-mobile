const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const port = 3000;
// default route
app.get("/", (req, res) => {
    console.log("Get request to server: no target route");
    // sends back a json object
    res.status(200).json({message: "server pinged"});
});

app.put("/", (req, res) =>{
    console.log("Put request to server: no target route");
    res.status(200).json({message: "server pinged"});
})

// allows json to be used in routes 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// declares a the router to plantCatalog.js
const plantCatalogRouter = require('./routes/plantCatalog');

// app.use is being used to link route to path in this case
// the route /plantCatalog is tied to ./routes/plantCatalog
app.use('/plantCatalog', plantCatalogRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const plantDeckRouter = require('./routes/plantDeck');
app.use('/plantDeck', plantDeckRouter);

const chatRouter = require('./routes/chat-routes');
app.use('/chat-routes', chatRouter);

// listens to requests on specified ports
app.listen(port);