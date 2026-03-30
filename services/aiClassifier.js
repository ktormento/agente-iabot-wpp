const OpenAI = require("openai");
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function classifyMessage(message) {
  const prompt = `
    Clasifica el siguiente mensaje.

    Perfiles:
    estudiante, emprendedor, empresa, docente, desconocido

    Intenciones:
    cursos, consultoria, reservas, menu, domicilios, eventos, desconocido

    Mensaje: "${message}"

    Responde SOLO JSON:
    {"profile":"","intent":""}`;

  const response = await client.chat.completions.create({

    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0

  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch {
    return { profile: null, intent: null };
  }

}

module.exports = classifyMessage;