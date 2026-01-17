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

  // Month label
  document.getElementById("monthLabel").textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Create table
  const table = document.createElement("table");
  table.className = "calendar-table";

  // Header row for days
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  dayNames.forEach(d => {
    const th = document.createElement("th");
    th.textContent = d;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = (firstDay.getDay() + 6) % 7; // Monday=0
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let dayCounter = 1;
  for(let week=0; week<6; week++){
    const tr = document.createElement("tr");
    for(let d=0; d<7; d++){
      const td = document.createElement("td");
      td.className = "day-cell";

      if(week === 0 && d < startingDay){
        td.classList.add("empty");
      } else if(dayCounter > daysInMonth){
        td.classList.add("empty");
      } else {
        td.innerHTML = `<div class="date-number">${dayCounter}</div>`;

        const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(dayCounter).padStart(2,"0")}`;
        const todaysEvents = events.filter(e => e.date === dateStr && e.user === user.name);

        todaysEvents.forEach(ev => {
          const evDiv = document.createElement("div");
          evDiv.textContent = ev.title;
          evDiv.className = "event";

          // Event colors
          if(ev.type==="school") evDiv.style.background="#FADDE1";
          else if(ev.type==="personal") evDiv.style.background="#EADBDD";
          else if(ev.type==="exam") evDiv.style.background="#D0D5EA";
          else evDiv.style.background="#F0D2DA";

          td.appendChild(evDiv);
        });

        dayCounter++;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    if(dayCounter > daysInMonth) break;
  }

  table.appendChild(tbody);
  calendarEl.appendChild(table);
}

renderCalendar();
