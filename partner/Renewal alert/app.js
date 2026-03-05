import {
  customers,
  thresholds,
  getDaysRemaining,
  buildAlertMessage,
  formatDateForInput,
} from "./renewalLogic.js";

const asOfDateInput = document.getElementById("as-of-date");
const runCheckButton = document.getElementById("run-check");
const resetDateButton = document.getElementById("reset-date");
const alertListElement = document.getElementById("alert-list");
const popupContainer = document.getElementById("popup-container");
const tableBody = document.getElementById("customer-table-body");

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
