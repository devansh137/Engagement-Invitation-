// OPTIONAL: Google Apps Script click tracker.
// 1. Create a Google Sheet.
// 2. Extensions -> Apps Script.
// 3. Paste this code and deploy as Web app.
// 4. Set "Who has access" to Anyone.
// 5. Copy the /exec URL into TRACKING_URL in index.html.
// The sheet will contain timestamp, event, guest name (if supplied), and page URL.

const SHEET_NAME = "Clicks";

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp","Event","Guest name","Page"]);
  }
  const p = e.parameter || {};
  sheet.appendRow([
    new Date(),
    p.event || "unknown",
    p.guest || "",
    p.page || ""
  ]);
  return ContentService.createTextOutput("ok")
    .setMimeType(ContentService.MimeType.TEXT);
}
