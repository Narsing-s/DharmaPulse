<div align="center">

# 🪔 DharmaPulse

### **A moment of Dharma, every day.**

<p>
  <strong>A calm, privacy-first devotional companion for Web, PWA & Chrome.</strong><br/>
  Daily wisdom • Mantras • Japa • Panchang • Festivals • Meditation
</p>

<p>
  <a href="https://github.com/Narsing-s/DharmaPulse/actions/workflows/quality.yml"><img src="https://github.com/Narsing-s/DharmaPulse/actions/workflows/quality.yml/badge.svg" alt="Quality CI"/></a>
  <a href="https://github.com/Narsing-s/DharmaPulse/actions/workflows/chrome-extension.yml"><img src="https://github.com/Narsing-s/DharmaPulse/actions/workflows/chrome-extension.yml/badge.svg" alt="Chrome Extension CI"/></a>
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white" alt="Node.js 22"/>
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Privacy-Local--First-7C3AED" alt="Privacy first"/>
</p>

<p>
  <a href="https://github.com/Narsing-s/DharmaPulse">⭐ GitHub</a>
  ·
  <a href="https://github.com/Narsing-s/DharmaPulse/actions">⚙️ CI / Actions</a>
  ·
  <a href="https://github.com/Narsing-s/DharmaPulse/releases">📦 Releases</a>
</p>

</div>

---

## 🌸 What is DharmaPulse?

**DharmaPulse** is an original, account-free devotional experience designed for a simple daily rhythm of reflection.

It brings spiritual content and practical devotional tools together in one focused interface—without requiring an account or a paid API.

> **One app. One calm moment. Every day.** 🪔

---

## ✨ Experience at a glance

| 🏠 Daily | 📅 Calendar | 📿 Practice | 🧘 Wellness |
|---|---|---|---|
| Daily wisdom & blessing | Festivals & Panchang | Mantras & Japa | Meditation timer |
| Devotional questions | Deity explorer | 11 / 21 / 54 / 108 counts | Personal totals |
| Telugu / English | Regional coordinates | TTS & sharing | Local history |

---

## 🛕 Core features

### 🌅 Daily devotion
- Daily devotion, blessing, wisdom and reflection
- 366-entry content cycle for day-by-day coverage, including leap years
- Telugu / English preference persistence

### 📅 Panchang & festivals
- Offline Panchang calculation
- Configurable latitude / longitude
- Festival calendar with regional/traditional accuracy guidance
- Clear informational disclaimer for observance decisions

### 🛕 Deities & devotional content
- Searchable deity explorer
- Deity detail views
- Mantra library
- Text-to-speech in English / Telugu
- Native sharing with clipboard fallback

### 📿 Japa & meditation
- Japa counter: **11 / 21 / 54 / 108**
- Meditation sessions: **5 / 10 / 15 / 20 / 30 minutes**
- Local Japa and meditation totals
- Devotional history

### 📱 Modern app experience
- Installable PWA
- Offline cache through service worker
- Dark mode
- Local favorites
- PNG devotional share-card generator
- JSON backup / restore
- Local reset controls
- Browser / PWA notification permission test

### 🧩 Chrome extension
- Daily devotional experience from the browser
- Configurable reminder time
- DST-safe reminder handling
- Extension options page
- Shared content library with the web app

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │  Shared Content     │
                         │  JSON Library       │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
             ┌──────────────┐               ┌──────────────┐
             │   Web / PWA  │               │   Chrome     │
             │              │               │  Extension   │
             └──────┬───────┘               └──────┬───────┘
                    │                              │
                    └──────────────┬───────────────┘
                                   ▼
                     ┌─────────────────────────┐
                     │ Daily Devotional Flow   │
                     │                         │
                     │ Wisdom → Mantra →       │
                     │ Blessing → Reflection   │
                     └─────────────────────────┘
```

### 🔒 Local-first by design

DharmaPulse intentionally keeps the core experience **local and lightweight**:

- No login required
- No paid API dependency
- Local favorites and history
- Local backup / restore
- Offline-friendly architecture
- Shared static content for web + extension

---

## 🚀 Run locally

### Prerequisites

- Node.js **22.x**
- npm
- Git

### Start development

```bash
npm install
npm run dev
```

Then open the local development URL shown by Next.js.

### Production build

```bash
npm run build
```

### Quality checks

```bash
npm run lint
npm run test:content
npm run test:panchang
npm run test:smoke
```

---

## 🧩 Chrome extension

The repository maintains **one canonical extension implementation** under `extension/`.

### Load locally in Chrome

1. Open **Chrome → Extensions → Manage Extensions**
2. Enable **Developer mode**
3. Choose **Load unpacked**
4. Select the built extension directory produced by the project
5. Open **Details → Extension options** to configure the reminder

The extension packaging workflow is maintained separately from the web application build so extension regressions can be detected early.

---

## 🧪 Engineering & quality

DharmaPulse uses automated quality gates for the core project:

- ✅ Lint validation
- ✅ Content integrity tests
- ✅ Panchang tests
- ✅ Smoke tests
- ✅ Production build validation
- ✅ Chrome extension validation / packaging
- ✅ GitHub Actions CI
- ✅ PWA / offline architecture checks

For releases, test the deployed experience on **mobile and desktop**, including offline mode, PWA installation, Panchang, Japa, backup/restore and extension options.

---

## 📁 Project structure

```text
DharmaPulse/
├── app/                    # Next.js application
├── extension/              # Canonical Chrome extension
├── public/                 # Static assets & shared content
├── scripts/                # Build / validation utilities
├── tests/                  # Automated tests
├── .github/workflows/      # CI & deployment workflows
├── next.config.*           # Next.js configuration
├── package.json            # Scripts & dependencies
└── README.md               # Project documentation
```

---

## 🌐 Language & accessibility

DharmaPulse supports a **Telugu / English** devotional experience with browser speech support.

The goal is a distraction-free interface that works comfortably across desktop and mobile form factors.

---

## 🪔 Panchang & festival accuracy

Panchang calculations depend on coordinates and calendar conventions. Festival observance can vary by **region, tradition and local panchang**.

DharmaPulse therefore presents reference information and recommends verifying important observance dates with the user's local or family panchang.

> **DharmaPulse is an informational devotional companion, not a replacement for a traditional/local panchang.**

---

## 🔐 Privacy

DharmaPulse is designed around a **no-account, local-first** experience.

The application does not require a paid external API for its core devotional features. Local user data such as favorites, history and counters is intended to remain on the user's device unless the user explicitly exports it.

---

## 🗺️ Product direction

Future improvements should strengthen the existing experience rather than duplicate features:

- 🎨 Refine visual polish and accessibility
- 📅 Improve regional calendar guidance
- 📿 Expand devotional practice utilities
- ⚡ Keep performance and offline reliability high
- 🔐 Preserve the local-first privacy model
- 🧪 Continue automated quality coverage

---

## 🤝 Contributing

Contributions, bug reports and thoughtful improvements are welcome.

Before opening a pull request:

```bash
npm install
npm run lint
npm run test:content
npm run test:panchang
npm run test:smoke
npm run build
```

Please keep changes focused, accessible, privacy-friendly and consistent with the existing DharmaPulse experience.

---

## 📄 License

See the repository for the current project license and usage terms.

---

<div align="center">

### 🪔 **DharmaPulse**
**Pause. Reflect. Practice.**

<p>
  Built with care for a simple daily devotional experience.
</p>

⭐ If DharmaPulse is useful to you, consider starring the repository.

</div>
