import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SIGNS = ["aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius","capricorn","aquarius","pisces"] as const;
const NAMES: Record<string,{name:string;telugu:string;symbol:string}> = {
  aries:{name:"Aries",telugu:"మేషం",symbol:"♈"}, taurus:{name:"Taurus",telugu:"వృషభం",symbol:"♉"},
  gemini:{name:"Gemini",telugu:"మిథునం",symbol:"♊"}, cancer:{name:"Cancer",telugu:"కర్కాటకం",symbol:"♋"},
  leo:{name:"Leo",telugu:"సింహం",symbol:"♌"}, virgo:{name:"Virgo",telugu:"కన్య",symbol:"♍"},
  libra:{name:"Libra",telugu:"తుల",symbol:"♎"}, scorpio:{name:"Scorpio",telugu:"వృశ్చికం",symbol:"♏"},
  sagittarius:{name:"Sagittarius",telugu:"ధనుస్సు",symbol:"♐"}, capricorn:{name:"Capricorn",telugu:"మకరం",symbol:"♑"},
  aquarius:{name:"Aquarius",telugu:"కుంభం",symbol:"♒"}, pisces:{name:"Pisces",telugu:"మీనం",symbol:"♓"},
};

async function translateToTelugu(text: string) {
  const url = "https://api.mymemory.translated.net/get?" + new URLSearchParams({
    q: text,
    langpair: "en|te",
  }).toString();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Telugu translation service unavailable");
  const data = await res.json();
  const translated = String(data?.responseData?.translatedText || "").trim();
  if (!translated) throw new Error("Telugu translation unavailable");
  return translated;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "te" ? "te" : "en";
  const requestedSign = searchParams.get("sign") || "";
  const signs = requestedSign && SIGNS.includes(requestedSign as typeof SIGNS[number])
    ? [requestedSign as typeof SIGNS[number]]
    : [...SIGNS];

  try {
    const items = await Promise.all(signs.map(async (sign) => {
      const api = await fetch(
        "https://freehoroscopeapi.com/api/v1/get-horoscope/daily?" +
          new URLSearchParams({ sign, day: "TODAY" }).toString(),
        { cache: "no-store" }
      );
      if (!api.ok) throw new Error(`Horoscope source returned ${api.status}`);
      const data = await api.json();
      const prediction = String(data?.horoscope || data?.description || "").trim();
      if (!prediction) throw new Error(`No horoscope returned for ${sign}`);

      const translated = lang === "te" ? await translateToTelugu(prediction) : prediction;
      const meta = NAMES[sign];
      return {
        slug: sign,
        name: meta.name,
        telugu: meta.telugu,
        symbol: meta.symbol,
        prediction: translated,
        date: new Date().toISOString().slice(0, 10),
        source: lang === "te" ? "Free Horoscope API • Telugu translation" : "Free Horoscope API",
        sourceUrl: "https://www.freehoroscopeapi.com/",
        language: lang,
      };
    }));

    return NextResponse.json({
      items,
      fetchedAt: new Date().toISOString(),
      source: "Free Horoscope API",
      note: lang === "te" ? "Telugu text is a machine translation of the live English reading." : undefined,
    });
  } catch (error) {
    return NextResponse.json({
      items: [],
      error: error instanceof Error ? error.message : "Unable to load today's Rasi Phalalu.",
      source: "Free Horoscope API",
    }, { status: 502 });
  }
}
