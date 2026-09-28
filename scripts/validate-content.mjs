import fs from "node:fs";
const c=JSON.parse(fs.readFileSync("public/content.json","utf8"));

for (const k of ["deities","messages","mantras","wisdom","questions","festivals","puja"]) {
  if (!Array.isArray(c[k]) || !c[k].length) throw new Error(k + " is empty");
}

const all = c.deities.concat(c.messages, c.mantras, c.wisdom, c.festivals, c.puja).map(JSON.stringify);
if (new Set(all).size !== all.length) throw new Error("Duplicate content detected");

for (const festival of c.festivals) {
  const date = festival[0];
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Invalid festival date: " + date);
  }
  const parsed = new Date(date + "T00:00:00Z");
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error("Invalid calendar date: " + date);
  }
}

console.log("Content validation passed.");

for (const k of ["messages","mantras","questions"]) {
  const values = c[k].map(item => item[1] || item[0]).filter(Boolean);
  if (values.length < 30 || new Set(values).size !== values.length) {
    throw new Error(k + " must contain at least 30 unique daily entries");
  }
}
