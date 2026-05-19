// ===============================
// STATE (User selections)
// ===============================
let state = {
    mood: null,
    need: null,
    situation: null,
    intensity: null
};

// ===============================
// STEP FLOW STATE
// Controls current screen step
// ===============================
let currentStep = 1;

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
// CONTEXTUAL RESULT MESSAGES
// Small personalized emotional notes
// ===============================
const contextMessages = {
    school: "School pressure can feel overwhelming sometimes.",
    work: "Work-related stress can quietly build up over time.",
    relationships: "Relationships can deeply affect emotional balance.",
    overthinking: "Overthinking can make emotions feel heavier than they are.",
    life: "Sometimes life feels emotionally messy without a clear reason.",
    unsure: "Not understanding your feelings immediately is completely okay."
};

// ===============================
// AMBIENT GLOW COLORS
// Soft animated background colors
// ===============================
const glowColors = {
    happy: "#86efac",
    neutral: "#d1d5db",
    sad: "#60a5fa",
    stress: "#a78bfa",
    tired: "#fde68a"
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
// PROGRESS INDICATOR DOTS
// Tracks current visible app step
// ===============================
const progressDots = document.querySelectorAll(".progress-dot");

// ===============================
// MOOD SELECTION
// Stores selected mood and updates UI state
// ===============================
function setMood(mood){
    state.mood = mood;
    
    // select animated background glow layer
    const backgroundGlow = document.querySelector(".background-glow");

    // apply matching mood glow color
    backgroundGlow.style.color = glowColors[mood];

    // remove previous active button
    document.querySelectorAll(".mood-section button").forEach(btn => btn.classList.remove("active"));

    // add active class to selected mood button
    event.target.classList.add("active");

    //Move to next step after mood selection
    currentStep = 2;

    //Update visible UI sections
    updateStepUI();
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

    // Move to result step after need selection
    currentStep = 3;

    // Update visible UI sections
    updateStepUI();
}

/* ==========================
   SITUATION SELECTION
========================== */
function setSituation(situation) {
    state.situation = situation;

    // remove previous active
    document.querySelectorAll(".situation-section button").forEach(btn => btn.classList.remove("active"));

    // activate selected button
    event.target.classList.add("active");

    // move to next step
    currentStep = 4;
    updateStepUI();
}

/* ==========================
   INTENSITY SELECTION
========================== */
function setIntensity(intensity) {
    state.intensity = intensity;

    // remove previous active
    document.querySelectorAll(".intensity-section button").forEach(btn => btn.classList.remove("active"));

    // activate selected button
    event.target.classList.add("active");

    // move to result screen
    currentStep = 5
    updateStepUI();
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

    if(!state.mood || !state.need || !state.situation || !state.intensity){
        resultText.innerText = "Please select both mood and need.";
        return;
    } else {
        const messages = responses[state.mood][state.need]; 
        const randomMessage = getRandomMessage(messages);

        resultText.innerText = randomMessage;

        // Display contextual emotional note
        document.getElementById("result-context").innerText = contextMessages[state.situation];

        // Trigger smooth result reveal animation
        resultText.classList.remove("result-reveal");
        void resultText.offsetWidth;
        resultText.classList.add("result-reveal");

        // Hide back button after revealing result
        document.getElementById("result-back-btn").style.display = "none";

        // Show restart button after revealing result
        document.getElementById("restart-btn").style.display = "inline-block";

        // Hide show result button after reveal
        document.getElementById("show-result-btn").style.display = "none";

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

/* ==========================
   GENERATE INSIGHT FUNCTION

   PURPOSE:
   - Analyzes user check-in history
   - Finds the most selected need
   - Generates a personalized insight message
========================== */
function generateInsight(){

    // select insight text element
    const insightText = document.getElementById("insight-text");

    // wait until enough check-ins exist
    if(history.length < 3){
        insightText.innerText = "Complete a few more check-ins to unlock insights 🌱";
        return;
    }

    // store how many times each need appears 
    const needCount = {};

    // count every selected need
    history.forEach(entry => {

        if(needCount[entry.need]){
            needCount[entry.need]++;
        } else {
            needCount[entry.need] = 1;
        }
    });

    // track the most selected need
    let topNeed = "";
    let topCount = 0;

    // find the need with the highest count
    for(let need in needCount){
        if(needCount[need] > topCount){
            topCount = needCount[need];
            topNeed = need;
        }
    }

    // personalized insight messages
    const insightMessages = {
        rest: "You've been needing more rest lately.",
        calm: "You seem to be looking for more calm recently.",
        talk: "You may benefit from opening up to someone.",
        focus: "Your recent check-ins suggest a need for focus.",
        distraction: "You've been needing small mental breaks lately."
    }

    // display generated insight 
    insightText.innerText = insightMessages[topNeed];
}

/* ==========================
   DARK MODE TOGGLE

   PURPOSE:
   - Switches between light and dark theme
========================== */
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    // Toggle dark mode class on body
    document.body.classList.toggle("dark-mode");

    // Check current theme mode
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Update toggle icon
    themeToggle.innerText = isDarkMode ? "☀️" : "🌙";
});

// ===============================
// STEP SECTIONS
// Select app sections for step flow
// ===============================
const moodSection = document.querySelector(".mood-section");
const needSection = document.querySelector(".need-section");
const situationSection = document.querySelector(".situation-section");
const intensitySection = document.querySelector(".intensity-section");
const resultSection = document.querySelector(".result-section");

/* ==========================
   UPDATE STEP UI

   PURPOSE:
   - Controls which section is visible
   - Creates multi-step app flow
========================== */
function updateStepUI() {

    // Reset all progress dots 
    progressDots.forEach(dot => dot.classList.remove("active-dot"));

    // STEP 1 -> mood selection
    if (currentStep === 1){
        moodSection.style.display = "block";
        moodSection.classList.add("step-visible");
        progressDots[0].classList.add("active-dot");

        needSection.style.display = "none";
        situationSection.style.display = "none";
        intensitySection.style.display = "none";
        resultSection.style.display = "none";
    }

    // STEP 2 -> need selection 
    else if (currentStep === 2){
        moodSection.style.display = "none";

        needSection.style.display = "block";
        needSection.classList.add("step-visible");
        progressDots[1].classList.add("active-dot");

        situationSection.style.display = "none";
        intensitySection.style.display = "none";
        resultSection.style.display = "none";
    }

    // STEP 3 -> situation selection
    else if (currentStep === 3){
        moodSection.style.display = "none";
        needSection.style.display = "none";

        situationSection.style.display = "block";
        situationSection.classList.add("step-visible");
        progressDots[2].classList.add("active-dot");

        intensitySection.style.display = "none";
        resultSection.style.display = "none";
    }

    // STEP 4 -> intensity selection
    else if (currentStep === 4){
        moodSection.style.display = "none";
        needSection.style.display = "none";
        situationSection.style.display = "none";

        intensitySection.style.display = "block";
        intensitySection.classList.add("step-visible");
        progressDots[3].classList.add("active-dot");

        resultSection.style.display = "none";
    }

    // STEP 5 -> result selection
    else if (currentStep === 5){
        moodSection.style.display = "none";
        needSection.style.display = "none";
        situationSection.style.display = "none";
        intensitySection.style.display = "none";

        resultSection.style.display = "block";
        resultSection.classList.add("step-visible");
        progressDots[4].classList.add("active-dot");

        // Show result navigation buttons
        document.getElementById("result-nav").style.display = "flex";
    }
}

/* ==========================
   STEP NAVIGATION
   Handles backward step flow
========================== */

// Return to mood selection screen
function goBackToMood() {
    currentStep = 1;
    updateStepUI();
}

// Return to need selection screen
function goBackToNeed() {
    currentStep = 2;
    updateStepUI();
}

// Return to situation selection screen
function goBackToSituation() {
    currentStep = 3;
    updateStepUI();
}

// Return to intensity selection screen
function goBackToIntensity() {
    currentStep = 4;
    updateStepUI();
}

/* ==========================
   RESTART CHECK-IN FLOW

   PURPOSE:
   - Resets app flow
   - Starts a fresh emotional check-in
========================== */
function restartCheckIn() {
    // Reset saved selections
    state.mood = null;
    state.need = null;
    state.situation = null;
    state.intensity = null;

    // Reset result text
    document.getElementById("result-text").innerText = "Click below to reveal your personalized result.";

    // Remove active button states
    document.querySelectorAll(".mood-section button, .need-section button, .situation-section button, .intensity-section button").forEach(btn => btn.classList.remove("active"));

    // Re-show result navigation for future check-ins
    document.getElementById("result-nav").style.display = "flex";

    // Reset result navigation buttons
    document.getElementById("result-back-btn").style.display = "inline-block";
    document.getElementById("restart-btn").style.display = "none";

    // Re-show result trigger button
    document.getElementById("show-result-btn").style.display = "inline-block";

    // Return to first screen
    currentStep = 1;

    // Update visible sections
    updateStepUI();
}

// Initial render when page loads
renderHistory();

// Generate personalized insight
generateInsight();

// Initialize first app step
updateStepUI();