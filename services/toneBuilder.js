const links = require("../config/links");
const getRecommendation = require("./recommender");

function buildResponse(
  profile,
  intent,
  user = null,
  aggressiveMode = false
) {
  const link =
    links[intent] || "https://www.santiisimacoffee.com/";

  const rec = getRecommendation(profile, intent);

  let intro = "¡Hola! Gracias por escribirnos.\n\n";
  let body = "";

  switch (profile) {
    case "estudiante":
      body =
        "Qué bueno que quieras seguir aprendiendo. Tenemos opciones ideales para fortalecer tus habilidades.";
      break;

    case "emprendedor":
      body =
        "Excelente decisión. Nuestros programas están diseñados para hacer crecer tu negocio.";
      break;

    case "empresa":
      body =
        "Contamos con soluciones diseñadas para equipos y organizaciones.";
      break;

    case "docente":
      body =
        "Nos encanta colaborar con docentes e instituciones.";
      break;

    default:
      body =
        "Con gusto te compartimos la información.";
  }

  let recomendacionTexto = "";

  if (rec) {
    recomendacionTexto = `
    Recomendación para ti:
      • ${rec.main}
      • También podría interesarte: ${rec.extra}
`;
  }

  let historialTexto = "";

  // historial inteligente
  if (user && user.lastIntent === "cursos") {
    historialTexto +=
      "\nTambién podrías potenciar tu proyecto con una consultoría personalizada.";
  }

  // urgencia comercial
  if (aggressiveMode) {
    historialTexto +=
      "\nTenemos cupos limitados esta semana.";
  }

  return `${intro}${body}

Más información aquí:
${link}

${recomendacionTexto}
${historialTexto}

Si quieres una recomendación más personalizada, dime un poco más sobre lo que buscas`;
}

module.exports = buildResponse;