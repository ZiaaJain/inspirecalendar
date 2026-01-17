const calendar = document.getElementById("calendar");
const username = document.getElementById("username");
const quoteBox = document.getElementById("quoteBox");

const user = JSON.parse(localStorage.getItem("user"));
if (user) username.textContent = user.name;

let events = JSON.parse(localStorage.getItem("events")) || [];

function addEvent() {
  const title = eventTitle.value;
  const date = eventDate.value;
  if (!title || !date) return alert("Fill everything");

  events.push({ title, date });
  localStorage.setItem("events", JSON.stringify(events));
  renderCalendar();
}

function renderCalendar() {
  calendar.innerHTML = "";
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= days; i++) {
    const day = document.createElement("div");
    day.className = "day";
    day.innerHTML = `<strong>${i}</strong>`;

    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
    if (events.some(e => e.date === dateStr)) {
      day.classList.add("highlight");
    }

    calendar.appendChild(day);
  }
}

const quotes = [
  "Small steps still move you forward 🌷",
  "You’re doing better than you think 🤍",
  "Progress over perfection ✨",
  "Rest is productive too 🌙"
];

quoteBox.textContent = quotes[Math.floor(Math.random() * quotes.length)];

renderCalendar();
