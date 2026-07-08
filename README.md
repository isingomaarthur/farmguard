# Farm Guard

A Next.js (App Router) recreation of the Farm Guard AI farming assistant UI —
sidebar navigation, a greeting screen with quick-action cards, and a chat
interface with structured replies (weather forecast, market prices).

All components use the `.jsx` extension.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.jsx             Root layout, fonts, metadata
  page.jsx               Farm Guard chat screen (greeting + quick actions)
  globals.css            Tailwind base + global styles
  (dashboard)/
    layout.jsx           Shared shell (green top bar + Farm Guard sidebar)
    dashboard/page.jsx   Real-Time Monitoring — sensor cards + trend charts
    alerts/page.jsx      Alerts & Notifications — severity list
    reports/page.jsx     Data Visualization & Reports — bar + pie charts
    system-map/page.jsx  System Map — sensor node locations
    profile/page.jsx     Profile — user & farm details, account settings
components/
  Sidebar.jsx            Chat screen nav: brand, new chat, recent chats
  ChatInput.jsx          Message input with send button
  ChatMessage.jsx        Single chat bubble (user or assistant)
  QuickActionCard.jsx    Home screen quick-action tiles
  WeatherWidget.jsx      Structured weather reply
  PriceTable.jsx         Structured market-price reply
  FarmGuardSidebar.jsx   Dashboard nav: Dashboard/Alerts/Reports/System Map/Profile
  FarmGuardTopBar.jsx    Green header bar with GSM online status
  StatusPill.jsx         NORMAL/WARNING/CRITICAL/INFO badge
```

The chat assistant (`/`) and the GSM monitoring dashboard (`/dashboard`,
`/alerts`, `/reports`, `/system-map`, `/profile`) are cross-linked: "Sensor
monitoring" in the chat sidebar opens the dashboard, and "Ask Farm Guard" in
the dashboard sidebar returns to the chat.

`system-map` and `profile` were built to match the established visual system
since their reference screenshots weren't available — adjust the mock data
(`NODES` in `system-map/page.jsx`, the profile fields in `profile/page.jsx`)
to fit your real content.

## Design tokens

- **Colors:** forest green (`#1F3D2B`) sidebar, cream (`#FAF6EC`) background,
  gold (`#D9A441`) accent, clay (`#B5651D`) for alerts, sky blue (`#4F86A0`)
  for weather.
- **Type:** Fraunces (display/headings), Inter (body), IBM Plex Mono (data,
  prices).

## Customizing

- Quick actions and their prompts live in `QUICK_ACTIONS` inside `app/page.jsx`.
- Recent chat history is mocked in `components/Sidebar.jsx` — wire it up to
  your own chat storage/API.
- `respondTo` in `app/page.jsx` is a placeholder responder; replace it with a
  call to your AI backend.
