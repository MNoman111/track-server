const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.get("/users", async (req, res) => {
    const data = await User.find();
    res.send( data );
})

router.post("/users/signIn", async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ){
        return res.status(422).send({ error: 'Must provide email and password' });
    }
    console.log(email, password);
    const user = await User.findOne({ email })
    console.log(user);
    if(!user){
        return res.status(422).send({ error: 'Must provide email and password' });
    }
    try{
        await user.comparePassword(password);
        const token = user.generateAuthToken();
        console.log(token);
        res.send({token})
    }catch(err){
        return res.status(422).send({ error: 'Must provide email and password' });
    }
} )

router.post("/users/signUp", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if( !email || !password ){
        res.status(401).send({"error": "Invalid email or password."});
    }
    try{
        const user = new User({ email, password })
        await user.save();
        const token = user.generateAuthToken();
        console.log(token);
        res.send({token})
    }catch(err){
        res.status(401).send({"error": "Invalid email or password."});
    }
} )

module.exports = router;