// ===============================
// STATE (User selections)
// ===============================
let state = {
    mood: null,
    need: null
};

// ===============================
// RESPONSE ENGINE (Mood + Need results)
// mood + need combination -> final message
// ===============================
const responses = {
    happy: {
        calm: [
            "You are already in a good place. Just maintain it.",
            "Things look balanced. Try to enjoy it.",
            "You seem in a peaceful state today."
        ],
        talk: [
            "Share your happiness with someone!",
            "Talking to someone could make this feeling even better.",
            "Let your good mood spread to others."
        ],
        rest: [
            "Rest a bit and enjoy the moment.",
            "Take a pause and appreciate how you feel.",
            "Relax and let your mind stay light."
        ],
        focus: [
            "You can use this energy for productive work.",
            "This is a good time to focus on important tasks.",
            "Your mind is clear enough to concentrate."
        ],
        distraction: [
            "Do something fun to keep the vibe going.",
            "Enjoy a small distraction, you deserve it.",
            "Light entertainment could make your day better."
        ]
    },

    neutral: {
        calm: [
            "Try slowing down your thoughts.",
            "Take a moment to just breathe.",
            "Let your mind rest a little."
        ],
        talk: [
            "A small chat might help your day.",
            "Talking to someone could shift your mood slightly.",
            "Connection might help you feel better."
        ],
        rest: [
            "Taking a short break is okay.",
            "You don’t need to rush anything right now.",
            "Resting could help you reset."
        ],
        focus: [
            "Start with a small task.",
            "Break your work into simple steps.",
            "Just begin, even if it's small."
        ],
        distraction: [
            "Light entertainment could help.",
            "Do something simple and relaxing.",
            "A short distraction might refresh you."
        ]
    },

    sad: {
        calm: [
            "Breathe slowly. You are safe.",
            "Take your time, everything is okay.",
            "Let yourself slow down a bit."
        ],
        talk: [
            "Talking to someone might really help.",
            "You don’t have to carry this alone.",
            "Opening up could ease your mind."
        ],
        rest: [
            "Rest is not weakness, it's healing.",
            "Give yourself permission to pause.",
            "You deserve to rest."
        ],
        focus: [
            "Just do one small step.",
            "Start with something very simple.",
            "No need to do everything at once."
        ],
        distraction: [
            "Watch or listen to something comforting.",
            "A gentle distraction might help you breathe easier.",
            "Try shifting your attention softly."
        ]
    },

    stress: {
        calm: [
            "Pause. Take deep breaths.",
            "Slow down for a moment.",
            "You don’t need to solve everything now."
        ],
        talk: [
            "Don’t carry it alone.",
            "Sharing this might help lighten it.",
            "Someone might help you see it differently."
        ],
        rest: [
            "Your mind needs rest.",
            "Step back for a moment.",
            "You are allowed to pause."
        ],
        focus: [
            "Break tasks into small pieces.",
            "Focus only on one step at a time.",
            "Simplify what you're trying to do."
        ],
        distraction: [
            "Switch your attention briefly.",
            "Give your mind a short break.",
            "Step away for a moment."
        ]
    },

    tired: {
        calm: [
            "Slow down everything.",
            "No need to rush anything today.",
            "Let your body take the lead."
        ],
        talk: [
            "You don’t need to force anything.",
            "Talking might feel like too much today, and that’s okay.",
            "Keep things light."
        ],
        rest: [
            "Sleep or rest is the priority.",
            "Your body needs recovery time.",
            "Rest is the best thing you can do right now."
        ],
        focus: [
            "Not a focus day, and that’s okay.",
            "Be kind to yourself today.",
            "Low energy days are normal."
        ],
        distraction: [
            "Do something light and easy.",
            "Keep things simple today.",
            "No pressure, just ease."
        ]
    }
};

function getRandomMessage(list){
    return list[Math.floor(Math.random() * list.length)];
}

// ===============================
// UI DATA (Mood visual styles)
// ===============================
const moodData = {
    happy: "#d4f8e8",
    neutral: "#f0f0f0",
    sad: "#dbeafe",
    stress: "#ede9fe",
    tired: "#fef9c3"
};

//Sets mood + changes background color
function setMood(mood){
    state.mood = mood;

    document.body.style.background = moodData[mood];
    document.body.style.transition = "background 0.5s ease";

    // remove previous active
    document.querySelectorAll(".mood-section button").forEach(btn => btn.classList.remove("active"));

    // add active to clicked mood button
    event.target.classList.add("active");
}

//Stores user's need selection
function setNeed(need){
    state.need = need;

    // remove previous active
    document.querySelectorAll(".need-section button").forEach(btn => btn.classList.remove("active"));

    // add active to clicked need button
    event.target.classList.add("active");
}

/* ==========================
    SHOW RESULT FUNCTION
    
    PURPOSE:
    - Generates final user feedback based on:
      → selected mood
      → selected need
   
    FLOW:
    1. Check if user made selections
    2. Find matching response list
    3. Pick a random message from list
    4. Display it with animation
   
    NOTES:
    - Each mood+need pair has multiple responses
    - Random selection makes responses feel more natural
    - Fade-in is re-triggered manually for UX effect
========================= */
function showResult(){
    const resultText = document.getElementById("result-text");

    if(!state.mood || !state.need){
        resultText.innerText = "Please select both mood and need.";
        return;
    } else {
        const messages = responses[state.mood][state.need]; 
        const randomMessage = getRandomMessage(messages);

        resultText.innerText = randomMessage;
    }

    // To trigger the fade-in animation: 

    // 1. First, remove the fade-in class.
    resultText.classList.remove("fade-in");
    // 2. Make the browser recalculate (reflow trick)
    void resultText.offsetWidth;
    // 3. Add the Fade-in class again → animation will work again
    resultText.classList.add("fade-in");
}