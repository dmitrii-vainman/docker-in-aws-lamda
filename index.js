exports.handler = async (event) => {
    try {
        // Request-Body parsen
        const body = JSON.parse(event.body || '{}');

        // Validierung: Überprüfen, ob "name" vorhanden ist
        if (!body.name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    message: "Validation Error: 'name' parameter is required" 
                }),
            };
        }

        // Erfolgsantwort
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: `Hello, ${body.name}!` 
            }),
        };
    } catch (error) {
        // Fehlerbehandlung
        console.error("Error occurred:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: "Internal Server Error", 
                error: error.message 
            }),
        };
    }
};
