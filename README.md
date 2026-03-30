# agente-iabot-wpp

Agente conversacional para **WhatsApp Business** (Meta Cloud API), orientado a la marca **SANTIISIMA**: clasificación de intención y perfil, respuestas con tono configurable, recomendaciones, memoria de usuario en MongoDB y flujo de **agenda / reservas**.

---

## Stack

- **Node.js** + **Express**
- **MongoDB** (Mongoose): usuarios y citas
- **OpenAI** (GPT): clasificación cuando las reglas no alcanzan
- **Axios**: envío de mensajes vía Graph API de WhatsApp

---

## Requisitos

- Node.js 18+ recomendado
- Cuenta y credenciales de **WhatsApp Business** (token, `PHONE_NUMBER_ID`, verificación del webhook)
- Base **MongoDB** accesible (`MONGO_URI`)
- API key de **OpenAI** si se usa el clasificador por IA

---

## Configuración

1. Clonar el repositorio e instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo **`.env`** en la raíz del proyecto (no se sube a Git; está en `.gitignore`). Variables usadas por el código:

   | Variable | Uso |
   |----------|-----|
   | `PORT` | Puerto del servidor HTTP |
   | `VERIFY_TOKEN` | Debe coincidir con el token configurado en Meta para verificar el webhook |
   | `WHATSAPP_TOKEN` | Token de acceso de la app de WhatsApp |
   | `PHONE_NUMBER_ID` | ID del número de WhatsApp en Graph API |
   | `MONGO_URI` | Cadena de conexión a MongoDB |
   | `OPENAI_API_KEY` | Clave para el clasificador con IA |

3. Arrancar:

   ```bash
   npm start
   ```

   Desarrollo con recarga:

   ```bash
   npm run dev
   ```

---

## Arquitectura (resumen)

| Ruta / módulo | Rol |
|---------------|-----|
| `server.js` | Arranque Express, conexión a BD, montaje de rutas |
| `routes/webhook.js` | Verificación GET y recepción POST de Meta; flujo de mensaje |
| `services/detector.js` | Normalización de texto y coincidencia por palabras (perfiles / intenciones) |
| `services/aiClassifier.js` | Fallback con OpenAI cuando falta perfil o intención |
| `services/toneBuilder.js` | Construcción del texto de respuesta (enlaces, recomendaciones, urgencia) |
| `services/sender.js` | Envío del mensaje saliente por Graph API |
| `services/memory.js` | Lectura/actualización del usuario en MongoDB |
| `services/AppointmentServices.js` | Persistencia de citas |
| `routes/dashboard.js` | API interna opcional para panel (usuarios/estadísticas) |
| `config/*` | Perfiles, intenciones, enlaces, horarios |

El webhook de Meta debe apuntar a: `https://<tu-dominio>/webhook`.

---

## Cambios recientes (para el equipo)

Esta sección resume lo incorporado y corregido para que el flujo sea **coherente y estable** en producción.

### Funcionalidad añadida o ampliada

- **Memoria de usuario** (`services/memory.js`, modelo `User`): teléfono, perfil, última intención, contador de mensajes y **estado de flujo** (`step`) para la agenda.
- **Clasificador por IA** (`services/aiClassifier.js`): si no hay match por palabras clave, se usa GPT para perfil e intención.
- **Agenda**: horarios en `config/schedules.js`; al elegir intenciones de consultoría, reservas o cursos se ofrecen slots y se entra en estado `waiting_schedule`; la respuesta con la hora confirma la cita vía `AppointmentServices` y modelo de cita.
- **Conexión a MongoDB** (`database.js`) y scripts de dependencias alineados en `package.json`.
- **Recomendaciones** (`services/recommender.js`) integradas en `toneBuilder`.

### Correcciones importantes (estabilidad)

- **`detector.js`**: la función de normalización se exporta como `normalize` (antes el nombre no coincidía y fallaba en tiempo de ejecución).
- **`memory.js`**: consulta correcta `User.findOne({ phone })`; eliminada dependencia innecesaria del router (evita acoplamiento circular).
- **`sender.js`**: URL de Graph API con **template string** (interpolación de `PHONE_NUMBER_ID`); cabeceras `Authorization` y `Content-Type` correctas.
- **`models/User.js`**: campo **`step`** para persistir el estado del flujo de reserva.
- **`routes/webhook.js`**: import del servicio de citas desde `AppointmentServices`; el caso **`waiting_schedule` se procesa antes** de clasificar y de `updateUser`, para que un mensaje solo con la hora no borre el contexto de la reserva.
- **`server.js`**: rutas separadas para webhook y API del dashboard (`/webhook` y `/api`), sin variables duplicadas.

### Pendiente conocido

- Revisar **`routes/dashboard.js`** (respuestas JSON y métodos de conteo en Mongoose) si el panel se usa en serio.

---

## Trabajo en equipo: ramas y pull requests

Flujo habitual en equipos profesionales:

1. **Actualizar** la rama principal localmente:  
   `git checkout main` → `git pull origin main`

2. **Crear una rama** por tarea o por entrega:  
   `git checkout -b feature/nombre-descriptivo`  
   (ej.: `feature/documentacion-readme-y-estabilidad-webhook`)

3. **Commitear** cambios con mensajes claros:  
   `git add .` → `git commit -m "Descripción breve del cambio"`

4. **Subir la rama** al remoto:  
   `git push -u origin feature/nombre-descriptivo`

5. En **GitHub**: abrir un **Pull Request** desde esa rama hacia `main`, describir qué cambió y pedir revisión a tu compañero. Tras aprobación, **merge** en `main` (squash merge o merge commit según convención del equipo).

6. Opcional: **proteger `main`** en GitHub (revisiones obligatorias, CI) para evitar merges directos sin revisión.

No subas nunca el archivo `.env` ni secretos; ya están ignorados por Git.

---

## Licencia / uso

Uso interno del proyecto SANTIISIMA salvo que se indique lo contrario.
