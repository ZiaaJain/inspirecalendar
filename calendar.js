const calendarEl = document.getElementById("calendar");
const usernameEl = document.getElementById("username");
const quotePopup = document.getElementById("quotePopup");
const quoteText = document.getElementById("quoteText");
const closeQuote = document.getElementById("closeQuote");

const user = JSON.parse(localStorage.getItem("user"));
if(!user) window.location.href = "index.html";
usernameEl.textContent = user.name;

let events = JSON.parse(localStorage.getItem("events")) || [];

// Motivational quotes
const quotes = [
  "Small steps move you forward 🌷",
  "You're doing better than you think 🤍",
  "Progress over perfection ✨",
  "Rest is productive too 🌙",
  "Every day is a fresh start 🌸"
];
quoteText.textContent = quotes[Math.floor(Math.random()*quotes.length)];
closeQuote.onclick = () => quotePopup.style.display = "none";

// Calendar variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// Add event
function addEvent() {
  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value;
  const type = document.getElementById("eventType").value;
  if(!title || !date) return alert("Fill all fields");

  events.push({title, date, type, user:user.name});
  localStorage.setItem("events", JSON.stringify(events));
  renderCalendar();

  document.getElementById("eventTitle").value = "";
  document.getElementById("eventDate").value = "";
}

// Month navigation
function changeMonth(delta){
  currentMonth += delta;
  if(currentMonth<0){ currentMonth=11; currentYear--; }
  if(currentMonth>11){ currentMonth=0; currentYear++; }
  renderCalendar();
}

// Render calendar
function renderCalendar() {
  calendarEl.innerHTML = "";

  document.getElementById("monthLabel").textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Create grid container
  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  // Add day headers
  dayNames.forEach(d => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header";
    dayHeader.textContent = d;
    grid.appendChild(dayHeader);
  });

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = (firstDay.getDay() + 6) % 7; // Monday=0
  const daysInMonth = new Date(currentYear, currentMonth+1,0).getDate();

  for(let i=0; i<startingDay; i++){
    const emptyCell = document.createElement("div");
    emptyCell.className = "day-cell empty";
    grid.appendChild(emptyCell);
  }

  for(let day=1; day<=daysInMonth; day++){
    const cell = document.createElement("div");
    cell.className = "day-cell";

    cell.innerHTML = `<div class="date-number">${day}</div>`;

    const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const todaysEvents = events.filter(e => e.date === dateStr && e.user === user.name);

    todaysEvents.forEach(ev => {
      const evDiv = document.createElement("div");
      evDiv.textContent = ev.title;
      evDiv.className = "event";

      // Match legend colors
      if(ev.type==="school") evDiv.style.background="#bcd4e6"; 
      else if(ev.type==="personal") evDiv.style.background="#e6e6fa";
      else if(ev.type==="exam") evDiv.style.background="#ccccff";
      else evDiv.style.background="#d1e2d0";

      cell.appendChild(evDiv);
    });

    grid.appendChild(cell);
  }

  calendarEl.appendChild(grid);
}

renderCalendar();
