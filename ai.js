const answer = document.getElementById("answer");
const aiName = document.getElementById("aiName");

const user = JSON.parse(localStorage.getItem("user"));
if (user) aiName.textContent = user.name;

function askAI() {
  const q = question.value.toLowerCase();

  if (q.includes("stress")) {
    answer.textContent = "Take a deep breath 🤍 Try breaking tasks into tiny steps.";
  } else if (q.includes("exam")) {
    answer.textContent = "Use 25-minute focus sessions with short breaks ✨ You’ve got this.";
  } else if (q.includes("tired")) {
    answer.textContent = "Rest matters 🌙 Even small pauses help your brain reset.";
  } else {
    answer.textContent = "You’re doing your best 🌷 Keep going gently.";
  }
}
