# Mon's Fun Run Trivia Night

A single-page charity event website for Mon's Fun Run Trivia Night, raising funds for premature babies and their families.

## What the page does

- Introduces the event with a warm purple/lavender design, floating heart animations, and Google Fonts (Lora + Nunito)
- Displays event details, cause statistics, and a "What to Expect" section
- Collects RSVP registrations via a form that POSTs to a Google Apps Script web app, which logs submissions to a Google Sheet
- Directs attendees to donate $20 via Grassrootz to secure their spot

All HTML, CSS, and JavaScript live in a single self-contained file (`index.html`) — no build step or external asset files required.

---

## Manual steps before going live

### Step 1 — Set up the Google Sheet and deploy the Apps Script

1. Create a new Google Sheet and name the first tab **Trivia Night RSVPs**
2. Add headers in row 1: `Timestamp` · `Name` · `Number of People`
3. Copy the Sheet ID from the URL (the string between `/d/` and `/edit`)
4. Open `apps-script.gs`, replace `SHEET_ID_HERE` with your actual Sheet ID
5. In the Google Sheet go to **Extensions → Apps Script**
6. Delete existing code, paste the contents of `apps-script.gs`
7. Click **Deploy → New Deployment → Web App**
8. Set *Execute as*: **Me** and *Who has access*: **Anyone**, then click Deploy
9. Authorise the script when prompted
10. Copy the deployment URL provided by Google

### Step 2 — Update `index.html` with the Apps Script URL

Open `index.html` and find this line near the bottom of the `<script>` block:

```js
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

Replace `YOUR_APPS_SCRIPT_URL_HERE` with the deployment URL from Step 1.

### Step 3 — Upload to Cloudflare Pages (or any static host)

Upload `index.html` to Cloudflare Pages (or your preferred static host). No build configuration is needed — just deploy the single HTML file.

---

## Placeholders to update before going live

| Placeholder | Location | What to replace it with |
|---|---|---|
| `YOUR_APPS_SCRIPT_URL_HERE` | `index.html` — `APPS_SCRIPT_URL` constant | Google Apps Script deployment URL |
| `SHEET_ID_HERE` | `apps-script.gs` — `SHEET_ID` variable | Your Google Sheet ID |
| `Saturday TBC` | `index.html` — hero detail bar & info card | Actual event date |
| `Venue TBC` | `index.html` — hero detail bar & info card | Actual venue name and address |
| `hello@example.com` | `index.html` — footer | Real contact email address |
