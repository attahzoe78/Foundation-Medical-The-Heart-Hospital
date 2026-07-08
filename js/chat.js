/**
 * AI Health Assistant Mockup Logic
 * Foundation Medical - The Heart Hospital
 */

document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    const responses = {
        "hello": "Hello John! How are you feeling today?",
        "hi": "Hi there! Ready for your daily heart health check?",
        "chest pain": "If you are experiencing severe chest pain, please call emergency services immediately or go to the nearest emergency room. At The Heart Hospital, your safety is our priority.",
        "diet": "A heart-healthy diet includes plenty of leafy greens, berries, whole grains, and fatty fish like salmon. Would you like a meal plan recommendation?",
        "cholesterol": "Your latest cholesterol reading was 182 mg/dl, which is within the target range. Keep up the good work with your current regimen!",
        "medication": "You are currently prescribed Low-Dose Aspirin and Atorvastatin. Remember to take them after dinner as discussed with Dr. Smith.",
        "exercise": "Regular aerobic activity, like brisk walking for 30 minutes a day, significantly improves cardiovascular resilience.",
        "thanks": "You're welcome! I'm here to support your journey to a healthier heart.",
        "default": "That's an interesting question. While I can provide general health information, I recommend discussing this specifically with your cardiologist during your next visit on May 15th."
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + sender;
        msgDiv.innerText = text;
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function handleChat() {
        const input = chatInput.value.toLowerCase().trim();
        if (input === '') return;

        addMessage(chatInput.value, 'user');
        chatInput.value = '';

        // Simulate AI thinking
        setTimeout(() => {
            let response = responses.default;

            for (const key in responses) {
                if (input.includes(key)) {
                    response = responses[key];
                    break;
                }
            }

            addMessage(response, 'ai');
        }, 600);
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleChat();
        });
    }
});
