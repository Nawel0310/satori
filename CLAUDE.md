# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Frontend-only mocked demo for **Satori** (audiovisual production company). No backend, no real database, no real auth. Built to demo a future CRM + budgeting system before it's sold/built for real. Full spec in `DEMO-SATORI.md`; user-facing guide in `README.md` (both in Spanish).

Key constraint to respect when adding features: **nothing in this demo should imply real (server-side) persistence, real auth, or real integrations** (email, payments, etc.) — that's explicitly out of scope per `DEMO-SATORI.md` §2, and screens are designed not to over-promise what the paid phase would add. Client-side `localStorage` persistence (see below) is fine — it's local to the salesperson's own browser, not a backend.

## Commands

```bash
pnpm install
pnpm dev      # dev server, http://localhost:3000 (redirects to /login)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

No test suite is configured. Login requires the fixed demo credentials in `lib/auth.ts` (shown on the login screen itself) — it's a mocked client-side gate, not real auth (see Architecture below).

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 (CSS-first config via `@theme inline` in `app/globals.css`, no `tailwind.config.*` file) + pnpm. No UI or drag-and-drop libraries — the Kanban board uses native HTML5 Drag and Drop.

**All state lives in React context, persisted to the browser's `localStorage`** (key `satori-demo-data:v1`, see `context/demo-data-context.tsx`) so a demo survives an accidental reload/tab close. There is no server persistence, no API routes, no backend anywhere in the app — it's still 100% local to whichever browser is running the demo. To go back to the seed data (e.g. before a new sales call), use the "Reiniciar demo" button in the sidebar (`components/sidebar/Sidebar.tsx`), which clears `localStorage` and dispatches a `RESET` action back to `lib/mock-data.ts`'s seed arrays.

**Login gate is mocked, not real auth** (`lib/auth.ts`, `components/auth/AuthGuard.tsx`). Fixed username/password checked entirely client-side; on success a flag is written to `localStorage` (key `satori-demo-auth:v1`). `AuthGuard` wraps `app/(app)/layout.tsx` and reads that flag via `useSyncExternalStore` (not `useState`+`useEffect` — a plain `setState` inside an effect trips this repo's `react-hooks/set-state-in-effect` lint rule when the value comes from `localStorage`; `useSyncExternalStore`'s server-snapshot argument is also what keeps this SSR-safe during the static build), redirecting to `/login` if absent. **This is not a real security boundary** — the credentials ship in the public JS bundle, static export has no middleware to enforce this server-side, and anyone can read `lib/auth.ts`. It only exists so a casual visitor doesn't land in the CRM by accident; don't extend it to gate anything that needs to be actually secure without first replacing it with real backend-verified auth (paid-phase scope, see `DEMO-SATORI.md` §2).

**Static export (`output: "export"`) has no server, so every route must be statically resolvable at build time.** Screens that show/edit a specific entity (`ClientDetailView`, `BudgetClientView`, etc.) live behind **static** route segments (e.g. `/clientes/detalle`, `/presupuestos/editar`) and read the entity `id` from the query string via `useSearchParams()` (wrapped in `<Suspense>`, required by Next for static export), not from a dynamic `[id]` route segment. This is deliberate: a `[id]` segment would need `generateStaticParams()` enumerating every valid id at build time, which is impossible for entities created live during a demo (client-generated ids like `` `cli-${Date.now()}` ``) — those ids don't exist yet at build time, so GitHub Pages would 404 on them. Follow this query-param pattern for any new "view/edit one entity" screen instead of adding a new `[id]` folder.

### Data flow

- `lib/types.ts` — the entire domain model: `Client`, `Production`, `Budget`, `BudgetTemplate`, `Reminder`, `Note`, plus the union types for stages/statuses/categories (`PipelineStage`, `BudgetStatus`, `ProductionCategory`, `ClientType`).
- `lib/mock-data.ts` — hardcoded seed data (`INITIAL_CLIENTS`, `INITIAL_PRODUCTIONS`, `INITIAL_BUDGETS`, `INITIAL_BUDGET_TEMPLATES`, `INITIAL_REMINDERS`); the demo starts here and only returns to it via the sidebar's "Reiniciar demo" action (not automatically on reload — see persistence note above).
- `context/demo-data-context.tsx` — single `useReducer`-based context (`DemoDataProvider` / `useDemoData()`) that is the *only* source of truth for all app data. All CRUD across clients, productions, budgets, templates, reminders, and notes goes through this one reducer. When adding a new mutation, add an `Action` variant + reducer case + a wrapped dispatch method on the context value — follow the existing pattern (e.g. `ADD_CLIENT`/`addClient`) rather than introducing separate local state or another context.
- Cross-entity cascades live in the reducer, not in components — e.g. `DELETE_CLIENT` also strips that client's productions/budgets/reminders; `DELETE_PRODUCTION` unlinks (not deletes) associated budgets. Keep this cascade logic centralized here when adding new relations.
- IDs for new entities are generated client-side as `` `${prefix}-${Date.now()}` `` inside the context's dispatch wrappers (e.g. `cli-`, `prod-`, `rem-`, `tpl-`, `note-`).

### Routing / layout

- `app/(app)/layout.tsx` wraps every route in the group with `AuthGuard`, then `DemoDataProvider` and the `SidebarShell` — this is the only place the provider is mounted, so any route outside the `(app)` group (e.g. `/login`) has no access to `useDemoData()` and isn't gated by `AuthGuard`.
- `app/(app)/` route tree mirrors the screen map in `README.md` (CRM listing/detail/new/edit, embudo Kanban, producciones, recordatorios; presupuestos listing/new/edit, cliente-facing view, plantillas).
- `app/page.tsx` is just a redirect to `/login`.

### Components

- `components/crm/`, `components/presupuestos/`, `components/dashboard/`, `components/sidebar/`, `components/auth/` — feature-scoped components consumed by their matching route group.
- `components/ui/` — shared primitives (`Button`, `Card`, `Input`, `ConfirmDialog`, `RowAction`, `PlaceholderImage`, `icons.tsx`). Prefer these over ad-hoc markup for consistency.
- `hooks/useDialogA11y.ts` — shared accessibility behavior for dialogs/modals (e.g. `ConfirmDialog`).
- `lib/format.ts` — shared formatting helpers (dates, currency, etc.) — check here before writing new formatting logic.

### Visual identity

Acromatic by design (see `DEMO-SATORI.md` §4): white-dominant background with black/gray accents, no saturated colors — color comes from the media placeholders, not the UI. Headings use Oswald (`--font-oswald` / `.font-heading`, uppercase, condensed), body text uses Inter. Theme tokens (`--background`, `--surface`, `--primary`, `--secondary`, `--accent`, `--border`) are defined in `app/globals.css` and exposed to Tailwind via `@theme inline` — use the corresponding `bg-*`/`text-*`/`border-*` utility classes rather than hardcoding hex values.
