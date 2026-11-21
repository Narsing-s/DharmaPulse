"use client";

import { useEffect, useMemo, useState } from "react";

type Goal = { id: string; title: string; done: boolean; createdAt: string };
type GuideItem = { keywords: string[]; en: string; te: string; source: string };
const STORAGE = "dharmapulse:companion:v1";
const verses = [
  { chapter: 2, verse: 47, title: "Focus on your actions", en: "You have a right to action, but should not make the result your sole reason for acting. Do not become attached to inaction.", te: "నీ కర్తవ్యాన్ని శ్రద్ధగా చేయి. ఫలితంపై మాత్రమే ఆధారపడకుండా, నిష్క్రియతకు లోనుకాకుండా ఉండు.", lesson: "Choose one useful action today and give it your full attention." },
  { chapter: 2, verse: 48, title: "Practice equanimity", en: "Act with steadiness, letting success and failure meet you with balance. Such balance is described as yoga.", te: "విజయం, అపజయం రెండింటిలోనూ సమతుల్యంగా ఉండి నీ కర్తవ్యాన్ని నిర్వహించు.", lesson: "Before reacting to a result, pause and take three calm breaths." },
  { chapter: 6, verse: 5, title: "Lift yourself through practice", en: "A person can uplift oneself through one's own mind; the mind can be a friend or an obstacle.", te: "మనస్సు మనకు మిత్రుడిగానూ, అడ్డంకిగానూ మారవచ్చు. సాధనతో మనల్ని మనం ఉన్నత స్థితికి తీసుకెళ్లాలి.", lesson: "Build one small habit that supports the person you want to become." },
  { chapter: 12, verse: 13, title: "Cultivate compassion", en: "The teaching praises one who is compassionate, free from ill-will, and considerate toward all beings.", te: "సర్వజీవుల పట్ల ద్వేషం లేకుండా, కరుణతో మరియు స్నేహభావంతో ఉండే గుణాన్ని ఈ శ్లోకం ప్రశంసిస్తుంది.", lesson: "Offer one sincere, kind word to someone today." },
  { chapter: 16, verse: 2, title: "Choose gentle conduct", en: "The qualities described include non-violence, truthfulness, freedom from anger, and compassion.", te: "అహింస, సత్యం, కోప నియంత్రణ, కరుణ వంటి సద్గుణాలను ఈ బోధన ప్రస్తావిస్తుంది.", lesson: "Let truth and kindness guide one difficult conversation." }
];
const pujaSteps = [
  { en: "Prepare a clean, stable prayer space.", te: "శుభ్రమైన, స్థిరమైన ప్రార్థనా స్థలాన్ని సిద్ధం చేయండి." },
  { en: "Keep only the items needed for your tradition.", te: "మీ సంప్రదాయానికి అవసరమైన పూజా సామగ్రిని సిద్ధం చేయండి." },
  { en: "Light a lamp safely, away from curtains and children.", te: "పిల్లలు, తెరలకు దూరంగా దీపాన్ని సురక్షితంగా వెలిగించండి." },
  { en: "Take a few calm breaths and remember your intention.", te: "కొన్ని నెమ్మదైన శ్వాసలు తీసుకుని మీ సంకల్పాన్ని గుర్తు చేసుకోండి." },
  { en: "Offer prayer, mantra, or a moment of gratitude.", te: "ప్రార్థన, మంత్రం లేదా కృతజ్ఞతను సమర్పించండి." },
  { en: "Close by choosing one good action for the day.", te: "రోజంతా పాటించేందుకు ఒక మంచి కార్యాన్ని ఎంచుకోండి." }
];
const temples = [
  { name: "Kanaka Durga Temple", place: "Vijayawada, Andhra Pradesh", note: "Hilltop temple dedicated to Goddess Kanaka Durga." },
  { name: "Sri Venkateswara Temple", place: "Tirumala, Tirupati, Andhra Pradesh", note: "Major pilgrimage shrine dedicated to Lord Venkateswara." },
  { name: "Srisailam Mallikarjuna Temple", place: "Srisailam, Andhra Pradesh", note: "Jyotirlinga and Shakti Peetha pilgrimage centre." },
  { name: "Simhachalam Varaha Lakshmi Narasimha Temple", place: "Visakhapatnam, Andhra Pradesh", note: "Historic hill temple dedicated to Lord Narasimha." },
  { name: "Sri Kalahasteeswara Temple", place: "Srikalahasti, Andhra Pradesh", note: "Known for its association with the Vayu element." },
  { name: "Bhadrachalam Sri Sita Ramachandra Swamy Temple", place: "Bhadrachalam, Telangana", note: "Important temple associated with Lord Rama." }
];
const guide: GuideItem[] = [
  { keywords: ["anger", "కోపం"], en: "Pause before responding. The Gita's emphasis on self-discipline can be used as a reflection prompt: notice the emotion, breathe, and choose a response that avoids harm. This is a practical reflection, not a quotation.", te: "స్పందించే ముందు ఆగండి. భావాన్ని గమనించి, నెమ్మదిగా శ్వాస తీసుకుని హాని చేయని సమాధానాన్ని ఎంచుకోండి. ఇది ఆచరణాత్మక ఆలోచన మాత్రమే; శ్లోకానికి యథాతథ అనువాదం కాదు.", source: "Bhagavad Gita 2.62–2.63 (reflection)" },
  { keywords: ["duty", "work", "ఫలితం", "కర్తవ్యం"], en: "Focus on sincere effort and ethical action rather than trying to control every outcome. Review Bhagavad Gita 2.47–2.48 for a traditional starting point.", te: "ప్రతి ఫలితాన్ని నియంత్రించాలనే ఆందోళనకు బదులుగా నిజాయితీతో కూడిన కర్తవ్యంపై దృష్టి పెట్టండి. భగవద్గీత 2.47–2.48ను పరిశీలించండి.", source: "Bhagavad Gita 2.47–2.48 (reference)" },
  { keywords: ["fear", "worry", "anxiety", "భయం", "ఆందోళన"], en: "Name what is within your control, take one manageable step, and seek support from someone you trust when needed. Spiritual reflection can complement—not replace—professional support.", te: "మీ నియంత్రణలో ఉన్న విషయాన్ని గుర్తించి, చేయగల చిన్న అడుగు వేయండి. అవసరమైతే నమ్మకమైన వ్యక్తి సహాయం పొందండి. ఆధ్యాత్మిక ఆలోచన నిపుణుల సహాయానికి ప్రత్యామ్నాయం కాదు.", source: "DharmaPulse practical reflection" },
  { keywords: ["kindness", "compassion", "దయ", "కరుణ"], en: "Practice compassion through a concrete action: listen without interrupting, help without expecting praise, or speak gently. See Bhagavad Gita 12.13–12.14 for related qualities.", te: "వినకుండా మధ్యలో మాట్లాడకపోవడం, ప్రతిఫలం ఆశించకుండా సహాయం చేయడం, మృదువుగా మాట్లాడడం ద్వారా కరుణను ఆచరించండి. సంబంధిత గుణాల కోసం భగవద్గీత 12.13–12.14 చూడండి.", source: "Bhagavad Gita 12.13–12.14 (reference)" },
  { keywords: ["peace", "శాంతి"], en: "Create a small pause: put the phone aside, breathe slowly, and choose one priority. Peace is a practice built through repeated choices.", te: "చిన్న విరామం తీసుకోండి: ఫోన్ పక్కన పెట్టి, నెమ్మదిగా శ్వాస తీసుకుని, ఒక ముఖ్యమైన పనిని ఎంచుకోండి. శాంతి అనేది నిరంతర సాధన.", source: "DharmaPulse practical reflection" }
];
function readSaved() {
  if (typeof window === "undefined") return { goals: [] as Goal[], checklist: [] as boolean[] };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE) || "{}");
    return { goals: Array.isArray(parsed.goals) ? parsed.goals : [], checklist: Array.isArray(parsed.checklist) ? parsed.checklist : [] };
  } catch { return { goals: [], checklist: [] as boolean[] }; }
}
export default function DharmaCompanion({ telugu }: { telugu: boolean }) {
  const [section, setSection] = useState("study");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [checklist, setChecklist] = useState<boolean[]>([]);
  const [goalText, setGoalText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<GuideItem | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { const saved = readSaved(); setGoals(saved.goals); setChecklist(saved.checklist); setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(STORAGE, JSON.stringify({ goals, checklist })); }, [goals, checklist, ready]);
  const today = new Date().toLocaleDateString(telugu ? "te-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long" });
  const completed = useMemo(() => goals.filter(g => g.done).length, [goals]);
  const ask = () => {
    const q = question.trim().toLocaleLowerCase();
    if (!q) return;
    const found = guide.find(item => item.keywords.some(word => q.includes(word)));
    setAnswer(found || { keywords: [], en: "I can offer a reflection prompt, not a definitive religious ruling: identify the situation, consider who may be affected, choose the most truthful and compassionate action, and consult a trusted teacher for tradition-specific guidance.", te: "ఇది తుది మతపరమైన తీర్పు కాదు; ఆలోచనకు ఒక సూచన మాత్రమే: పరిస్థితిని గుర్తించండి, ప్రభావితమయ్యే వారిని పరిగణించండి, నిజాయితీ మరియు కరుణతో కూడిన చర్యను ఎంచుకోండి. సంప్రదాయానికి సంబంధించిన మార్గదర్శకత్వం కోసం విశ్వసనీయ గురువును సంప్రదించండి.", source: "DharmaPulse reflection guide" });
  };
  const speak = (text: string) => { if (typeof window !== "undefined" && "speechSynthesis" in window) { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = telugu ? "te-IN" : "en-IN"; window.speechSynthesis.speak(utterance); } };
  const addGoal = () => { const title = goalText.trim(); if (!title) return; setGoals(current => [{ id: Date.now().toString(), title, done: false, createdAt: new Date().toISOString() }, ...current]); setGoalText(""); };
  const toggleGoal = (id: string) => setGoals(current => current.map(goal => goal.id === id ? { ...goal, done: !goal.done } : goal));
  const labels = telugu ? [{ id: "study", label: "గీతా అధ్యయనం" }, { id: "puja", label: "పూజా సహాయకుడు" }, { id: "goals", label: "సంకల్పాలు" }, { id: "guide", label: "ధర్మ మార్గదర్శి" }, { id: "temples", label: "దేవాలయ యాత్ర" }] : [{ id: "study", label: "Gita Study" }, { id: "puja", label: "Puja Assistant" }, { id: "goals", label: "Sankalpa Goals" }, { id: "guide", label: "Dharma Guide" }, { id: "temples", label: "Temple Yatra" }];
  return <section className="companion">
    <div className="companionHero"><div className="eyebrow">DHARMAPULSE • YOUR DAILY PRACTICE</div><h2>{telugu ? "మీ ఆధ్యాత్మిక ప్రయాణం" : "Your spiritual journey"}</h2><p>{telugu ? "చదవండి • ఆచరించండి • ఆలోచించండి" : "Learn with care. Practice with intention. Reflect with kindness."}</p><small>{today}</small></div>
    <div className="companionTabs" role="tablist" aria-label="Dharma companion sections">{labels.map(item => <button key={item.id} role="tab" aria-selected={section === item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>{item.label}</button>)}</div>
    {section === "study" && <div className="companionGrid">{verses.map(v => <article className="companionCard" key={v.chapter + ":" + v.verse}><div className="eyebrow">{telugu ? "భగవద్గీత సూచన" : "BHAGAVAD GITA READING"}</div><h3>{telugu ? v.title : v.title}</h3><small>{telugu ? "అధ్యాయం" : "Chapter"} {v.chapter} • {telugu ? "శ్లోకం" : "Verse"} {v.verse}</small><p>{telugu ? v.te : v.en}</p><div className="companionLesson"><b>{telugu ? "ఈ రోజు ఆచరణ" : "Practice today"}</b><p>{telugu ? v.lesson : v.lesson}</p></div><button onClick={() => speak((telugu ? v.te : v.en) + " " + v.lesson)}>🔊 {telugu ? "వినండి" : "Listen"}</button></article>)}</div>}
    {section === "puja" && <article className="companionCard"><div className="sectionHead"><div><h3>{telugu ? "సరళమైన పూజా క్రమం" : "A simple puja checklist"}</h3><p>{telugu ? "మీ కుటుంబ సంప్రదాయం ప్రకారం మార్చుకోండి." : "Adapt this general checklist to your family tradition."}</p></div><b>{checklist.filter(Boolean).length}/{pujaSteps.length}</b></div><div className="companionProgress"><span style={{ width: (checklist.filter(Boolean).length / pujaSteps.length * 100) + "%" }} /></div>{pujaSteps.map((step, index) => <label className="companionCheck" key={index}><input type="checkbox" checked={!!checklist[index]} onChange={e => setChecklist(current => { const next = [...current]; next[index] = e.target.checked; return next; })} /><span>{telugu ? step.te : step.en}</span></label>)}<button onClick={() => setChecklist([])}>{telugu ? "మళ్లీ ప్రారంభించండి" : "Reset checklist"}</button><p className="companionNote">{telugu ? "దీపం వెలిగించేటప్పుడు ఎల్లప్పుడూ భద్రత పాటించండి." : "Never leave a lit lamp unattended. Keep flames away from children, pets and flammable materials."}</p></article>}
    {section === "goals" && <article className="companionCard"><div className="sectionHead"><div><h3>{telugu ? "మీ రోజువారీ సంకల్పాలు" : "Your personal sankalpa"}</h3><p>{telugu ? "చిన్న, అర్థవంతమైన ఆధ్యాత్మిక అలవాట్లను నమోదు చేయండి." : "Track small, meaningful intentions. Your list stays on this device."}</p></div><b>{completed}/{goals.length}</b></div><div className="companionForm"><input value={goalText} onChange={e => setGoalText(e.target.value)} onKeyDown={e => e.key === "Enter" && addGoal()} placeholder={telugu ? "ఉదా: రోజూ 5 నిమిషాలు ధ్యానం" : "e.g. Meditate for five minutes"} maxLength={120} /><button onClick={addGoal}>{telugu ? "జోడించు" : "Add intention"}</button></div>{goals.length ? <div className="companionGoals">{goals.map(goal => <label key={goal.id} className={goal.done ? "companionCheck isDone" : "companionCheck"}><input type="checkbox" checked={goal.done} onChange={() => toggleGoal(goal.id)} /><span>{goal.title}</span><button type="button" aria-label="Delete intention" onClick={() => setGoals(current => current.filter(g => g.id !== goal.id))}>×</button></label>)}</div> : <p className="companionNote">{telugu ? "మీ మొదటి సంకల్పాన్ని జోడించండి." : "Add your first intention to begin."}</p>}</article>}
    {section === "guide" && <article className="companionCard"><div className="eyebrow">OFFLINE REFLECTION • NO ACCOUNT • NO API</div><h3>{telugu ? "ధర్మంపై మీ ప్రశ్న" : "Ask a Dharma question"}</h3><p>{telugu ? "సాధారణ జీవన ప్రశ్నకు ఆలోచనాత్మక సూచన పొందండి." : "Get a locally available reflection prompt inspired by selected Gita references."}</p><textarea value={question} onChange={e => setQuestion(e.target.value)} rows={3} maxLength={500} placeholder={telugu ? "ఉదా: కోపాన్ని ఎలా నియంత్రించాలి?" : "e.g. How can I respond to anger?"} /><button onClick={ask}>{telugu ? "ఆలోచన పొందండి" : "Get reflection"}</button>{answer && <div className="companionAnswer"><b>{telugu ? "ఆలోచన" : "Reflection"}</b><p>{telugu ? answer.te : answer.en}</p><small>{telugu ? "సూచన: " : "Reference: "}{answer.source}</small></div>}<p className="companionNote">{telugu ? "ఇది AI సేవ కాదు; ముందుగా సిద్ధం చేసిన స్థానిక మార్గదర్శకం. శాస్త్రోక్త నిర్ణయాల కోసం ప్రామాణిక గ్రంథాలు మరియు విశ్వసనీయ పండితులను సంప్రదించండి." : "This is an offline, curated guide—not a live AI service or religious authority. Wording is a paraphrase, not a scripture quotation. Verify interpretations with trusted translations and teachers."}</p></article>}
    {section === "temples" && <div className="companionGrid">{temples.map(temple => <article className="companionCard" key={temple.name}><div className="eyebrow">PILGRIMAGE DIRECTORY</div><h3>🛕 {temple.name}</h3><b>{temple.place}</b><p>{temple.note}</p><a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(temple.name + " " + temple.place)} target="_blank" rel="noreferrer">📍 {telugu ? "మ్యాప్‌లో చూడండి" : "Open directions"}</a></article>)}</div>}
    <p className="companionFooter">{telugu ? "మీ అభిరుచులు మరియు సంకల్పాలు ఈ పరికరంలోనే నిల్వ ఉంటాయి." : "Your practice checklist and intentions are stored locally in this browser. No account is required."}</p>
  </section>;
}
