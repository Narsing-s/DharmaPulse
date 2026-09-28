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

## v1.2 feature set

- Offline Panchang calculation with configurable latitude/longitude
- Deity detail view
- Expanded mantra experience with TTS, favorites and sharing
- Meditation timer: 5/10/15/20/30 minutes
- Local devotional history, Japa totals and meditation totals
- PNG devotional share-card generator
- Local JSON backup/export and restore/import
- Local reset controls
- DST-safe Chrome daily reminders
- Privacy page, security headers, robots and sitemap
- GitHub Actions build/smoke quality gate

### Panchang and festival accuracy
Panchang calculations depend on coordinates and the calculation engine's calendar conventions. Festival dates can vary by region and tradition, so DharmaPulse presents reference content and encourages verification with the user's local panchang for observance decisions.


## Release checklist

Before publishing a release, verify: 
- `npm ci` installs the committed dependency graph.
- `npm run test:smoke`, `npm run test:content`, and `npm run test:panchang` pass.
- `npm run build` succeeds on the same Node/Next.js versions used by the deployment provider.
- The deployed URL is tested on mobile and desktop, including offline mode, PWA install, Panchang, Japa, backup/restore, and Chrome extension options.
- Festival observance dates are checked against a local/regional panchang before being used for religious scheduling.
