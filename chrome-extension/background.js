const CONTENT_URL="https://raw.githubusercontent.com/Narsing-s/DharmaPulse/main/public/content.json";
const APP_URL="https://narsing-s.github.io/DharmaPulse/";
const fallback={messages:[{en:"Begin today with gratitude, clarity, and one good action.",te:"కృతజ్ఞత, స్పష్టత, ఒక మంచి కార్యంతో ఈ రోజును ప్రారంభించండి."}],mantras:[{en:"Om Namah Shivaya",te:"ఓం నమః శివాయ"}]};

function dayIndex(){const d=new Date(),s=new Date(d.getFullYear(),0,1);return Math.floor((d-s)/86400000)}
async function getContent(){try{const r=await fetch(CONTENT_URL,{cache:"no-store"});if(!r.ok)throw 0;return await r.json()}catch{return fallback}}
async function getDaily(){const c=await getContent(),i=dayIndex(),ms=Array.isArray(c.messages)?c.messages:fallback.messages,js=Array.isArray(c.mantras)?c.mantras:fallback.mantras;return{message:ms[i%ms.length],mantra:js[i%js.length]}}
async function notify(){const s=await chrome.storage.local.get({remindersEnabled:true,language:"en"});if(!s.remindersEnabled)return;const d=await getDaily(),te=s.language==="te";const message=te?(d.message?.te||d.message?.en):(d.message?.en||d.message?.te);const mantra=te?(d.mantra?.te||d.mantra?.en):(d.mantra?.en||d.mantra?.te);await chrome.notifications.create("dharmapulse-daily",{type:"basic",iconUrl:chrome.runtime.getURL("icons/icon128.svg"),title:"DharmaPulse",message:message||"Begin your day with Dharma.",contextMessage:mantra||"A moment of Dharma, every day."})}
function schedule(){chrome.alarms.create("dharmapulse-daily",{periodInMinutes:1440})}
chrome.runtime.onInstalled.addListener(async()=>{await chrome.storage.local.set({remindersEnabled:true,reminderHour:7,language:"en"});schedule()});
chrome.runtime.onStartup.addListener(schedule);
chrome.alarms.onAlarm.addListener(a=>{if(a.name==="dharmapulse-daily")notify()});
chrome.notifications.onClicked.addListener(async()=>{const tabs=await chrome.tabs.query({url:APP_URL+"*"});if(tabs[0]?.id)await chrome.tabs.update(tabs[0].id,{active:true});else await chrome.tabs.create({url:APP_URL})});
chrome.runtime.onMessage.addListener((m,_s,send)=>{if(m?.type==="openApp"){chrome.tabs.create({url:APP_URL});send({ok:true});return}if(m?.type==="testNotification"){notify().then(()=>send({ok:true})).catch(()=>send({ok:false}));return true}if(m?.type==="setReminder"){chrome.storage.local.set({remindersEnabled:!!m.enabled,reminderHour:Number(m.hour)||7}).then(()=>send({ok:true}));return true}if(m?.type==="setLanguage"){chrome.storage.local.set({language:m.language==="te"?"te":"en"}).then(()=>send({ok:true}));return true}});
