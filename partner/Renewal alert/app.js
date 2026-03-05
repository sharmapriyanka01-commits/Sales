const customers = [
  { name: "Acme Manufacturing", sku: "SKU-1001", renewalDate: "2026-04-04" },
  { name: "BrightWave Retail", sku: "SKU-1002", renewalDate: "2026-05-04" },
  { name: "Crestline Health", sku: "SKU-1003", renewalDate: "2026-06-03" },
  { name: "Delta Logistics", sku: "SKU-1004", renewalDate: "2026-03-25" },
  { name: "Evergreen Foods", sku: "SKU-1005", renewalDate: "2026-04-29" },
  { name: "Futura Dynamics", sku: "SKU-1006", renewalDate: "2026-06-13" },
  { name: "GoldenPeak Hotels", sku: "SKU-1007", renewalDate: "2026-07-23" },
  { name: "Horizon Energy", sku: "SKU-1008", renewalDate: "2026-04-14" },
  { name: "Innova Finance", sku: "SKU-1009", renewalDate: "2026-06-28" },
  { name: "Jetstream Telecom", sku: "SKU-1010", renewalDate: "2026-08-22" },
];

const thresholds = [30, 60, 90];
const asOfDateInput = document.getElementById("as-of-date");
const runCheckButton = document.getElementById("run-check");
const resetDateButton = document.getElementById("reset-date");
const alertListElement = document.getElementById("alert-list");
const popupContainer = document.getElementById("popup-container");
const tableBody = document.getElementById("customer-table-body");

function normalizeDate(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function getDaysRemaining(renewalDate, asOfDate) {
  const renewal = normalizeDate(renewalDate);
  const fromDate = normalizeDate(asOfDate);
  const millisPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((renewal - fromDate) / millisPerDay);
}

function buildAlertMessage(customer, daysRemaining) {
  return `${customer.name} (${customer.sku}) renews in ${daysRemaining} days on ${customer.renewalDate}.`;
}

function clearOutput() {
  tableBody.innerHTML = "";
  alertListElement.innerHTML = "";
  popupContainer.innerHTML = "";
}

function render(asOfDate) {
  clearOutput();
  const popupMessages = [];

  customers.forEach((customer) => {
    const daysRemaining = getDaysRemaining(customer.renewalDate, asOfDate);
    const thresholdMatch = thresholds.includes(daysRemaining);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.sku}</td>
      <td>${customer.renewalDate}</td>
      <td>${daysRemaining}${thresholdMatch ? ' <span class="badge">Alert</span>' : ""}</td>
    `;
    tableBody.appendChild(row);

    if (thresholdMatch) {
      const message = buildAlertMessage(customer, daysRemaining);

      const alertItem = document.createElement("li");
      alertItem.textContent = message;
      alertListElement.appendChild(alertItem);

      const popup = document.createElement("div");
      popup.className = "popup";
      popup.textContent = `⚠ Renewal Alert: ${message}`;
      popupContainer.appendChild(popup);

      popupMessages.push(message);
    }
  });

  if (popupMessages.length === 0) {
    const noAlertItem = document.createElement("li");
    noAlertItem.textContent = "No customers currently at 30, 60, or 90-day renewal thresholds.";
    alertListElement.appendChild(noAlertItem);
  }
}

function formatDateForInput(date) {
  const normalized = normalizeDate(date);
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, "0");
  const day = String(normalized.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSelectedDate() {
  return asOfDateInput.value || formatDateForInput(new Date());
}

asOfDateInput.value = formatDateForInput(new Date());
runCheckButton.addEventListener("click", () => render(getSelectedDate()));
resetDateButton.addEventListener("click", () => {
  asOfDateInput.value = formatDateForInput(new Date());
  render(asOfDateInput.value);
});

render(asOfDateInput.value);
