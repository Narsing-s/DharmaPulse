import fs from "node:fs";
const c=JSON.parse(fs.readFileSync("public/content.json","utf8"));
for(const k of ["deities","messages","mantras","wisdom","festivals","puja"]) if(!Array.isArray(c[k])||!c[k].length) throw new Error(k+" is empty");
const all=c.deities.concat(c.messages,c.mantras,c.wisdom,c.festivals,c.puja).map(JSON.stringify);
if(new Set(all).size!==all.length) throw new Error("Duplicate content detected");
for(const f of c.festivals) if(!/^\d{4}-\d{2}-\d{2}$/.test(f[0])) throw new Error("Invalid festival date: "+f[0]);
  const d = new Date(f[0] + "T00:00:00Z");
  if(Number.isNaN(d.getTime()) || d.toISOString().slice(0,10) !== f[0]) throw new Error("Invalid calendar date: "+f[0]);
console.log("Content validation passed.");