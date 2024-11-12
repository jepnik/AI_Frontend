document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const message = inputField.value.trim();
    if (message === "") return;

    // Display user message
    addMessageToChat("User: " + message, false); //false indicates user

    console.log("Sending message to server:", message);

    try {

    // Send message to the backend
    const response = await fetch('http://10.196.32.141:5000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message })
    });

    console.log("Recieved response:", response);

    if (!response.ok) {
        throw new Error('Server error: ${response.statusText}');
    }

    const data = await response.json();

    //Display bot response
    addMessageToChat("Bot: " + data.response, true); //true indicates bot

} catch (error) {
    console.error("Error during fetch", error);
    addMessageToChat("Bot: Error connecting to the server.");
}

    // Clear the input field
    inputField.value = "";
}

function addMessageToChat(text, isBot = false) {
    const chatMessages = document.getElementById("chatMessages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.innerHTML = text.replace(/\n/g, "<br>"); //innerHTML to allow line breaks
    newMessage.classList.add(isBot ? "bot-message" : "user-message"); //Add class for bot and user messages
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}