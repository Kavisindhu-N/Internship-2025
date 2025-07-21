let jsonData = [];

const username = "Kavisindhu-N";
const repo = "Internship-2025";
const filePath = "18-07-2025/solution/data.json";
const branch = "chatbot-";

const fetchData = async () => {
    try {
        const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}?ref=${branch}`;
        const response = await fetch(url);
        const data = await response.json();
        const decoded = atob(data.content);
        jsonData = JSON.parse(decoded);
    } catch (error) {
        console.error("Error:", error);
    }
};

const userQuestion = () => {
    const input = document.getElementById("user-input").value.trim();
    const chatBox = document.getElementById("chat-box");

    if (!input) return;
    addMessage(input, 'user');
    const found = jsonData.find(item => item.question.toLowerCase() === input.toLowerCase());
    if (found) {
        addMessage(found.answer, 'bot');
    } else {
        addMessage("Sorry, I don't understand. You can try these:", 'bot');
        showSuggestions();
    }
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

const addMessage = (text, sender = 'bot') => {
    const chatBox = document.getElementById("chat-box");
    const wrapper = document.createElement("div");
    wrapper.className = `d-flex mb-2  ${sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`;

    const bubble = document.createElement("div");
    bubble.className = `p-2 rounded-3 ${sender === 'user' ? 'bg-success-subtle' : 'bg-body-secondary'}`;
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatBox.appendChild(wrapper);
}

const showSuggestions = () => {
    const chatBox = document.getElementById("chat-box");
    const row = document.createElement("div");
    row.className = "d-flex flex-wrap gap-2 mt-2 mb-2 ";

    jsonData.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary btn-sm";
        btn.textContent = item.question;
        btn.onclick = () => {
            document.getElementById("user-input").value = item.question;
            userQuestion();
        };
        row.appendChild(btn);
    });

    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;
}


window.onload = async () => {
    await fetchData();
};