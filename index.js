const axios = require('axios');

exports.handler = async (event) => {
const envVar = process.env.MY_ENV_VAR || "Default Value";
  try {
    // Sende eine GET-Anfrage an die GitHub-API
    const response = await axios.get('https://api.github.com');

    // Rückgabe der API-Antwort
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "API request successful!",
        envVar: envVar, // Gibt den Wert der Umgebungsvariablen zurück
        data: response.data, // Antwortdaten der API
      }),
    };
  } catch (error) {
    // Fehlerbehandlung
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "API request failed.",
        error: error.message,
      }),
    };
  }
};
