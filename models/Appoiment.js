const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    phone: String,
    type: String,
    date: String,
    hour: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "Appointment",
    appointmentSchema
)