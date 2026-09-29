import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// No API key, token, or paid provider is used here.
// Do not fabricate horoscope text or copy publisher content without an authorized public source.
export async function GET() {
  return NextResponse.json({
    items: [],
    error: "Live Rasi Phalalu source is not configured yet. DharmaPulse does not use API keys or tokens for this feature.",
    source: null,
  }, { status: 503 });
}
