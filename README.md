# DharmaPulse

**A moment of Dharma, every day.**

DharmaPulse is an original, account-free devotional companion for web and Chrome. It provides a daily devotional message, deity explorer, simple wisdom, puja guidance, Telugu/English support, browser speech, favorites, sharing and daily extension reminders.

## Run the web app
```bash
npm install
npm run dev
```

## Chrome extension
1. Open Chrome → Extensions → Manage Extensions.
2. Enable Developer mode.
3. Choose **Load unpacked** and select the repository's `public` folder.

The extension uses Manifest V3, Chrome alarms, notifications and local browser storage-ready architecture. No account or paid API is required.

## Stack
Next.js + React + TypeScript + static devotional content. The app is intentionally API-free for the first release so it can run cheaply and reliably.
