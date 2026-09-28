import Link from "next/link";
import { notFound } from "next/navigation";

const pages = {
  "kanaka-durga": ["Kanaka Durga","కనక దుర్గ","Kanaka Durga — Daily Devotion, Mantra & Reflection","Explore Kanaka Durga devotional reflections, a traditional mantra, and simple daily practice with DharmaPulse.","Om Aim Hreem Kleem Chamundaye Vichche","courage, protection and compassion"],
  "venkateswara": ["Venkateswara","వేంకటేశ్వర","Venkateswara — Daily Devotion, Mantra & Reflection","Explore Venkateswara devotional reflections, mantra practice and simple daily routines with DharmaPulse.","Om Namo Venkatesaya","patience, faith and steady devotion"],
  "shiva": ["Shiva","శివుడు","Shiva — Daily Devotion, Mantra & Reflection","Explore Shiva devotional reflections, mantra practice and a simple daily meditation with DharmaPulse.","Om Namah Shivaya","stillness, transformation and inner clarity"],
  "hanuman": ["Hanuman","హనుమంతుడు","Hanuman — Daily Devotion, Mantra & Reflection","Explore Hanuman devotional reflections, mantra practice and simple daily devotion with DharmaPulse.","Om Hanumate Namah","strength, humility and devoted service"],
  "ganesha": ["Ganesha","గణేశుడు","Ganesha — Daily Devotion, Mantra & Reflection","Explore Ganesha devotional reflections, mantra practice and simple daily routines with DharmaPulse.","Om Gam Ganapataye Namaha","new beginnings and thoughtful action"],
  "lakshmi": ["Lakshmi","లక్ష్మీ దేవి","Lakshmi — Daily Devotion, Mantra & Reflection","Explore Lakshmi devotional reflections, mantra practice and gratitude-focused daily practice with DharmaPulse.","Om Shreem Mahalakshmyai Namah","gratitude, generosity and responsible abundance"]
] as const;

export function generateStaticParams(){ return Object.keys(pages).map(slug=>({slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const p=pages[slug as keyof typeof pages]; if(!p) return {};
 return {title:p[2],description:p[3],alternates:{canonical:`/learn/${slug}`},openGraph:{title:p[2],description:p[3],type:"article"}};
}

export default async function LearnPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const p=pages[slug as keyof typeof pages]; if(!p) notFound();
 const [deity,telugu,title,description,mantra,theme]=p;
 const jsonLd={"@context":"https://schema.org","@type":"Article",headline:title,description,about:deity,inLanguage:["en","te"]};
 return <main style={{maxWidth:860,margin:"0 auto",padding:"48px 20px",lineHeight:1.7}}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
  <nav><Link href="/">← Open DharmaPulse</Link></nav>
  <p style={{opacity:.7,marginTop:28}}>DharmaPulse devotional guide</p>
  <h1>{deity} <span style={{fontWeight:400}}>({telugu})</span></h1>
  <p style={{fontSize:19}}>{description}</p>
  <h2>Mantra</h2><p><strong>{mantra}</strong></p>
  <p>For devotional practice; pronunciation and observance can vary by tradition. Follow guidance from your family, temple or teacher where applicable.</p>
  <h2>Daily reflection</h2><p>Bring {theme} into one small, constructive action today. DharmaPulse gives you a fresh daily reflection, question and devotional moment.</p>
  <h2>Simple practice</h2><p>Take three slow breaths, offer a short prayer or mantra, and choose one good action to carry into the day.</p>
  <h2>Explore DharmaPulse</h2><p>Use the daily experience for reflections, Panchang, festivals, Japa, meditation, favorites and offline access.</p>
  <Link href="/" style={{fontWeight:700}}>Open today’s DharmaPulse →</Link>
 </main>;
}