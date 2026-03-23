/**
 * Google Apps Script — Mon's Fun Run Trivia Night RSVP handler
 *
 * DEPLOYMENT INSTRUCTIONS
 * ─────────────────────────────────────────────────────────────
 *  1. Go to Google Sheets and create a new spreadsheet.
 *     Name the first sheet tab: "Trivia Night RSVPs"
 *
 *  2. Add headers in row 1:
 *        A1: Timestamp
 *        B1: Name
 *        C1: Number of People
 *
 *  3. Copy the Sheet ID from the URL. It is the long string between
 *     /d/ and /edit in the browser address bar.
 *     e.g. https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
 *
 *  4. Replace SHEET_ID_HERE below with your actual Sheet ID.
 *
 *  5. In the Google Sheet go to Extensions → Apps Script.
 *
 *  6. Delete all existing code in the editor, then paste this
 *     entire script in its place.
 *
 *  7. Click Deploy → New Deployment.
 *
 *  8. Under "Select type" choose Web App.
 *     Set:  Execute as  → Me
 *           Who has access → Anyone
 *     Click Deploy.
 *
 *  9. Authorise the script when prompted (Google will ask you to
 *     review permissions — click through and allow access).
 *
 * 10. Copy the Web App URL shown after deployment.
 *
 * 11. Open trivia-night/index.html, find the line:
 *        const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
 *     Replace YOUR_APPS_SCRIPT_URL_HERE with the URL you just copied.
 *
 * 12. Save index.html and upload it to Cloudflare Pages
 *     (or whichever static host you are using).
 * ─────────────────────────────────────────────────────────────
 */

// ── REPLACE with your actual Google Sheet ID ─────────────────
var SHEET_ID = 'SHEET_ID_HERE';
// ─────────────────────────────────────────────────────────────

/**
 * Handles HTTP POST requests from the RSVP form.
 * Expects a JSON body with { name, numberOfPeople }.
 */
function doPost(e) {
  try {
    // Parse the incoming JSON body
    var raw = e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    var name = (data.name || '').toString().trim();
    var numberOfPeople = parseInt(data.numberOfPeople, 10);

    // Basic server-side validation
    if (!name) {
      return jsonResponse({ status: 'error', message: 'Name is required.' });
    }
    if (isNaN(numberOfPeople) || numberOfPeople < 1 || numberOfPeople > 8) {
      return jsonResponse({ status: 'error', message: 'Number of people must be between 1 and 8.' });
    }

    // Append a row to the sheet
    var sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName('Trivia Night RSVPs');

    if (!sheet) {
      return jsonResponse({ status: 'error', message: 'Sheet "Trivia Night RSVPs" not found.' });
    }

    var timestamp = new Date().toISOString();
    sheet.appendRow([timestamp, name, numberOfPeople]);

    return jsonResponse({ status: 'success', message: 'RSVP recorded.' });

  } catch (err) {
    return jsonResponse({ status: 'error', message: 'Server error: ' + err.message });
  }
}

/**
 * Builds a JSON ContentService response with CORS headers.
 */
function jsonResponse(obj) {
  var output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
