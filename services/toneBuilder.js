const links = requite("../config/links");

function buildResponse(profile, intent) {

    let intro = "Hola!, gracias por escribirnos, en que te podemos ayudar?\n\n";

    let body = "";

    switch(profile) {

        case "estudiante":
            body = "Que bueno que quieras aprender, Tenemos opciones diseñadas para fortalecer tus habilidades y capacidades.";
            break;
        case "emprendedor":
            body = "Excelente decision, nuestros programas estan pensados para potenciar tu negocio y diferenciar tu marca";
            break;
        case "empresa":
            body = "Gracias por tu interés. Contamos con soluciones formativas diseñadas para equipos y organizaciones";
            break;
        case "docente":
            body = "Nos emcanta colaborar con instituciones educativas y docentes comprometidos con la formación";
            break;
        default:
            body = "con gusto te compartimos la informacion que estas buscando";
            break;
    }

    module.exports = buildResponse;

}    
    
    