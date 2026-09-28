const FALLBACK={messages:[["Kanaka Durga","May courage, clarity and compassion guide your day."],["Venkateswara","Walk with patience today; what is meant for you will arrive in its time."],["Shiva","Let go of what you cannot control and give your attention to what you can improve."],["Hanuman","Strength grows when it is joined with humility and service."],["Lakshmi","Create abundance through gratitude, honest work and generosity."],["Saraswati","Learn one useful thing today and share it with someone."],["Ganesha","Begin with a clear intention; small steady steps remove many obstacles."],["Krishna","Do your duty with care, without letting the result steal your peace."],["Rama","Choose truth even when the easy path is tempting."],["Shani","Discipline turns difficult seasons into lasting strength."]],mantras:["Om Dum Durgayai Namaha","Om Namo Venkatesaya","Om Namah Shivaya","Om Hanumate Namah","Om Shreem Mahalakshmyai Namah","Om Aim Saraswatyai Namah","Om Gam Ganapataye Namah","Om Namo Bhagavate Vasudevaya","Shri Ram Jai Ram Jai Jai Ram","Om Sham Shanicharaya Namah"]};
const DEITIES={"Kanaka Durga":"Durga","Venkateswara":"Venkateswara","Shiva":"Shiva","Hanuman":"Hanuman","Lakshmi":"Lakshmi","Saraswati":"Saraswati","Ganesha":"Ganesha","Krishna":"Krishna","Rama":"Rama","Shani":"Shani"};
const $=id=>document.getElementById(id);
const dayIndex=()=>{const d=new Date(),s=new Date(d.getFullYear(),0,0);return Math.floor((d-s)/86400000)-1};
const pick=(list,seed)=>list[Math.abs(seed)%list.length];
let data=null,selected=null,nonce=0;
async function loadData(){try{const r=await fetch(chrome.runtime.getURL("content.json"));if(r.ok)data=await r.json()}catch{}}
async function imageFor(name,seed){
  try{
    const url="https://commons.wikimedia.org/w/api.php?"+new URLSearchParams({action:"query",generator:"search",gsrsearch:name+" Hindu deity",gsrnamespace:"6",gsrlimit:"20",prop:"imageinfo",iiprop:"url",iiurlwidth:"500",format:"json",origin:"*"});
    const r=await fetch(url);if(!r.ok)throw Error("image");
    const pages=Object.values((await r.json())?.query?.pages||{});
    const imgs=pages.map(p=>p.imageinfo?.[0]).filter(Boolean).map(i=>i.thumburl||i.url).filter(u=>u&&/\.(jpe?g|png|webp)$/i.test(u));
    if(!imgs.length)throw Error("no image");
    return imgs[Math.abs(seed)%imgs.length];
  }catch{return "icons/icon-128.png"}
}
function normalizedMessages(source){
  const list=Array.isArray(source.messages)?source.messages.map(x=>Array.isArray(x)?x:[x?.name,x?.en||x?.message]).filter(x=>x?.[0]&&x?.[1]):[];
  return list.length?list:FALLBACK.messages;
}
function normalizedMantras(source){
  const list=Array.isArray(source.mantras)?source.mantras.map(x=>typeof x==="string"?x:x?.en||x?.text).filter(Boolean):[];
  return list.length?list:FALLBACK.mantras;
}
async function render(){
  const idx=dayIndex()+nonce*37,source=data||FALLBACK;
  const messages=normalizedMessages(source),mantras=normalizedMantras(source);
  selected=pick(messages,idx);
  const deity=selected[0],mantra=pick(mantras,idx+11);
  $("date").textContent=new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"});
  $("deity").textContent=deity;$("message").textContent="“"+selected[1]+"”";$("mantra").textContent=mantra;
  let wisdom="Take one quiet moment today for gratitude, reflection and service.";
  if(Array.isArray(source.wisdom)&&source.wisdom.length){const w=pick(source.wisdom,idx+23);wisdom=typeof w==="string"?w:w?.en||w?.text||wisdom}
  $("wisdom").textContent=wisdom;$("category").textContent=nonce?"Fresh for this request":"Daily Dharma";
  $("deityImage").src=await imageFor(DEITIES[deity]||deity,idx+Date.now());
  const saved=await chrome.storage.local.get({favorite:""});$("save").textContent=saved.favorite===deity?"♥ Saved":"♡ Save";
}
$("refresh").onclick=()=>{nonce++;render()};
$("save").onclick=async()=>{if(!selected)return;await chrome.storage.local.set({favorite:selected[0]});$("save").textContent="♥ Saved";$("status").textContent="Saved locally."};
$("open").onclick=()=>chrome.tabs.create({url:"https://narsing-s.github.io/DharmaPulse/"});
$("reminder").onclick=async()=>{const s=await chrome.storage.local.get({enabled:false,hour:7,minute:0});await chrome.storage.local.set({enabled:true,hour:s.hour,minute:s.minute});chrome.runtime.sendMessage({type:"schedule"});$("status").textContent="Daily reminder enabled.";updateReminder()};
async function updateReminder(){const s=await chrome.storage.local.get({enabled:false,hour:7,minute:0});$("reminderStatus").textContent=s.enabled?"Enabled at "+String(s.hour).padStart(2,"0")+":"+String(s.minute).padStart(2,"0"):"Not enabled";$("reminder").textContent=s.enabled?"Update reminder":"Enable 7:00 AM"}
loadData().finally(()=>{updateReminder();render()});
