# whatsapp-agent

Agente de WhatsApp (Webhook) en Node.js con soporte de persistencia en MongoDB mediante **Mongoose**.

## Estructura del proyecto

- `server.js`: servidor / entrypoint del webhook.
- `routes/webhook.js`: rutas del webhook.
- `services/`: lógica del agente (detección, memoria, envío, tono).
- `models/`: modelos de Mongoose.
- `config/`: configuración del agente.
- `database.js`: conexión a MongoDB.

## Scripts

- `npm run start`: ejecuta el proyecto.
- `npm run dev`: ejecuta con recarga automática (requiere `nodemon` instalado si lo vas a usar).

## Variables de entorno (`.env`)

Este proyecto usa un archivo `.env` (ignorado por Git) con, al menos:

- `PORT`: puerto del servidor (por defecto `3000`).
- `VERIFY_TOKEN`: token para validar el webhook.
- `WHATSAPP_TOKEN`: token de WhatsApp Cloud API.
- `PHONE_NUMBER_ID`: identificador del número.
- `MONGO_URI`: cadena de conexión de MongoDB (ej. `mongodb://usuario:password@localhost:27017/whatsapp-agent`).

## Conexión a MongoDB

La conexión se centraliza en `database.js` mediante `mongoose.connect(process.env.MONGO_URI)`.

## Cambios realizados en este proyecto

- **`package.json`**: se dejó configurado con scripts básicos (`start`, `dev`) y formato compatible con módulos ES.
- **MongoDB**: se instaló **`mongoose`** y se agregó la función `connectDB` en `database.js`.
- **`.env`**: se agregaron/ordenaron variables, incluyendo **`MONGO_URI`** con un ejemplo.
- **`.gitignore`**: se añadió para ignorar `node_modules` y **`.env`**, entre otros.
- **Git / GitHub**: el proyecto se subió al repositorio en la rama **`revision`** sin modificar `main`.

