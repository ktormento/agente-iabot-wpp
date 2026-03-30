const recomendaciones = {
    estudiante: {
        cursos: {
            main: "Curso barista inicial",
            extra: "Taller de latte arte"
        }
    },

    emprendedor: {
        cursos:{
            main: "Curso de cafeterias rentables",
            extra: "Consultoria estratégica"
        },
        Consultoria:{
            main: "Consultoria de negocio cafetero",
            extra: "Optimizacion de carta"
        }
    },

    empresa:{
        cursos:{
            main: "Capacitacion corporativa en cafe",
            extra: "Eventos empresariales"
        }
    },

    docente:{
        cursos:{
            main: "Programa educativo de cafe",
            extra: "Talleres para instituciones"
        }
    }
};

function getRecommendation(profile, intent) {
    if(!profile || !intent) return null;

    const data = recomendaciones[profile]?.[intent];
    if(!data) return null;
    return data;
}

module.exports = getRecommendation;