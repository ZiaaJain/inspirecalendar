const calendar = document.getElementById("calendar");
const username = document.getElementById("username");
const quotePopup = document.getElementById("quotePopup");
const quoteText = document.getElementById("quoteText");
const closeQuote = document.getElementById("closeQuote");

const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const eventCategory = document.getElementById("eventCategory");

// Get current user
let user = JSON.parse(localStorage.getItem("user"));
if(!user) window.location.href = "index.html";
username.textContent = user.name;

// Get events from localStorage
let events = JSON.parse(localStorage.getItem("events")) || [];

// Motivation quotes
const quotes = [
  "Small steps still move you forward 🌷",
  "You’re doing better than you think 🤍",
  "Progress over perfection ✨",
  "Rest is productive too 🌙",
  "Every day is a fresh start 🌸",
  "Believe in yourself today 💫",
  "You’ve got this 🌼"
];

function showQuote() {
  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  quotePopup.style.display = "block";
}
showQuote();
closeQuote.onclick = () => quotePopup.style.display = "none";

// Calendar variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// Add Event
function addEvent() {
  const title = eventTitle.value.trim();
  const date = eventDate.value;
  const category = eventCategory.value;
  if(!title || !date) return alert("Fill all fields");

  events.push({title, date, category, user:user.name});
  localStorage.setItem("events", JSON.stringify(events));
  renderCalendar();
  eventTitle.value = "";
  eventDate.value = "";
}

// Change Month
function changeMonth(delta){
  currentMonth += delta;
  if(currentMonth<0){ currentMonth=11; currentYear--; }
  if(currentMonth>11){ currentMonth=0; currentYear++; }
  renderCalendar();
}

// Render Calendar
function renderCalendar(){
  calendar.innerHTML = "";

  document.getElementById("monthLabel").textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Day headers
  const headerRow = document.createElement("div");
  headerRow.className = "calendar-row";
  dayNames.forEach(day=>{
    const d = document.createElement("div");
    d.className="day"; // match your CSS
    d.textContent = day;
    d.style.fontWeight = "bold";
    headerRow.appendChild(d);
  });
  calendar.appendChild(headerRow);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = (firstDay.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();

  let row = document.createElement("div");
  row.className = "calendar-row";

  // Blank cells
  for(let i=0;i<startingDay;i++){
    const empty = document.createElement("div");
    empty.className = "day empty";
    row.appendChild(empty);
  }

  // Days
  for(let day=1; day<=daysInMonth; day++){
    if(row.childNodes.length===7){
      calendar.appendChild(row);
      row = document.createElement("div");
      row.className = "calendar-row";
    }

    const dayCell = document.createElement("div");
    dayCell.className = "day";

    const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const todaysEvents = events.filter(e => e.date===dateStr && e.user===user.name);

    if(todaysEvents.length>0){
      dayCell.classList.add("highlight");
      todaysEvents.forEach(ev=>{
        const evDiv = document.createElement("div");
        evDiv.style.fontSize = "0.75rem";
        evDiv.style.marginTop = "3px";
        evDiv.textContent = `${ev.title} (${ev.category})`;
        dayCell.appendChild(evDiv);
      });
    }

    dayCell.innerHTML = `<strong>${day}</strong>` + dayCell.innerHTML;
    row.appendChild(dayCell);
  }

  // Fill end blanks
  while(row.childNodes.length<7){
    const empty = document.createElement("div");
    empty.className = "day empty";
    row.appendChild(empty);
  }

  calendar.appendChild(row);
}

// Initial render
renderCalendar();
