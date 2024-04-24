const mongoose = require("mongoose");
const express = require('express');
const AppError = require('./middleware/appError')
const app = express();
const globalErrorhandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
require('dotenv').config();

// opens database connection 
const uri = process.env.PLANTDB_URL;
console.log(uri);
mongoose.connect(uri).then(con => {
    console.log(con.connections);
    console.log('DB connection successful!')
});

const port = process.env.PORT || 3000; // port number];
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
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// declares a the router to plantCatalog.js
const plantCatalogRouter = require('./routes/catalog-router');

// app.use is being used to link route to path in this case
// the route /plantCatalog is tied to ./routes/plantCatalog
app.use('/plantCatalog', plantCatalogRouter);

const userRouter = require('./routes/user-routes');
app.use('/user', userRouter);

const gardenRouter = require('./routes/garden-router');
app.use('/garden', gardenRouter);

const chatRouter = require('./routes/chat-routes');
app.use('/chat', chatRouter);

const journalRouter = require('./routes/journal-router');
app.use('/journal', journalRouter);


app.all('*', (req, res, next)=> { 
    next(new AppError(`Can't find ${req.originalUrl}`, 404)); //throw error if using a non-existant route.
});

app.use(globalErrorhandler);


app.listen(port); // listens to requests on specified ports

