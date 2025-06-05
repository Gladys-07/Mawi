export async function getChatCompletion(message: string) {
    // const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
    // const API_KEY = import.meta.env.VITE_API_KEY;
    const API_ENDPOINT = "http://10.14.255.61/v1/chat/completions"
    const API_KEY = "sk-mDmOn2bG9Z3GDNW-x8wdeQ"

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