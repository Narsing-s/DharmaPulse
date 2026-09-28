# DharmaPulse production readiness

## Included
- Local-first favorites, history, settings and backup/restore
- Offline PWA shell and Chrome extension
- Panchang calculation integration with configurable coordinates
- Mantra, Japa and meditation tracking
- Share-card PNG generation
- English/Telugu UI
- Privacy page and security headers
- GitHub Actions build and smoke tests

## Panchang note
Panchanga calculations depend on the selected coordinates and the library's calendar conventions. Festival observance can vary by region and tradition; the UI intentionally tells users to verify local panchang information.

## Deployment
The repository is Vercel-compatible. A Vercel token/project connection is still required for an automated production deployment; no token is stored in this repository.
