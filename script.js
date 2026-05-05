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
        calm: "You are already in a good place. Just maintain it.",
        talk: "Share your happiness with someone!",
        rest: "Rest a bit and enjoy the moment.",
        focus: "You can use this energy for productive work.",
        distraction: "Do something fun to keep the vibe going."
    },

    neutral: {
        calm: "Try slowing down your thoughts.",
        talk: "A small chat might help your day.",
        rest: "Taking a short break is okay.",
        focus: "Start with a small task.",
        distraction: "Light entertainment could help."
    },

    sad: {
        calm: "Breathe slowly. You are safe.",
        talk: "Talking to someone might really help.",
        rest: "Rest is not weakness, it's healing.",
        focus: "Just do one small step.",
        distraction: "Watch or listen to something comforting."
    },

    stress: {
        calm: "Pause. Take deep breaths.",
        talk: "Don’t carry it alone.",
        rest: "Your mind needs rest.",
        focus: "Break tasks into small pieces.",
        distraction: "Switch your attention briefly."
    },

    tired: {
        calm: "Slow down everything.",
        talk: "You don’t need to force anything.",
        rest: "Sleep or rest is the priority.",
        focus: "Not a focus day, and that’s okay.",
        distraction: "Do something light and easy."
    }
};

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
}

//Stores user's need selection
function setNeed(need){
    state.need = need;
}