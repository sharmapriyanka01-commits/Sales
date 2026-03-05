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
const today = new Date();
today.setHours(0, 0, 0, 0);

function getDaysRemaining(renewalDate) {
  const renewal = new Date(renewalDate);
  renewal.setHours(0, 0, 0, 0);
  const millisPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((renewal - today) / millisPerDay);
}

function buildAlertMessage(customer, daysRemaining) {
  return `${customer.name} (${customer.sku}) renews in ${daysRemaining} days on ${customer.renewalDate}.`;
}

const alertListElement = document.getElementById("alert-list");
const tableBody = document.getElementById("customer-table-body");
const popupMessages = [];

customers.forEach((customer) => {
  const daysRemaining = getDaysRemaining(customer.renewalDate);

  const row = document.createElement("tr");
  const thresholdMatch = thresholds.includes(daysRemaining);

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

    popupMessages.push(`⚠ Renewal Alert: ${message}`);
  }
});

if (popupMessages.length === 0) {
  const noAlertItem = document.createElement("li");
  noAlertItem.textContent = "No customers currently at 30, 60, or 90-day renewal thresholds.";
  alertListElement.appendChild(noAlertItem);
} else {
  window.alert(popupMessages.join("\n"));
}
