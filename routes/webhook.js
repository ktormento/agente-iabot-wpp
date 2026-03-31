const express = require("express");
const router = express.Router();

const profiles = require("../config/profiles");
const intents = require("../config/intents");
const schedules = require("../config/schedules");

const { normalize, scoreMatch } = require("../services/detector");
const buildResponse = require("../services/toneBuilder");
const sendMessage = require("../services/sender");
const classifyMessage = require("../services/aiClassifier");

const { getUser, updateUser } = require("../services/memory");
const { createAppointment } = require("../services/AppointmentServices");

router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body.object) {
      return res.sendStatus(404);
    }

    const message =
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message?.text?.body) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = normalize(message.text.body);

    let user = await getUser(from);

    if (user?.step === "waiting_schedule") {
      const selectedHour = message.text.body.trim();

      await createAppointment(
        from,
        user.lastIntent,
        "mañana",
        selectedHour
      );

      const response = `Perfecto, tu ${user.lastIntent} quedó agendada para mañana a las ${selectedHour}.
      Ubicación:
      https://www.google.com/maps

      ¡Te esperamos!`;

      user.step = null;
      user.messages += 1;
      await user.save();

      await sendMessage(from, response);
      return res.sendStatus(200);
    }

    let profile = scoreMatch(text, profiles);
    let intent = scoreMatch(text, intents);

    if (!profile || !intent) {
      const aiResult = await classifyMessage(text);

      if (!profile) profile = aiResult.profile;
      if (!intent) intent = aiResult.intent;
    }

    profile = profile || user?.profile || "desconocido";
    intent = intent || user?.lastIntent || "menu";

    user = await updateUser(from, profile, intent);

    let response = "";

    //Modo comercial
    const aggressiveMode = user.messages > 2;

    //Respuesta base
    response = buildResponse(
      profile,
      intent,
      user,
      aggressiveMode
    );

    //agenda
    if (

      intent === "consultoria" ||
      intent === "reservas" ||
      intent === "cursos"

    ) {
      const available = schedules[intent] || [];

      response += `
      Tenemos estos horarios disponibles:
      ${available.map(h => `• ${h}`).join("\n")}

      Responde con el horario que prefieras`;
      user.step = "waiting_schedule";

      await user.save();
    }

    // Enviar respuesta
    await sendMessage(from, response);

    return res.sendStatus(200);

  } catch (error) {
    console.error("Webhook error:", error);
    return res.sendStatus(500);
  }
});

module.exports = router;