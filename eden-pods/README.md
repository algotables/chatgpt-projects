# Eden Pods MVP (Codespaces-first)

Mobile-first MVP for logging throw-and-grow Eden Pods, tracking growth stages, and receiving in-app reminders.

## Quick start in GitHub Codespaces

1. Open this repo in **GitHub Codespaces**.
2. Wait for `postCreateCommand` to finish (`npm install`).
3. Copy env template:
   ```bash
   cp apps/web/.env.local.example apps/web/.env.local
   ```
4. Run the stack:
   ```bash
   npm run dev
   ```
5. Open forwarded port **3000** for the app.
6. Open forwarded port **4000** for Firebase Emulator UI.

## One-command development

`npm run dev` starts:
- Firebase emulators (Auth, Firestore, Functions, Emulator UI)
- Next.js web app at `0.0.0.0:3000`
- A dev scheduler loop that invokes due notification function

Additional scripts:
- `npm run emulators`
- `npm run web`
- `npm run seed`
- `npm run functions:build`
- `npm run lint`
- `npm run test`

## Firebase emulator defaults

Project ID: `demo-edenpods`.
No real secrets required.

## Real Firebase project (optional)

1. Set real values in `apps/web/.env.local`.
2. Set `NEXT_PUBLIC_USE_EMULATORS=false`.
3. Update `.firebaserc` default project.
4. Deploy rules/functions as needed with Firebase CLI.

## MVP features included

- Auth onboarding (Google + guest/email-like flow in emulator)
- Pod throw wizard with privacy mode (Private default)
- Client-side AES-GCM location encryption
- Throw timeline with stage buttons
- Observation logging + harvest logging
- Dashboard + Birthright kit projection
- Firestore-backed Notification Center
- Functions trigger + scheduler for stage reminders
- Idempotent emulator seed data

## Data model

Collections:
- `users`, `forests`, `throws`, `observations`, `harvests`, `notifications`
- Seed collections: `podTypes`, `plants`, `growthModels`, `recipes`

## Notes

- Weather is implemented with deterministic demo stub in emulator mode.
- Push notifications are not enabled in emulator; in-app notification center is the primary pipeline.
