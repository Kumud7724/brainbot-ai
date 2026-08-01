async function generateNotes() {

    const topic = document.getElementById("topic").value.trim();

    if (topic === "") {

        alert("Please enter a topic.");

        return;

    }

    document.getElementById("notesResult").innerHTML =
    "🤖 BrainBot AI is generating notes...";

    try {

        const response = await fetch("http://localhost:3000/notes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic: topic
            })

        });

        const data = await response.json();

        document.getElementById("notesResult").innerHTML =
        `<pre style="white-space: pre-wrap;">${data.notes}</pre>`;

    }

    catch (error) {

        document.getElementById("notesResult").innerHTML =
        "❌ Unable to generate notes.";

        console.error(error);

    }

}