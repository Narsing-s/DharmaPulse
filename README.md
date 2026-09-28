# DharmaPulse

**A moment of Dharma, every day.**

DharmaPulse is an original, account-free devotional companion for web, PWA and Chrome. It is designed to provide a calm daily devotional moment without requiring an account or paid API.

## Included

- 🏠 Daily devotion, blessing and wisdom
- 🛕 Deity explorer with search
- 📅 Festival calendar
- 🪔 Step-by-step simple puja guide
- 📿 Mantra and Japa counter: 11 / 21 / 54 / 108
- 🔊 Browser text-to-speech in English/Telugu
- 🌐 Telugu / English preference persistence
- ❤️ Local favorites
- 🖼️ Native share with clipboard fallback
- 🌙 Dark mode
- 📲 Installable PWA
- 📴 Offline cache through a service worker
- 🔔 Chrome daily reminder with configurable time
- ⚙️ Chrome extension settings
- 📦 Shared JSON content library for web/extension alignment
- 🔐 No login and no paid API dependency

## Web app

```bash
npm install
npm run dev
```

Open the local app and use **Settings → Install DharmaPulse** when the browser offers PWA installation.

## Chrome extension

1. Open Chrome → Extensions → Manage Extensions.
2. Enable Developer mode.
3. Choose **Load unpacked**.
4. Select this repository's `public` folder.
5. Open the extension's **Details → Extension options** to choose the daily reminder time.

## Architecture

```
content.json
   ├── Web app
   └── Chrome extension content
          ↓
Daily selection → Wisdom → Mantra → Blessing → Optional reminder
```

The product intentionally uses static local content first so it remains cheap, privacy-friendly and reliable.

## Important

Festival dates can vary by region and panchang. DharmaPulse content is informational and should not replace your family's or tradition's specific calendar/practice.
