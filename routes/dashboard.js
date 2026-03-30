const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
    const users = await User.find().sort({ messages:-1});
    res.json({totalUsers});
});

router.get("/stats", async(req, res) => {
    const totalUsers = await User.countDocumments();
    res.json({totalUsers});
});

module.exports = router;
