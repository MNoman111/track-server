const mongoose = require("mongoose")

const pointsSchema = mongoose.Schema({
    timestamp: {
        type: "Number"
    },
    coords: {
        latitude: {
            type: "Number"
        },
        longitude: {
            type: "Number"
        },
        altitude: {
            type: "Number"
        },
        accuracy: {
            type: "Number"
        },
        heading: {
            type: "Number"
        },
        speed: {
            type: "Number"
        }
    }
})


const trackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: "String"
    },
    locations: [pointsSchema]
})

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;