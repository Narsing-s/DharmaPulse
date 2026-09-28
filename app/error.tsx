"use client";

export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main><section className="info center"><div className="orb">ॐ</div><h2>Something interrupted DharmaPulse</h2><p>Your local data is kept in this browser. Try the page again.</p><button className="japa" onClick={()=>reset()}>Try again</button><button onClick={()=>location.reload()}>Reload page</button></section></main>}
