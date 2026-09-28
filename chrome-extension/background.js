const ALARM="dharmapulse-daily";
const DEFAULT={enabled:false,hour:7,minute:0};
async function settings(){return {...DEFAULT,...await chrome.storage.local.get(DEFAULT)}}
async function schedule(){
  const s=await settings();
  await chrome.alarms.clear(ALARM);
  if(!s.enabled)return;
  const now=new Date(), next=new Date(now);
  next.setHours(Number(s.hour),Number(s.minute),0,0);
  if(next<=now)next.setDate(next.getDate()+1);
  await chrome.alarms.create(ALARM,{when:next.getTime()});
}
chrome.runtime.onInstalled.addListener(async()=>{await chrome.storage.local.set(DEFAULT);await schedule()});
chrome.runtime.onStartup.addListener(schedule);
chrome.alarms.onAlarm.addListener(async a=>{
  if(a.name!==ALARM)return;
  const s=await settings();
  if(!s.enabled)return;
  await chrome.notifications.create("dharmapulse-"+Date.now(),{type:"basic",iconUrl:"icons/icon-128.png",title:"DharmaPulse",message:"A moment of Dharma, every day. Open DharmaPulse for today's blessing."});
  await schedule();
});
chrome.runtime.onMessage.addListener(msg=>{if(msg?.type==="schedule")schedule()});
chrome.notifications.onClicked.addListener(()=>chrome.tabs.create({url:"https://narsing-s.github.io/DharmaPulse/"}));
chrome.storage.onChanged.addListener((c,a)=>{if(a==="local"&&(c.enabled||c.hour||c.minute))schedule()});
