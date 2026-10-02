"use client";

import { useMemo, useState } from "react";

type HistoryItem = { date: string; japa?: number; meditation?: number };
type Session = { date: string; minutes?: number; type?: string };

const library = [
  { title: "Deity Guides", te: "దేవతా మార్గదర్శకాలు", description: "Short devotional guides, mantras and reflections.", href: "/learn/kanaka-durga", icon: "🛕" },
  { title: "Bhagavad Gita", te: "భగవద్గీత", description: "A future-ready space for chapter and verse-based study.", href: "#gita", icon: "📖" },
  { title: "Mantra Practice", te: "మంత్ర సాధన", description: "Return to the mantras already available in DharmaPulse.", href: "#mantra", icon: "📿" },
  { title: "Puja Guides", te: "పూజ మార్గదర్శకాలు", description: "Simple, respectful steps for a focused devotional moment.", href: "#puja", icon: "🪔" },
  { title: "Dharma Reflections", te: "ధర్మ ఆలోచనలు", description: "Daily questions designed for quiet reflection and action.", href: "#wisdom", icon: "🌿" },
  { title: "Meditation", te: "ధ్యానం", description: "Short sessions for stillness, attention and consistency.", href: "#meditate", icon: "🧘" }
];

export default function DharmaHub({
  mode,
  history,
  sessions,
  favorites,
  telugu
}: {
  mode: "my" | "library";
  history: HistoryItem[];
  sessions: Session[];
  favorites: string[];
  telugu: boolean;
}) {
  const [libraryQuery, setLibraryQuery] = useState("");

  const stats = useMemo(() => {
    const japa = history.reduce((sum, x) => sum + Number(x.japa || 0), 0);
    const meditation = history.reduce((sum, x) => sum + Number(x.meditation || 0), 0);
    const activeDays = history.filter(x => Number(x.japa || 0) > 0 || Number(x.meditation || 0) > 0).length;
    const active = new Set(history.filter(x => Number(x.japa || 0) > 0 || Number(x.meditation || 0) > 0).map(x => x.date));
    let streak = 0;
    for (let i = 0; i < 366; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (!active.has(key)) break;
      streak++;
    }
    return { japa, meditation, activeDays, streak };
  }, [history]);

  if (mode === "library") {
    const filtered = library.filter(x =>
      (x.title + " " + x.te + " " + x.description).toLowerCase().includes(libraryQuery.toLowerCase())
    );
    return (
      <section className="info" aria-labelledby="library-title">
        <div className="sectionHead">
          <div>
            <h2 id="library-title">{telugu ? "ధర్మ లైబ్రరీ" : "Dharma Library"}</h2>
            <p className="note">{telugu ? "భక్తి, అధ్యయనం మరియు ఆత్మపరిశీలన కోసం ప్రశాంతమైన స్థలం." : "A calm place for devotion, study and reflection."}</p>
          </div>
        </div>
        <input aria-label="Search Dharma Library" placeholder={telugu ? "లైబ్రరీలో వెతకండి…" : "Search the library…"} value={libraryQuery} onChange={e => setLibraryQuery(e.target.value)} />
        <div className="grid" style={{ marginTop: 16 }}>
          {filtered.map(item => (
            <article className="tile" key={item.title} style={{ minHeight: 150 }}>
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <b>{telugu ? item.te : item.title}</b>
              <small>{item.description}</small>
              <a href={item.href} style={{ marginTop: "auto", fontWeight: 700 }}>Explore →</a>
            </article>
          ))}
        </div>
        {!filtered.length && <p className="note">No library items match your search.</p>}
      </section>
    );
  }

  const latest = [...history].sort((a, b) => b.date.localeCompare(a.date))[0];
  const totalMeditationSessions = sessions.filter(x => x.type === "meditation").length;

  return (
    <section className="info" aria-labelledby="my-dharma-title">
      <div className="sectionHead">
        <div>
          <h2 id="my-dharma-title">{telugu ? "నా ధర్మ సాధన" : "My Dharma"}</h2>
          <p className="note">{telugu ? "మీ సాధన ఈ పరికరంలోనే గోప్యంగా ఉంటుంది." : "Your practice stays local on this device."}</p>
        </div>
      </div>
      <div className="grid">
        {[
          ["🔥", telugu ? "జపం" : "Japa", stats.japa.toLocaleString()],
          ["🧘", telugu ? "ధ్యానం" : "Meditation", String(stats.meditation) + " min"],
          ["📅", telugu ? "సాధన రోజులు" : "Practice days", String(stats.activeDays)],
          ["✨", telugu ? "స్ట్రీక్" : "Current streak", String(stats.streak) + " day" + (stats.streak === 1 ? "" : "s")],
          ["❤️", telugu ? "ఇష్టమైనవి" : "Favorites", String(favorites.length)],
          ["⏱️", telugu ? "ధ్యాన సెషన్లు" : "Meditation sessions", String(totalMeditationSessions)]
        ].map(([icon, label, value]) => (
          <article className="tile" key={label}>
            <div style={{ fontSize: 24 }}>{icon}</div>
            <b>{label}</b>
            <small style={{ fontSize: 20, fontWeight: 800 }}>{value}</small>
          </article>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: 18, borderRadius: 18, border: "1px solid var(--line, #ddd)" }}>
        <h3 style={{ marginTop: 0 }}>{telugu ? "ఈ రోజు కొనసాగించండి" : "Continue today's practice"}</h3>
        <p className="note">{latest ? latest.date + " · " + (latest.japa || 0) + " Japa · " + (latest.meditation || 0) + " min meditation" : "Your first practice will appear here after you begin."}</p>
        <div className="buttons">
          <button onClick={() => window.dispatchEvent(new CustomEvent("dharmapulse:open-tab", { detail: "Japa" }))}>📿 {telugu ? "జపం ప్రారంభించండి" : "Start Japa"}</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("dharmapulse:open-tab", { detail: "Meditate" }))}>🧘 {telugu ? "ధ్యానం" : "Meditate"}</button>
        </div>
      </div>
      {stats.streak > 0 && <p className="note" style={{ marginTop: 16 }}>🌱 {telugu ? String(stats.streak) + " రోజుల నిరంతర సాధన." : String(stats.streak) + " day practice streak. Keep it gentle and consistent."}</p>}
    </section>
  );
}
