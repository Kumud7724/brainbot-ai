const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const question = userInput.value.trim();

    if (question === "") return;

    // User Message
    chatBox.innerHTML += `
        <div class="user-message">
            <strong>You:</strong><br>
            ${question}
        </div>
    `;

    userInput.value = "";

    // Loading Message
    chatBox.innerHTML += `
        <div class="bot-message" id="loading">
            🤖 BrainBot AI is thinking...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("http://localhost:3000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })

        });

        const data = await response.json();

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                <strong>🤖 BrainBot AI:</strong><br><br>
                ${data.reply}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        const loading = document.getElementById("loading");

        if (loading) loading.remove();

        chatBox.innerHTML += `
            <div class="bot-message">
                ❌ Unable to connect to BrainBot AI.
            </div>
        `;

        console.error(error);
    }
}