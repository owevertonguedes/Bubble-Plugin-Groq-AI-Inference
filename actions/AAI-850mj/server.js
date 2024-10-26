function(properties, context) {
    const axios = require('axios');

    const GROQ_API_KEY = context.keys["API Key"];

    const options = {
        method: 'GET',
        url: 'https://api.groq.com/openai/v1/models',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };

    return axios(options)
        .then(response => {
            console.log("API Response Data:", response.data);

            if (response.data && response.data.data) {
                const models = response.data.data.map(model => JSON.stringify(model));
                console.log("Models Data:", models);
                return { models: models };
            } else {
                console.log("No models found in response.");
                return { models: [] };
            }
        })
        .catch(error => {
            console.error("API Error:", error);
            throw new Error("Failed to connect to API");
        });
}