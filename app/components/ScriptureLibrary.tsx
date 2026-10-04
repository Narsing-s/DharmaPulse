"use client";
import {useEffect,useMemo,useState} from "react";

type Verse={id?:number;verseNumber?:number;text?:string;teluguText?:string;meaning?:string;teluguMeaning?:string;transliteration?:string};
type Chapter={chapterNumber:number;name?:string;nameTranslation?:string;nameMeaning?:string;summary?:string;verses:Verse[]};
const chapters=Array.from({length:18},(_,i)=>i+1);
const gitaTeluguPdf=(n:number)=>`https://github.com/bhagavdgita/bhagavdgita.github.io/raw/refs/heads/main/telugu/Chapter%20${n}.pdf`;
const ramayana:Array<[string,string,string]>=[
  ["Bala Kanda","బాలకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/బాలకాండము"],
  ["Ayodhya Kanda","అయోధ్యాకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/అయోధ్యాకాండము"],
  ["Aranya Kanda","అరణ్యకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/అరణ్యకాండము"],
  ["Kishkindha Kanda","కిష్కింధాకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/కిష్కింధకాండము"],
  ["Sundara Kanda","సుందరకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/సుందరకాండము"],
  ["Yuddha Kanda","యుద్ధకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/యుద్ధకాండము"],
  ["Uttara Kanda","ఉత్తరకాండము","https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము/ఉత్తరకాండము"]
];
export default function ScriptureLibrary({telugu,favorites,onFavorite}:{telugu:boolean;favorites:string[];onFavorite:(key:string)=>void}){
 const [book,setBook]=useState<"gita"|"ramayana">("gita"),[chapter,setChapter]=useState(1),[data,setData]=useState<Chapter|null>(null),[verse,setVerse]=useState(0),[q,setQ]=useState(""),[loading,setLoading]=useState(true);
 useEffect(()=>{if(book!=="gita")return;let live=true;setLoading(true);fetch("/api/scriptures/gita/"+chapter).then(r=>r.json()).then(x=>{if(live){setData(x);setVerse(0)}}).catch(()=>{if(live)setData(null)}).finally(()=>live&&setLoading(false));return()=>{live=false}},[book,chapter]);
 const verses=data?.verses??[];
 const current=verses[verse];
 const currentVerseNumber=current?.verseNumber??(verse+1);
 const currentText=current?.text??"";
 const currentTransliteration=current?.transliteration??"";
 const currentMeaning=current?.meaning??"";
 const currentTeluguMeaning=current?.teluguMeaning??"";
 const currentFavoriteKey="gita:"+chapter+":"+currentVerseNumber;
 const currentHasTransliteration=Boolean(currentTransliteration);
 const currentDisplayMeaning=telugu?(currentTeluguMeaning||currentMeaning):currentMeaning;
 const currentShareText=currentDisplayMeaning||currentText;
 const filtered=useMemo(()=>verses.map((v,i)=>({v,i})).filter(({v})=>(String(v.verseNumber??"")+" "+(v.text??"")+" "+(v.teluguText??"")+" "+(v.meaning??"")+" "+(v.teluguMeaning??"")).toLowerCase().includes(q.toLowerCase())),[verses,q]);
 return <section className="info" aria-labelledby="scriptures-title">
  <div className="sectionHead"><div><h2 id="scriptures-title">{telugu?"ధర్మ గ్రంథాలయం":"Scripture Library"}</h2><p className="note">{telugu?"భగవద్గీత మరియు వాల్మీకి రామాయణం కోసం అధ్యయన స్థలం.":"Read, search, bookmark and continue your scripture study."}</p></div></div>
  <div className="buttons"><button className={book==="gita"?"active":""} onClick={()=>setBook("gita")}>📖 {telugu?"భగవద్గీత":"Bhagavad Gita"}</button><button className={book==="ramayana"?"active":""} onClick={()=>setBook("ramayana")}>🏹 {telugu?"రామాయణం":"Ramayanam"}</button></div>
  {book==="gita"&&<><div className="formGrid"><label>{telugu?"అధ్యాయం":"Chapter"}<select value={chapter} onChange={e=>setChapter(Number(e.target.value))}>{chapters.map(n=><option key={n} value={n}>{n}. {telugu?"అధ్యాయం":"Chapter"} {n}</option>)}</select></label><label>{telugu?"వెతకండి":"Search"}<input value={q} onChange={e=>setQ(e.target.value)} placeholder={telugu?"శ్లోకం, అర్థం వెతకండి":"Search verse, meaning…"}/></label></div>
  {loading?<p>Loading scripture…</p>:data&&current?<><div className="tile" style={{marginTop:16}}><small>{data.nameTranslation||data.name}</small><h3>{data.chapterNumber}.{currentVerseNumber}</h3><p style={{whiteSpace:"pre-wrap",fontSize:18,lineHeight:1.8}}>{currentText}</p>{currentHasTransliteration&&<p className="note" style={{whiteSpace:"pre-wrap"}}>{currentTransliteration}</p>}<hr/><p>{currentDisplayMeaning}</p><div className="buttons"><button onClick={()=>{if(verse>0)setVerse(verse-1)}} disabled={verse===0}>← Previous</button><a href={gitaTeluguPdf(chapter)} target="_blank" rel="noreferrer">📜 Telugu chapter ↗</a><button onClick={()=>{if(verse<verses.length-1)setVerse(verse+1)}} disabled={verse===verses.length-1}>Next →</button><button onClick={()=>onFavorite(currentFavoriteKey)}>{favorites.includes(currentFavoriteKey)?"♥ Saved":"♡ Bookmark"}</button><button onClick={()=>{const t=currentShareText;if(navigator.share)navigator.share({title:"DharmaPulse — Bhagavad Gita",text:t});else navigator.clipboard?.writeText(t)}}>↗ Share</button></div></div><details style={{marginTop:16}}><summary>{telugu?"శ్లోకాల జాబితా":"Verse list"} ({filtered.length})</summary><div className="grid">{filtered.map(({v,i})=><button className="tile" key={i} onClick={()=>setVerse(i)} style={{textAlign:"left"}}><b>{(data?.chapterNumber??chapter)}.{v.verseNumber}</b><small>{((telugu?(v.teluguMeaning||v.meaning):v.meaning)||"").slice(0,180)}</small></button>)}</div></details></>:<p>Scripture data could not be loaded.</p>}</>}
  {book==="ramayana"&&<><div className="grid" style={{marginTop:16}}>{ramayana.map(([en,te,url],i)=><article className="tile" key={en}><span style={{fontSize:28}}>🏹</span><b>{telugu?te:en}</b><small>{telugu?"కాండం "+(i+1):"Kanda "+(i+1)}</small><div className="buttons"><a href={url} target="_blank" rel="noreferrer">📜 Telugu full text ↗</a><a href="https://en.wikisource.org/wiki/The_Ramayana" target="_blank" rel="noreferrer">English ↗</a></div></article>)}</div><div className="tile" style={{marginTop:16}}><b>{telugu?"పూర్తి గ్రంథ మూలాలు":"Full scripture sources"}</b><p className="note">{telugu?"వాల్మీకి రామాయణంలోని ఏడు కాండాలు తెలుగు వికీసోర్స్‌లో అందుబాటులో ఉన్నాయి.":"All seven Kandas are exposed from the Telugu Wikisource edition, while the English reader points to the public-domain Griffith translation."}</p><div className="buttons"><a href="https://te.wikisource.org/wiki/వాల్మీకి_రామాయణము" target="_blank" rel="noreferrer">తెలుగు పూర్తి రామాయణం ↗</a><a href="https://en.wikisource.org/wiki/The_Ramayana" target="_blank" rel="noreferrer">English full Ramayana ↗</a></div></div></>}
 </section>
}
