require("./db/connection");
require("./models/user")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const Track = require("./models/tracks");
const userRoute = require("./routes/userRoute");
const trackRoute = require("./routes/trackRoute");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use(userRoute);
app.use(trackRoute);

app.get("/", auth, (req, res) => {
    console.log("Index")
    res.send("Authorized");
})

mongoose.connection.on("connected", () => {
    console.log('db connected successfully.');
})

mongoose.connection.on("error", () => {
    console.log("error connecting to db.");
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
} )