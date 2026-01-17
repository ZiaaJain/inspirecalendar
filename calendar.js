const calendar = document.getElementById("calendar");
const username = document.getElementById("username");
const quotePopup = document.getElementById("quotePopup");
const quoteText = document.getElementById("quoteText");
const closeQuote = document.getElementById("closeQuote");

const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");

let user = JSON.parse(localStorage.getItem("user"));
if(!user) window.location.href = "index.html";
username.textContent = user.name;

let events = JSON.parse(localStorage.getItem("events")) || [];

// Motivation popup
const quotes = [
  "Small steps still move you forward 🌷",
  "You’re doing better than you think 🤍",
  "Progress over perfection ✨",
  "Rest is productive too 🌙",
  "Every day is a fresh start 🌸"
];
quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
closeQuote.onclick = () => quotePopup.style.display="none";

// Calendar variables
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// Add event
function addEvent() {
  const title = eventTitle.value.trim();
  const date = eventDate.value;
  if(!title || !date) return alert("Fill both fields");

  events.push({title, date, email:user.email});
  localStorage.setItem("events", JSON.stringify(events));
  renderCalendar();
  eventTitle.value = "";
  eventDate.value = "";
}

// Change month
function changeMonth(delta){
  currentMonth += delta;
  if(currentMonth<0){ currentMonth=11; currentYear--; }
  if(currentMonth>11){ currentMonth=0; currentYear++; }
  renderCalendar();
}

// Render calendar in grid with MTWTFSS
function renderCalendar(){
  calendar.innerHTML="";
  document.getElementById("monthLabel").textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Day headers
  const headerRow = document.createElement("div");
  headerRow.className = "calendar-row";
  dayNames.forEach(day=>{
    const d = document.createElement("div");
    d.className="calendar-day-name";
    d.textContent=day;
    headerRow.appendChild(d);
  });
  calendar.appendChild(headerRow);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = (firstDay.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();

  let row = document.createElement("div");
  row.className="calendar-row";

  // Blank squares before first day
  for(let i=0;i<startingDay;i++){
    const empty = document.createElement("div");
    empty.className="calendar-day empty";
    row.appendChild(empty);
  }

  for(let day=1;day<=daysInMonth;day++){
    if(row.childNodes.length===7){
      calendar.appendChild(row);
      row=document.createElement("div");
      row.className="calendar-row";
    }

    const dayCell=document.createElement("div");
    dayCell.className="calendar-day";
    dayCell.innerHTML=`<strong>${day}</strong>`;

    const dateStr = `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const todaysEvents = events.filter(e=>e.date===dateStr && e.email===user.email);

    if(todaysEvents.length>0){
      dayCell.classList.add("highlight");
      todaysEvents.forEach(ev=>{
        const evDiv = document.createElement("div");
        evDiv.style.fontSize="0.7rem";
        evDiv.style.marginTop="5px";
        evDiv.textContent=ev.title;
        dayCell.appendChild(evDiv);
      });
    }

    row.appendChild(dayCell);
  }

  while(row.childNodes.length<7){
    const empty = document.createElement("div");
    empty.className="calendar-day empty";
    row.appendChild(empty);
  }

  calendar.appendChild(row);
}

renderCalendar();
