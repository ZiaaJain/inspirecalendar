const calendarEl = document.getElementById("calendar");
const usernameEl = document.getElementById("username");

const user = JSON.parse(localStorage.getItem("user"));
if (user) usernameEl.textContent = user.name;

let events = JSON.parse(localStorage.getItem("events")) || [];

function addEvent() {
  const title = eventTitle.value;
  const date = eventDate.value;
  if (!title || !date) return alert("Fill all fields");

  events.push({ title, date });
  localStorage.setItem("events", JSON.stringify(events));
  renderCalendar();
}

function renderCalendar() {
  calendarEl.innerHTML = "";
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.className = "day";
    dayBox.innerHTML = `<strong>${i}</strong>`;

    const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;

    if (events.some(e => e.date === dateStr)) {
      dayBox.classList.add("highlight");
    }

    calendarEl.appendChild(dayBox);
  }
}

renderCalendar();
