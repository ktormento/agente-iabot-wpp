require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const webhook = require("./routes/webhook");
app.use("/webhook", webhook);

app.listen(process.env.PORT, () => console.log("Servicio corriendo en puerto " 
    + process.env.PORT)
);