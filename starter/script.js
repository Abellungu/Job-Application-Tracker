/* Session 10 — Saving Data With Local Storage
   Add/delete/update already work below — but everything disappears
   on refresh, because it only lives in the `applications` variable.
   Your job: make it persist using localStorage. Work through the
   TODOs in order. */

let applications = [];

const form = document.getElementById("application-form");
const listContainer = document.getElementById("application-list");
const searchInput = document.getElementById("search-input")

// TODO 1: Write saveApplications(). It should convert `applications`
// to a JSON string with JSON.stringify(), and save it with
// localStorage.setItem("jobApplications", ...).
function saveApplications() {
     localStorage.setItem("jobApplications", JSON.stringify(applications));

}

// TODO 2: Write loadApplications(). It should read the saved string
// with localStorage.getItem("jobApplications"). If nothing has been
// saved yet (the result is null), set `applications` to an empty
// array. Otherwise, convert the string back into a real array with
// JSON.parse() and assign it to `applications`.
function loadApplications() {
     const savedApplications = localStorage.getItem("jobApplications");
      if (savedApplications === null) {
        applications = [];
      } else {
        applications = JSON.parse(savedApplications);
      }
    }



function renderApplications() {
  listContainer.innerHTML = "";

  applications.filter(function (app) {
      return app.company.toLowerCase().includes(searchInput.value.toLowerCase()) ||
             app.position.toLowerCase().includes(searchInput.value.toLowerCase());
  }).forEach(function (app) {
    const item = document.createElement("div");
    item.className = "application-item";
    item.dataset.id = app.id;
    item.innerHTML = `
      <span>${app.company} — ${app.position} (${app.status}) - ${app.dateApplied}</span>
      <span>
        <select class="status-select">
          <option value="Interested" ${app.status === "Interested" ? "selected" : ""}>Interested</option>
          <option value="Applied" ${app.status === "Applied" ? "selected" : ""}>Applied</option>
          <option value="Interview" ${app.status === "Interview" ? "selected" : ""}>Interview</option>
          <option value="Rejected" ${app.status === "Rejected" ? "selected" : ""}>Rejected</option>
          <option value="Offer" ${app.status === "Offer" ? "selected" : ""}>Offer</option>
        </select>
        <button class="delete-button">Delete</button>
      </span>
    `;
    listContainer.appendChild(item);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newApplication = {
    id: Date.now().toString(),
    company: document.getElementById("company").value,
    position: document.getElementById("position").value,
    status: document.getElementById("status").value,
    dateApplied: new Date().toLocaleString("en-GB"),
  };

  applications.push(newApplication);
  saveApplications();

  // TODO 3: Call saveApplications() here, so the new application
  // is written to localStorage right away.

  renderApplications();
  updateStats();
  form.reset();
});

listContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    const id = event.target.closest(".application-item").dataset.id;
    applications = applications.filter(function (app) {
      return app.id !== id;
    });

    saveApplications();

    renderApplications();
    updateStats();
  }
});

listContainer.addEventListener("change", function (event) {
  if (event.target.classList.contains("status-select")) {
    const id = event.target.closest(".application-item").dataset.id;
    const newStatus = event.target.value;

    const application = applications.find(function (app) {
      return app.id === id;
    });
    application.status = newStatus;
    saveApplications();

    // TODO 5: Call saveApplications() here too.

    renderApplications();
    updateStats();
  }
});

// TODO 6: Call loadApplications() here, BEFORE the first
// renderApplications() call, so any previously saved data shows up
// as soon as the page opens.
loadApplications();

updateStats();

renderApplications();
searchInput.addEventListener("input", function () {
  renderApplications();
});

function updateStats() {
    document.getElementById("total-count").textContent = applications.length;
    document.getElementById("applied-count").textContent =
        applications.filter(function (app) {
            return app.status === "Applied";
        }).length;

    document.getElementById("interested-count").textContent =
        applications.filter(function(app) {
            return app.status === "Interested";
        }).length;

    document.getElementById("interview-count").textContent =
        applications.filter(function(app) {
            return app.status === "Interview";
        }).length;

    document.getElementById("rejected-count").textContent =
        applications.filter(function(app) {
            return app.status === "Rejected";
        }).length;

    document.getElementById("offer-count").textContent =
        applications.filter(function(app) {
            return app.status === "Offer";
        }).length;
}
