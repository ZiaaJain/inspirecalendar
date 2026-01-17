const calendar = document.getElementById("calendar");
const username = document.getElementById("username");
const quoteBox = document.getElementById("quoteBox");
const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");

const user = JSON.parse(localStorage.getItem("user"));
if(!user) {
  window.location.href = "login.html";
} else {
  username.textContent = user.name;
}

let events = JSON.parse(localStorage.getItem("events")) || [];

function addEvent() {
  const title = eventTitle.value.trim();
  const date = eventDate.value;
  if(!title || !date) return alert("Fill both fields");

  events.push({title, date, email: user.email});
  localStorage.setItem("events", JSON.stringify(events));

  renderCalendar();
  eventTitle.value = "";
  eventDate.value = "";
}

// Inspirational quotes
const quotes = [
  "Small steps still move you forward 🌷",
  "You’re doing better than you think 🤍",
  "Progress over perfection ✨",
  "Rest is productive too 🌙",
  "Every day is a fresh start 🌸"
];
quoteBox.textContent = quotes[Math.floor(Math.random() * quotes.length)];

function renderCalendar() {
  calendar.innerHTML = "";

  const now = new Date();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const month = now.getMonth();
  const year = now.getFullYear();

  // Month header
  const header = document.createElement("div");
  header.style.gridColumn = "span 7";
  header.style.textAlign = "center";
  header.style.fontWeight = "600";
  header.style.marginBottom = "10px";
  header.textContent = `${monthNames[month]} ${year}`;
  calendar.appendChild(header);

  const daysInMonth = new Date(year, month+1, 0).getDate();

  for(let i=1; i<=daysInMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.className = "day";
    dayBox.innerHTML = `<strong>${i}</strong>`;

    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;

    const todaysEvents = events.filter(e => e.date === dateStr && e.email === user.email);
    if(todaysEvents.length > 0) {
      dayBox.classList.add("highlight");
      todaysEvents.forEach(ev => {
        const evDiv = document.createElement("div");
        evDiv.style.fontSize = "0.7rem";
        evDiv.style.marginTop = "5px";
        evDiv.textContent = ev.title;
        dayBox.appendChild(evDiv);
      });
    }

    calendar.appendChild(dayBox);
  }
}

renderCalendar();
