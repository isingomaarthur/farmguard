# Farm Genie

A Next.js (App Router) recreation of the Farm Genie AI farming assistant UI —
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
  layout.jsx       Root layout, fonts, metadata
  page.jsx         Dashboard + chat screen
  globals.css      Tailwind base + global styles
components/
  Sidebar.jsx          Left navigation: brand, new chat, recent chats
  ChatInput.jsx        Message input with send button
  ChatMessage.jsx      Single chat bubble (user or assistant)
  QuickActionCard.jsx  Home screen quick-action tiles
  WeatherWidget.jsx    Structured weather reply
  PriceTable.jsx       Structured market-price reply
```

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
