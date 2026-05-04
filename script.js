function setMood(mood){
    document.body.style.transition = "background 0.5s ease";

    if (mood === "happy") {
        document.body.style.background = "#d4f8e8";
        alert("I'm glad you're feeling good today.");
    }

    else if (mood === "neutral") {
        document.body.style.background = "#f0f0f0";
        alert("A calm day is still meaningful.");
    }

    else if (mood === "sad") {
        document.body.style.background = "#dbeafe";
        alert("It's okay to feel low sometimes.");
    }

    else if (mood === "stress") {
        document.body.style.background = "#ede9fe";
        alert("Take a deep breath. You're safe.");
    }
    
    else if (mood === "tired") {
        document.body.style.background = "#fef9c3";
        alert("Rest is also progress.");
    }
}