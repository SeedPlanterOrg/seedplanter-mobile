const mongoose = require("mongoose");
const express = require('express');
const AppError = require('./middleware/appError')
const app = express();
const globalErrorhandler = require('./controllers/error-controller');
const bodyParser = require('body-parser');
require('dotenv').config();

const uri = process.env.PLANTDB_URL; //connect to mongo
console.log(uri);
mongoose.connect(uri).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!')
});

const port = 3000;
app.get("/", (req, res) => {

    console.log("Get request to server: no target route");// default route
    res.status(200).json({message: "server pinged"});    // sends back a json object
});

app.put("/", (req, res) =>{

    console.log("Put request to server: no target route");
    res.status(200).json({message: "server pinged"});
})

// allows json to be used in routes 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// declares a the router to plantCatalog.js
const plantCatalogRouter = require('./routes/catalog-router');

// app.use is being used to link route to path in this case
// the route /plantCatalog is tied to ./routes/plantCatalog
app.use('/plantCatalog', plantCatalogRouter);

const userRouter = require('./routes/user-routes');
app.use('/user', userRouter);

const plantDeckRouter = require('./routes/garden-router');
app.use('/plantDeck', plantDeckRouter);

const chatRouter = require('./routes/chat-routes');
app.use('/chat-routes', chatRouter);


app.all('*', (req, res, next)=> { 
    next(new AppError(`Can't find ${req.originalUrl}`, 404)); //throw error if using a non-existant route.
});

app.use(globalErrorhandler);


app.listen(port); // listens to requests on specified ports

