const express = require("express");
const mongoose = require("mongoose");
const auth = require("./../middleware/auth");

const Track = mongoose.model("Track");

const router = express.Router();

router.get("/tracks/id", auth, async (req, res) => {
    try{
        console.log(req.user._id);
        const userId = req.user._id;
        console.log(userId);
        const track = await Track.find({userId});
        res.send(track);
    }catch(err){
        console.log(err);
        res.status("401").send("Error: Something went wrong!");
    }
})

router.post("/tracks/id", auth, async (req,res) => {
    try{
        const { name, locations } = req.body;
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send("Track Saved " + track);
    }catch(err){
        res.status("401").send("Error: Something went wrong!");
    }
})

module.exports = router;