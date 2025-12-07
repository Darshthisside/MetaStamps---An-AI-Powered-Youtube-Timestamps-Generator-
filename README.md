# MetaStamps — AI-powered YouTube Timestamps Generator

MetaStamps generates accurate, readable timestamps for YouTube videos using an AI-assisted workflow. This repository contains a web UI built with Vite + React + TypeScript and a small frontend for uploading or pointing at video/audio sources and producing timestamped segments.

## Highlights
- Generate time-coded segments and short summaries for video content
- Clean, copy-pasteable timestamp output for use in video descriptions
- Lightweight React + Vite frontend with Tailwind styling

## Quick start (developer)

Requirements
- Node.js 16+ (LTS recommended)
- npm (or bun/pnpm if preferred)

Install dependencies

```powershell
cd C:\Users\Darshan\Downloads\chronostream-ai-main\chronostream-ai-main
npm install
```

Run the dev server

```powershell
npm run dev
```

Open http://localhost:5173 in your browser (Vite's default). The app will hot-reload on changes.

Build for production

```powershell
npm run build
npm run preview
```

## Project layout (top-level)
- `index.html` — Vite entry
- `src/` — React + TypeScript source files
- `src/components/` — UI components
- `src/hooks/` — custom hooks used by the app
- `public/` — static assets

## How to use
1. Start the dev server.
2. Open the app in your browser and follow the UI to provide a video URL or upload audio.
3. Generate timestamps and copy them into your video description.

## Contributing
Contributions are welcome. If you open issues or PRs, please:
- Provide reproducible steps for bugs
- Keep changes focused and include tests where relevant

## Notes
- This README focuses on using and developing the frontend app. Any backend/AI integration or API keys should be configured separately and are not stored here.
- Git will warn about CRLF line ending normalization on Windows; that's expected and safe.

## License
This project is available under the MIT License.

---

If you'd like a shorter or longer README (more setup details, screenshots, or deployment instructions), tell me what to include and I'll update it.
