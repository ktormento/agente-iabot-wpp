const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: { type: String, unique: true },
    profile: String,
    lastIntent: String,
    step: { type: String, default: null },
    messages: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);