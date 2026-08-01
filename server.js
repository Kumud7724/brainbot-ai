require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve HTML, CSS, JS, Images
app.use(express.static(path.join(__dirname)));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Common AI Function
async function askAI(prompt) {

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content:
                    "You are BrainBot AI, an intelligent learning assistant for students."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return completion.choices[0].message.content;
}

// ================= CHAT =================

app.post("/chat", async (req, res) => {

    try {

        const reply = await askAI(req.body.message);

        res.json({ reply });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            reply: "Error connecting to BrainBot AI."
        });

    }

});

// ================= NOTES =================

app.post("/notes", async (req, res) => {

    try {

        const topic = req.body.topic;

        const prompt = `
Generate detailed study notes on "${topic}" for a B.Tech student.

Include:
1. Introduction
2. Explanation
3. Advantages
4. Disadvantages
5. Applications
6. Conclusion
`;

        const notes = await askAI(prompt);

        res.json({ notes });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            notes: "Unable to generate notes."
        });

    }

});

// ================= QUIZ =================

app.post("/quiz", async (req, res) => {

    try {

        const topic = req.body.topic;

        const prompt = `
Generate 10 multiple-choice questions on "${topic}".

Rules:
- Each question must have four options:
A)
B)
C)
D)
- Mention the correct answer after every question.
- Format neatly.
`;

        const quiz = await askAI(prompt);

        res.json({ quiz });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            quiz: "Unable to generate quiz."
        });

    }

});

// ================= FLASHCARDS =================

app.post("/flashcards", async (req, res) => {

    try {

        const topic = req.body.topic;

        const prompt = `
Generate 10 flashcards for "${topic}".

Question:
Answer:
`;

        const flashcards = await askAI(prompt);

        res.json({ flashcards });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            flashcards: "Unable to generate flashcards."
        });

    }

});

// ================= STUDY PLANNER =================

app.post("/planner", async (req, res) => {

    try {

        const details = req.body.details;

        const prompt = `
Create a personalized study timetable.

Student Details:
${details}

Make it easy to follow.
`;

        const planner = await askAI(prompt);

        res.json({ planner });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            planner: "Unable to generate planner."
        });

    }

});

// Start Server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 BrainBot AI running on port ${PORT}`);
});