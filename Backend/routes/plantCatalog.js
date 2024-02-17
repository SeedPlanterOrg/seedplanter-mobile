const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("You are in plantCatalog.js");
    res.status(200).json({ message: "You got me" });
});

router.post("/", (req, res) => {
    console.log("Posting in plantCatalog");
    console.log("name :" + req.body.name);
    res.status(200).json({message: "recieved JSON file"});
});

router.put("/", (req, res) => {
    console.log("Puting in update");
    console.log("name :" + req.body.name);
    res.status(200).json({message: "recieved JSON file"});
});

router.delete("/", (req, res) => {
    console.log("Deleteing item")
    res.status(200).json({message: "deleted"});
});
router
    .route("/:id")
    .get((req, res) => {
        console.log(`Getting user with id ${req.body.id}`);
        res.send(`Retreving user with ID: ${req.body.id}`);
    })
    .post((req, res) => {
        console.log(`Getting user with id ${req.body.id}`);
        res.send(`Posting user with ID: ${req.body.id}`);
    })
    .delete((req, res) => {
        console.log(`Getting user with id ${req.body.id}`);
        res.send(`Deletinguser with ID: ${req.body.id}`);
    })

module.exports = router;