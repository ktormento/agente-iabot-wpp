const axios = require("axios");

async function sendMessage(to, message) {
    await axios.post(
        "",
        {
            messaging_product: "whatsapp",
            to: to,
            text: {body: message}
        },
        {
            headers: {
                authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content_type": "application/json"
            }
        }
    );
}

module.exports = sendMessage;