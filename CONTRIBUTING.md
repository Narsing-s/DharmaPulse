# Contributing to DharmaPulse

Thank you for helping improve DharmaPulse. Please keep contributions focused, accessible, privacy-friendly, and consistent with the project's local-first design.

## Development

1. Fork the repository and create a focused branch.
2. Install dependencies with `npm install`.
3. Make your change without duplicating existing functionality.
4. Run all quality checks:

```bash
npm run lint
npm run test:content
npm run test:panchang
npm run test:smoke
npm run build
```

5. Open a pull request with a concise description and testing details.

## Guidelines

- Do not commit secrets, API keys, credentials, private keys, or personal data.
- Prefer local-first solutions and avoid unnecessary external services.
- Preserve Telugu/English support and responsive behavior where applicable.
- Update documentation when behavior or developer workflows change.
- Keep accessibility and offline/PWA behavior in mind.

## Pull requests

Please keep each PR focused on one logical improvement. CI checks should pass before merging.
