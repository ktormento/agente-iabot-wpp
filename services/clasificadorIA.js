const OpenAI = required("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function classifyMessage(message) {
    
    const prompt = '
    Clasifica el siguiente mensaje de un cliente de cafeteria.

    Perfiles posibles:
        -estudiante
        -emprendedor
        -empresa
        -docente
        -desconocido

        Intenciones posibles:
        -cursos
        -consultoria
        -reservas
        -menu
        -domicilios
        -eventos
        -desconocido

        mensaje: "${message}"

        Responde SOLO en JSON:

        {
            "profile":"",
            "intent":""
        }
    ';
    
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        message:[
            {role: "user", content: prompt}
        ],
        temperature: 0
    });

    try{
        return JSON.parse(response.choices[0].message.content);
    } catch {
        return {profile: null, intent: null};
    }
}

module.export = classifyMessage;