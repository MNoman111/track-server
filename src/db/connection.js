const mongoose = require("mongoose");

const CONNECTION_URL = "mongodb+srv://track:Noman123@cluster0.tirs4.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})