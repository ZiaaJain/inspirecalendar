const eventList = document.getElementById("eventList");
let events = JSON.parse(localStorage.getItem("events")) || [];

function addEvent() {
  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  const type = document.getElementById("eventType").value;

  if (!title || !date) {
    alert("Please enter a title and date.");
    return;
  }

  events.push({ title, date, type });
  localStorage.setItem("events", JSON.stringify(events));
  renderEvents();

  document.getElementById("eventTitle").value = "";
}

function renderEvents() {
  eventList.innerHTML = "";

  events.forEach((event, index) => {
    const li = document.createElement("li");
    li.className = event.type;
    li.textContent = `${event.date} — ${event.title}`;

    li.onclick = () => {
      if (confirm("Delete this event?")) {
        events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();
      }
    };

    eventList.appendChild(li);
  });
}

renderEvents();
