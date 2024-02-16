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

module.exports = router;