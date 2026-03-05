export const customers = [
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

export const thresholds = [30, 60, 90];

export function normalizeDate(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

export function getDaysRemaining(renewalDate, asOfDate) {
  const renewal = normalizeDate(renewalDate);
  const fromDate = normalizeDate(asOfDate);
  const millisPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((renewal - fromDate) / millisPerDay);
}

export function buildAlertMessage(customer, daysRemaining) {
  return `${customer.name} (${customer.sku}) renews in ${daysRemaining} days on ${customer.renewalDate}.`;
}

export function getThresholdAlerts(asOfDate) {
  return customers
    .map((customer) => {
      const daysRemaining = getDaysRemaining(customer.renewalDate, asOfDate);
      return {
        customer,
        daysRemaining,
        thresholdMatch: thresholds.includes(daysRemaining),
      };
    })
    .filter((entry) => entry.thresholdMatch);
}

export function formatDateForInput(date) {
  const normalized = normalizeDate(date);
  const year = normalized.getFullYear();
  const month = String(normalized.getMonth() + 1).padStart(2, "0");
  const day = String(normalized.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
