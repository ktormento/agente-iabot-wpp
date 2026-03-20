<<<<<<< HEAD
# agente-iabot-wpp
Arquitectura básica de un agente IA de ChatGPT integrado con Whatsapp Bussiness para la marca SANTIISIMA
=======
# WhatsApp Agent (agente-iabot-wpp)

Agente de WhatsApp con Node.js integrado con IA (ChatGPT) para la marca SANTIISIMA.

---

## Resumen de la actualización (rama `revision`)

En esta rama se incorpora **persistencia de usuarios en MongoDB** y se adapta el proyecto a Node.js. En lugar de depender solo de la detección por mensaje, el agente guarda y reutiliza el perfil e intención de cada usuario entre conversaciones, mejora la configuración del repositorio (`.gitignore` para Node) y añade la dependencia Mongoose para conectar con la base de datos.

---

## Cambios realizados (rama `revision`)

### 1. **.gitignore**
- **Antes:** Plantilla orientada a Python (__pycache__, venv, Django, Flask, etc.).
- **Ahora:** Configuración para proyecto Node.js:
  - `node_modules`
  - `.env`
  - `npm-debug.log*`
  - `dist`, `coverage`, `.DS_Store`

### 2. **Base de datos (MongoDB)**

#### `database.js` (nuevo)
- Módulo de conexión a MongoDB con **Mongoose**.
- Función `connectDB()` que usa la variable de entorno `MONGO_URI`.
- Validación de `MONGO_URI` antes de conectar.
- Uso de sintaxis ES modules (`import`/`export`).

#### `models/user.js` (nuevo)
- Modelo de usuario con Mongoose:
  - `phone` (String, único)
  - `profile` (String)
  - `lastIntent` (String)
  - `messages` (Number)
  - `createdAt` (Date)

### 3. **Memoria de usuario**

#### `services/memory.js` (nuevo)
- **`getUser(phone)`:** Busca un usuario por teléfono en la base de datos.
- **`updateUser(phone, profile, intent)`:** Crea o actualiza el usuario:
  - Si no existe: crea registro con `phone`, `profile`, `lastIntent`, `messages: 1`.
  - Si existe: incrementa `messages` y actualiza `profile` y `lastIntent` si se envían.

### 4. **Webhook (`routes/webhook.js`)**
- Import de `getUser` y `updateUser` desde `services/memory`.
- **Flujo por mensaje:**
  1. Se obtiene el usuario con `getUser(from)`.
  2. Se detectan `profile` e `intent` con `scoreMatch` contra `profiles` e `intents`.
  3. Si no hay detección, se usa el último `profile` e `intent` guardados del usuario (`user?.profile`, `user?.lastIntent`).
  4. Se actualiza el usuario con `updateUser(from, profile, intent)`.
  5. Se construye y envía la respuesta con `buildResponse(profile, intent)`.
- Pequeños ajustes de formato (espaciado en destructuring de `detector`).

### 5. **Dependencias**
- **package.json** y **package-lock.json**: añadida dependencia **mongoose** (^9.2.4) para MongoDB.
- Scripts: `start`, `dev` (nodemon), `test`.

### 6. **README**
- El README anterior (solo título y descripción breve) fue eliminado en un commit posterior; este README lo sustituye y documenta los cambios de la rama `revision`.

---

## Resumen de archivos tocados

| Archivo           | Acción   | Descripción breve                          |
|-------------------|----------|--------------------------------------------|
| `.gitignore`      | Modificado | De Python a Node.js                        |
| `README.md`       | Reemplazado | Este documento                             |
| `database.js`     | Nuevo    | Conexión MongoDB con Mongoose              |
| `models/user.js`  | Nuevo    | Modelo de usuario                          |
| `package.json`    | Modificado | Proyecto Node + mongoose                  |
| `package-lock.json` | Nuevo  | Lockfile de dependencias                   |
| `routes/webhook.js` | Modificado | Memoria de usuario y fallback de perfil/intent |
| `services/memory.js` | Nuevo  | CRUD de usuario en MongoDB                 |

---

## Variables de entorno necesarias

- `VERIFY_TOKEN`: token de verificación del webhook de WhatsApp.
- `MONGO_URI`: cadena de conexión a MongoDB (ej. `mongodb://localhost:27017/whatsapp-agent`).

---

## Cómo ejecutar

```bash
npm install
# Configurar .env con VERIFY_TOKEN y MONGO_URI
npm run dev   # desarrollo con nodemon
# o
npm start     # producción
```
>>>>>>> 9343f78bef246ed3a998e2082bb59e41f5f53151
