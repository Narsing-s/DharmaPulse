"use client";

import { useEffect, useMemo, useState } from "react";

type FeedbackType = "General" | "Bug" | "Feature request" | "Content correction" | "UI/UX" | "Panchang";

const STORAGE_KEY = "dharmapulse:feedback-draft";

export default function Feedback({ telugu }: { telugu: boolean }) {
  const [type, setType] = useState<FeedbackType>("General");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved) {
        setType(saved.type || "General");
        setRating(Number(saved.rating || 0));
        setMessage(saved.message || "");
        setContact(saved.contact || "");
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ type, rating, message, contact }));
    } catch {}
  }, [type, rating, message, contact]);

  const environment = useMemo(() => {
    if (typeof window === "undefined") return "Web";
    return `${window.matchMedia("(display-mode: standalone)").matches ? "PWA" : "Web"} • ${navigator.language} • ${window.innerWidth < 768 ? "Mobile" : "Desktop"}`;
  }, []);

  const feedbackText = useMemo(() => {
    const lines = [
      "## DharmaPulse Feedback",
      "",
      `**Type:** ${type}`,
      `**Rating:** ${rating ? `${rating}/5` : "Not provided"}`,
      `**Environment:** ${environment}`,
      "",
      "### Feedback",
      message.trim() || "_No details provided._",
    ];
    if (contact.trim()) lines.push("", "### Contact (optional)", contact.trim());
    lines.push("", "---", "Submitted through the DharmaPulse feedback form.");
    return lines.join("\n");
  }, [type, rating, message, contact, environment]);

  const submitToGitHub = () => {
    if (!message.trim()) return;
    const title = `Feedback: ${type}${rating ? ` — ${rating}/5` : ""}`;
    const url = `https://github.com/Narsing-s/DharmaPulse/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(feedbackText)}&labels=feedback`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyFeedback = async () => {
    if (!message.trim()) return;
    try {
      await navigator.clipboard.writeText(feedbackText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const clearDraft = () => {
    setType("General");
    setRating(0);
    setMessage("");
    setContact("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <section className="info" aria-labelledby="feedback-title">
      <div className="sectionHead">
        <div>
          <div className="eyebrow">FEEDBACK</div>
          <h2 id="feedback-title">{telugu ? "మీ అభిప్రాయం" : "Share your feedback"}</h2>
          <p className="note">
            {telugu
              ? "DharmaPulse ను మరింత ఉపయోగకరంగా చేయడానికి మీ సూచనలు మాకు సహాయపడతాయి."
              : "Tell us what works, what needs improvement, or what you would like to see next."}
          </p>
        </div>
      </div>

      <div className="formGrid">
        <label>
          {telugu ? "అభిప్రాయం రకం" : "Feedback type"}
          <select value={type} onChange={e => setType(e.target.value as FeedbackType)}>
            <option>General</option>
            <option>Bug</option>
            <option>Feature request</option>
            <option>Content correction</option>
            <option>UI/UX</option>
            <option>Panchang</option>
          </select>
        </label>

        <div>
          <span className="note">{telugu ? "అనుభవ రేటింగ్" : "Experience rating"}</span>
          <div className="targets" role="radiogroup" aria-label="Experience rating">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                type="button"
                key={n}
                className={rating === n ? "active" : ""}
                aria-label={`${n} out of 5`}
                aria-pressed={rating === n}
                onClick={() => setRating(n)}
              >
                {n} ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <label style={{ display: "block", marginTop: 16 }}>
        {telugu ? "మీ అభిప్రాయం" : "Your feedback"}
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={7}
          maxLength={3000}
          required
          placeholder={telugu ? "ఏది బాగా నచ్చింది? ఏమి మెరుగుపరచాలి?" : "What did you like? What should we improve? What should we build next?"}
          aria-describedby="feedback-count"
        />
      </label>
      <p id="feedback-count" className="note">{message.length}/3000</p>

      <label style={{ display: "block" }}>
        {telugu ? "సంప్రదింపు వివరాలు (ఐచ్ఛికం)" : "Contact (optional)"}
        <input
          value={contact}
          onChange={e => setContact(e.target.value)}
          maxLength={160}
          placeholder={telugu ? "మీరు సమాధానం కోరితే మాత్రమే" : "Only if you would like a reply"}
        />
      </label>

      <div className="buttons" style={{ marginTop: 16 }}>
        <button className="japa" type="button" disabled={!message.trim()} onClick={submitToGitHub}>
          {telugu ? "GitHub కు పంపండి" : "Submit via GitHub"} ↗
        </button>
        <button type="button" disabled={!message.trim()} onClick={copyFeedback}>
          {copied ? "✓ Copied" : "Copy feedback"}
        </button>
        <button type="button" onClick={clearDraft}>Clear draft</button>
      </div>

      <p className="note" role="status" aria-live="polite">
        {telugu
          ? "మీ డ్రాఫ్ట్ ఈ పరికరంలో మాత్రమే సేవ్ అవుతుంది. Submit చేసినప్పుడు మాత్రమే GitHub కి పంపబడుతుంది."
          : "Your draft stays in this browser. Nothing is sent until you choose Submit via GitHub."}
      </p>
    </section>
  );
}
