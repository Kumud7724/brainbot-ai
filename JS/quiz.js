const quizBtn = document.getElementById("quizBtn");

quizBtn.addEventListener("click", generateQuiz);

async function generateQuiz() {

    const topic = document.getElementById("quizTopic").value.trim();

    if (topic === "") {

        alert("Please enter a topic.");

        return;

    }

    document.getElementById("quizResult").innerHTML =
    "🤖 BrainBot AI is generating your quiz...";

    try {

        const response = await fetch("http://localhost:3000/quiz", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                topic: topic

            })

        });

        const data = await response.json();

        document.getElementById("quizResult").innerHTML =
        `<pre style="white-space:pre-wrap;">${data.quiz}</pre>`;

    }

    catch(error){

        console.error(error);

        document.getElementById("quizResult").innerHTML =
        "❌ Unable to generate quiz.";

    }

}