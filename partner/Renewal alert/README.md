# Partner App - Renewal Alert

## How to test locally

1. Start a static server from the repository root:
   ```bash
   python3 -m http.server 4173 --directory .
   ```
2. Open:
   `http://localhost:4173/partner/Renewal%20alert/index.html`
3. Use **As-of date** and click **Run Alert Check**.
4. Verify alerts appear when any renewal is exactly **30**, **60**, or **90** days away.

## Quick test dates

These as-of dates will trigger sample alerts with the seeded data:

- `2026-03-05` (30 days until Acme Manufacturing)
- `2026-02-03` (60 days until Acme Manufacturing)
- `2026-01-04` (90 days until Acme Manufacturing)

## Automated tests

Run:

```bash
node --test 'partner/Renewal alert/tests/renewalLogic.test.mjs'
```

This validates customer seed count and threshold/date calculations.
