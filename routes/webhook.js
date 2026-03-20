const express = require("express");
const router = express.Router();

const profiles = require("../config/profiles");
const intents = require("../config/intents");

<<<<<<< HEAD
const { normalize, scoreMatch } = require("../services/detector");
const buildResponse = require("../services/toneBuilder");
const sendMessage = require("../services/sender");
=======
const {normalize, scoreMatch} = require("../services/detector");
const buildResponse = require("../services/toneBuilder");
const sendMessage = require("../services/sender");
const {getUser, updateUser} = require("../services/memory");
const classifyMessage = require("../services/clasificadorIA");
>>>>>>> 9343f78bef246ed3a998e2082bb59e41f5f53151

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge);

  } else {
    res.sendStatus(403);

  }

});

router.post("/", async (req, res) => {
  const body = req.body;

  if (body.object) {

    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message) {
        const from = message.from;
        const text = normalize(message.text.body);

<<<<<<< HEAD
        const profile = scoreMatch(text, profiles);
        const intent = scoreMatch(text, intents);

        const response = buildResponse(profile, intent);

        await sendMessage(from, response);
=======
        let profile = scoreMatch(text, profiles);
        let intent = scoreMatch(text, intents);

        //fallback si no se detecta la IA
        if(!profile || !intent){
          
          const ResultadoIA = await classifyMessage(text);

          if(!profile) profile = ResultadoIA.profile;
          if(!intent) intent = ResultadoIA.intent;
          
        }
      //construye respuesta
      const responser = buildResponse(profile, intent);

      await sendMessage(from, response);
      
>>>>>>> 9343f78bef246ed3a998e2082bb59e41f5f53151
    }
    res.sendStatus(200);

  } else {
    res.sendStatus(404);
    
  }

});

module.exports = router;
