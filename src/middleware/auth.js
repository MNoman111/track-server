const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const auth = (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        jwt.verify(token, "MY_SECRET", async (err, decoded) => {
            const { userId } = decoded;
            const user = User.findById(userId, (err, data) => {
                req.user = data;
                next();
            });
        } )
    }catch(err){
        res.status(401).send({"error": "Please Authenticate."});
    }
}

module.exports = auth;