// Install express: npm install express
const express = require('express');
const app = express();
const port = 5550;

// Middleware to parse JSON requests
app.use(express.json());

// Simple language-based response function
function generateResponse(userMessage, language) {
    const defaultResponse = "Sorry, I couldn't understand that.";

    if (language === "es") {
        return `Respuesta en español: ${userMessage}`;
    } else if (language === "fr") {
        return `Réponse en français: ${userMessage}`;
    } else if (language === "it") {
        return `Risposta in italiano: ${userMessage}`;
    } else if (language === "hr") {
        return `Odgovor na hrvatskom: ${userMessage}`;
    } else if (language === "ja") {
        return `日本語での返信: ${userMessage}`;
    } else {
        return defaultResponse;
    }
}

// POST route to handle chat messages
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    const language = req.body.language || 'en'; // Default to English if no language is provided

    console.log('User:', userMessage);

    // Generate a response based on the message and language
    const botResponse = generateResponse(userMessage, language);

    // Send the response back to the client
    res.json({ botMessage: botResponse });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
