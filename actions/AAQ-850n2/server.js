function(properties, context) {
    const axios = require('axios');

    const GROQ_API_KEY = context.keys["API Key"];
    const content = properties.content; // Campo de entrada do usuário
    const model = properties.model;

    const options = {
        method: 'POST',
        url: 'https://api.groq.com/openai/v1/chat/completions',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        data: {
            messages: [{ role: 'user', content: content }],
            model: model
        }
    };

    return axios(options)
        .then(response => {
            console.log("API Response Data:", response.data);

            if (response.data && response.data.choices && response.data.choices.length > 0) {
                const messageContent = response.data.choices[0].message.content;
                console.log("Message Content:", messageContent);
                return { message: messageContent };
            } else {
                console.log("No completions found in response.");
                return { message: "" };
            }
        })
        .catch(error => {
            console.error("API Error:", error);
            throw new Error("Failed to connect to API");
        });
}