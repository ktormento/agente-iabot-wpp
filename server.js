require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database");

connectDB();

app.use(express.json());
app.use(express.static("dashboard"));

const dashboardRoutes = require("./routes/dashboard");
const webhookRoutes = require("./routes/webhook");

app.use("/webhook", webhookRoutes);
app.use("/api", dashboardRoutes);

app.listen(process.env.PORT, () =>  console.log("Servicio corriendo en puerto " 
    + process.env.PORT)
);