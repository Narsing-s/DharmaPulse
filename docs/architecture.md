# DharmaPulse architecture

```
Next.js Web/PWA
   ├── Today / Deities / Mantras / Wisdom / Puja
   ├── Panchang engine (panchang-ts)
   ├── Japa / Meditation / History
   ├── Local backup + restore
   └── Share-card generator

Chrome Extension
   ├── Popup
   ├── Options
   └── DST-safe notification scheduler

Shared content
   └── public/content.json
```

The application is local-first. User preferences, favorites and practice history remain in browser storage. Panchang calculations run locally using `panchang-ts`, which documents daily Tithi/Nakshatra/Yoga/Karana, solar/lunar times, Muhurtas, inauspicious periods and Choghadiya/Hora systems. 

Regional festival observance is intentionally separated from generic devotional content because dates and conventions can vary by region and tradition.