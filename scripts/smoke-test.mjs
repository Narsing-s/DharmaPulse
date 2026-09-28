import fs from "node:fs";
import assert from "node:assert/strict";
const content=JSON.parse(fs.readFileSync("public/content.json","utf8"));
for(const key of ["deities","messages","mantras","wisdom","festivals","puja"]){assert.ok(Array.isArray(content[key])&&content[key].length>0,key+" must be non-empty")}
assert.ok(content.deities.length>=10,"deity library should contain at least 10 entries");
assert.ok(content.mantras.length>=5,"mantra library should contain at least 5 entries");
for(const f of content.festivals){assert.match(f[0],/^\d{4}-\d{2}-\d{2}$/,"festival date must be ISO date")}
assert.ok(fs.existsSync("public/sw.js"),"PWA service worker missing");
assert.ok(fs.existsSync("public/app.webmanifest"),"PWA manifest missing");
assert.ok(fs.existsSync("public/options.html"),"extension options missing");
console.log("DharmaPulse content/PWA/extension smoke tests passed.");