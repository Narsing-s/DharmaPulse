import { getDailyPanchang } from "panchang-ts";
const result=getDailyPanchang(new Date("2026-01-15T00:00:00Z"),{latitude:17.385,longitude:78.4867},{timezone:330});
if(!result) throw new Error("Panchang result missing");
if(!result.angas?.tithis?.length) throw new Error("Tithi missing");
if(!result.angas?.nakshatras?.length) throw new Error("Nakshatra missing");
if(!result.sun?.riseLocal||!result.sun?.setLocal) throw new Error("Sunrise/sunset missing");
if(!result.inauspicious?.rahuKalam) throw new Error("Rahu Kalam missing");
console.log("Panchang engine smoke test passed.");