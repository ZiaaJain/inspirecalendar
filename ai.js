const API_KEY = "https://api.openai.com/v1/chat/completions";

async function askAI() {
  const question = document.getElementById("question").value;
  const answerDiv = document.getElementById("answer");

  if (!question) {
    alert("Ask something first!");
    return;
  }

  answerDiv.innerHTML = "Inspire AI is thinking… ✨";

  const events = JSON.parse(localStorage.getItem("events")) || [];
  const eventContext = events
    .map(e => `${e.title} on ${e.date}`)
    .join(", ");

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are Inspire AI, a friendly and motivating assistant inside Inspire Calendar. You help students stay organized, calm, and confident. Keep answers supportive, practical, and encouraging."
            },
            {
              role: "user",
              content: `My upcoming events: ${eventContext}. My question: ${question}`
            }
          ]
        })
      }
    );

    const data = await response.json();
    answerDiv.innerHTML = data.choices[0].message.content;

  } catch (error) {
    answerDiv.innerHTML = "Something went wrong 😢";
    console.error(error);
  }
}
