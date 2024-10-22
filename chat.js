document.getElementById("sendButton").addEventListener("click", sendMessage);

async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const message = inputField.ariaValueMax.trim();
    if (message === "") return;

    //Display user message
    addMessageToChat("User: " + message);

    //Send message to the backend
    const response = await fetch('http://localhost:5000/chat', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: message})
    });

    const data = await response.json();
    addMessageToChat("Bot: " + data.response);

    //Clear the input field
    inputField.value = "";
}

function addMessageToChat(text) {
    const chatMessages = document.getElementById("chatMessages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.text.content = text;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}