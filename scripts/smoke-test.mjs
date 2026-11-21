import fs from "node:fs";
import assert from "node:assert/strict";

const content = JSON.parse(fs.readFileSync("public/content.json", "utf8"));
for (const key of ["deities", "messages", "mantras", "wisdom", "festivals", "puja"]) {
  assert.ok(Array.isArray(content[key]) && content[key].length > 0, key + " must be non-empty");
}
assert.ok(content.deities.length >= 10, "deity library should contain at least 10 entries");
assert.ok(content.mantras.length >= 5, "mantra library should contain at least 5 entries");
for (const festival of content.festivals) {
  assert.match(festival[0], /^\d{4}-\d{2}-\d{2}$/, "festival date must be ISO date");
}
assert.ok(fs.existsSync("public/sw.js"), "PWA service worker missing");
assert.ok(fs.existsSync("public/app.webmanifest"), "PWA manifest missing");
assert.ok(fs.existsSync("public/options.html"), "extension options missing");
console.log("DharmaPulse content/PWA/extension smoke tests passed.");

assert.ok(fs.existsSync("app/components/DharmaCompanion.tsx"), "Dharma Companion component missing");
const appSource = fs.readFileSync("app/page.tsx", "utf8");
assert.ok(appSource.includes("DharmaCompanion"), "Dharma Companion is not wired into the app");
console.log("Dharma Companion integration checks passed.");
