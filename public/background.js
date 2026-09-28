const DEFAULT={enabled:true,hour:7,minute:0};
async function get(){return {...DEFAULT,...await chrome.storage.local.get(DEFAULT)}}
async function scheduleNext(){const s=await get();await chrome.alarms.clear("dharmapulse-daily");if(!s.enabled)return;const now=new Date();let next=new Date(now);next.setHours(s.hour,s.minute,0,0);if(next<=now)next.setDate(next.getDate()+1);await chrome.alarms.create("dharmapulse-daily",{when:next.getTime()})}
chrome.runtime.onInstalled.addListener(async()=>{await chrome.storage.local.set(DEFAULT);await scheduleNext()});
chrome.runtime.onStartup.addListener(scheduleNext);
chrome.alarms.onAlarm.addListener(async alarm=>{if(alarm.name!=="dharmapulse-daily")return;const s=await get();if(!s.enabled)return;await chrome.notifications.create("dharmapulse-"+Date.now(),{type:"basic",iconUrl:"icon.svg",title:"DharmaPulse",message:"A moment of Dharma, every day. Open your daily blessing."});await scheduleNext()});
chrome.runtime.onMessage.addListener((msg)=>{if(msg?.type==="schedule")scheduleNext()});
chrome.storage.onChanged.addListener((changes,area)=>{if(area==="local"&&(changes.enabled||changes.hour||changes.minute))scheduleNext()});