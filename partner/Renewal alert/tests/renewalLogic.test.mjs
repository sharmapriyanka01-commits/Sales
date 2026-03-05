import test from "node:test";
import assert from "node:assert/strict";
import {
  customers,
  getDaysRemaining,
  getThresholdAlerts,
  formatDateForInput,
} from "../renewalLogic.js";

test("contains 10 seeded customers", () => {
  assert.equal(customers.length, 10);
});

test("returns exact day differences", () => {
  assert.equal(getDaysRemaining("2026-04-04", "2026-03-05"), 30);
  assert.equal(getDaysRemaining("2026-04-04", "2026-02-03"), 60);
  assert.equal(getDaysRemaining("2026-04-04", "2026-01-04"), 90);
});

test("finds threshold alerts for sample date", () => {
  const alerts = getThresholdAlerts("2026-03-05");
  assert.ok(alerts.length >= 1);
  assert.ok(alerts.some((entry) => entry.customer.name === "Acme Manufacturing" && entry.daysRemaining === 30));
});

test("formats date for input field", () => {
  assert.equal(formatDateForInput("2026-03-05T23:59:00Z"), "2026-03-05");
});
