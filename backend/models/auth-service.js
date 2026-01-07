const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    provider : {
        type: String,
        required: true,
    }
});

const Service = mongoose.model("Service", userSchema);
module.exports = Service;