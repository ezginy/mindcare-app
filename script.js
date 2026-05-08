// ===============================
// STATE (User selections)
// ===============================
let state = {
    mood: null,
    need: null
};

// ===============================
// HISTORY STORAGE
// Load previous check-ins from localStorage
// ===============================
let history = JSON.parse(localStorage.getItem("mindcareHistory")) || [];

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

// Returns a random response from the selected mood + need response pool
function getRandomMessage(list){
    return list[Math.floor(Math.random() * list.length)];
}

// ===============================
// MOOD BACKGROUND DATA
// Soft background tints for each mood
// ===============================
const moodData = {
    light: {
        happy: "rgba(212,248,232,0.7)",
        neutral: "rgba(240, 240, 240, 0.7)",
        sad: "rgba(219, 234, 254, 0.7)",
        stress: "rgba(237, 233, 254, 0.7)",
        tired: "rgba(254, 249, 195, 0.7)"
    },

    dark: {
        happy: "#1f3a2e",
        neutral: "#2a2f36",
        sad: "#1e3a5f",
        stress: "#3b2c52",
        tired: "#4a4423"
    }
};

// ===============================
// EMOJI DATA
// Visual representation for moods and needs
// ===============================
const emojiData = {
    moods: {
        happy: "🙂",
        neutral: "😐",
        sad: "😔",
        stress: "😰",
        tired: "😴"
    },

    needs: {
        calm: "🧘",
        talk: "💬",
        rest: "🛌",
        focus: "🎯",
        distraction: "🎧"
    }
};

// ===============================
// MOOD SELECTION
// Stores selected mood and updates UI state
// ===============================
function setMood(mood){
    state.mood = mood;

    // check current theme mode
    const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    
    // apply matching mood background tint
    document.body.style.backgroundColor = moodData[currentTheme][mood];
    document.body.style.transition = "background 0.5s ease";

    // remove previous active
    document.querySelectorAll(".mood-section button").forEach(btn => btn.classList.remove("active"));

    // add active to clicked mood button
    event.target.classList.add("active");
}

// ===============================
// NEED SELECTION
// Stores selected need and updates UI state
// ===============================
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

        // Store current check-in in history
        history.push({
            mood: state.mood,
            need: state.need,
            result: randomMessage
        });

        // Save updated history to browser storage
        localStorage.setItem("mindcareHistory", JSON.stringify(history));

        // Update history UI after new check-in
        renderHistory();
    }

    // To trigger the fade-in animation: 

    // 1. First, remove the fade-in class.
    resultText.classList.remove("fade-in");
    // 2. Make the browser recalculate (reflow trick)
    void resultText.offsetWidth;
    // 3. Add the Fade-in class again → animation will work again
    resultText.classList.add("fade-in");
}

/* ==========================
    RENDER HISTORY FUNCTION

    PURPOSE:
    - Displays previous check-ins in the UI
    - Converts history array data into HTML list items
========================== */
function renderHistory(){
    
    // Select history list container
    const historyList = document.getElementById("history-list");

    // Clear existing history before re-rendering
    historyList.innerHTML = "";

    // Show empty state if there is no history yet
    if(history.length === 0){
        historyList.innerHTML = `
            <li class="empty-history">
                No check-ins yet 🌱
            </li>
        `;

        return;
    }

    // Loop through history array
    history.forEach(entry => {
        
        // Create list item for each history entry
        const li = document.createElement("li");

        // Insert mood + need text into the list item
        li.innerHTML = `
            ${emojiData.moods[entry.mood]} ${entry.mood} • ${emojiData.needs[entry.need]} ${entry.need}
        `;

        // Add list item into history list
        historyList.appendChild(li);
    });
}

// Initial render when page loads
renderHistory();

/* ==========================
   DARK MODE TOGGLE

   PURPOSE:
   - Switches between light and dark theme
========================== */
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    // Toggle dark mode class on body
    document.body.classList.toggle("dark-mode");

    // Re-apply mood background after theme switch
    if(state.mood){
        // detect current active theme
        const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";

        // apply matching mood background tint
        document.body.style.backgroundColor = moodData[currentTheme][state.mood];
    }
});