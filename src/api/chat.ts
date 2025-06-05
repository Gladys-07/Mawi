export async function getChatCompletion(message) {
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    const API_KEY = import.meta.env.VITE_API_KEY;

    //request structure
    const requestbody = {
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: message
        }],
    };

    const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestbody),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}