const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    phone: {
        type: String,
        unique: true
    },
    
    profile: String,
    lastIntent: String,
    messages: Number ,
    
    createdAt: {
        type: Date,
        degault: Date.now
    }

});