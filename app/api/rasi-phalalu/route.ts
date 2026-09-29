import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const signs = [
  ["aries", "మేషం", "Mesha Rasi"], ["taurus", "వృషభం", "Vrushabha Rasi"],
  ["gemini", "మిథునం", "Mithuna Rasi"], ["cancer", "కర్కాటకం", "Karkataka Rasi"],
  ["leo", "సింహం", "Simha Rasi"], ["virgo", "కన్య", "Kanya Rasi"],
  ["libra", "తుల", "Tula Rasi"], ["scorpio", "వృశ్చికం", "Vrischika Rasi"],
  ["sagittarius", "ధనుస్సు", "Dhanus Rasi"], ["capricorn", "మకరం", "Makara Rasi"],
  ["aquarius", "కుంభం", "Kumbha Rasi"], ["pisces", "మీనం", "Meena Rasi"],
] as const;

const API = "https://vedintelastroapi.com/api/v1/horoscope-by-sign/daily";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const lang = params.get("lang") === "en" ? "en" : "te";
  const apiKey = process.env.VEDINTEL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Live Rasi Phalalu is not configured. Add VEDINTEL_API_KEY to the server environment.", setupRequired: true, items: [] }, { status: 503 });
  const date = params.get("date") || new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  const results = await Promise.all(signs.map(async ([slug, telugu, name]) => {
    try {
      const url = new URL(API);
      url.searchParams.set("api_key", apiKey); url.searchParams.set("sign", slug); url.searchParams.set("lang", lang); url.searchParams.set("date", date);
      const response = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
      if (!response.ok) return null;
      const body = await response.json();
      const data = body?.response ?? body?.data ?? body;
      const prediction = String(data?.prediction ?? data?.text ?? data?.horoscope ?? data?.description ?? "").trim();
      if (!prediction) return null;
      return { slug, telugu, name, prediction, date: String(data?.date ?? date), source: "VedIntel AstroAPI", sourceUrl: "https://vedintelastroapi.com/languages/telugu", language: lang };
    } catch { return null; }
  }));
  const items = results.filter(Boolean);
  if (!items.length) return NextResponse.json({ error: "The live Rasi Phalalu provider did not return today’s predictions.", items: [] }, { status: 502 });
  return NextResponse.json({ items, date, language: lang, fetchedAt: new Date().toISOString(), source: "VedIntel AstroAPI", sourceUrl: "https://vedintelastroapi.com/languages/telugu" }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}