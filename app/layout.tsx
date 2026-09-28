import "./globals.css";
import type { ReactNode } from "react";
export const metadata={title:"DharmaPulse — A moment of Dharma, every day.",description:"A simple devotional companion with daily wisdom, blessings, mantras, japa, festivals and puja guidance.",manifest:"/app.webmanifest",themeColor:"#6f4322"};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}