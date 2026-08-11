# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Frontend-only mocked demo for **Satori** (audiovisual production company). No backend, no real database, no real auth. Built to demo a future CRM + budgeting system before it's sold/built for real. Full spec in `DEMO-SATORI.md`; user-facing guide in `README.md` (both in Spanish).

Key constraint to respect when adding features: **nothing in this demo should imply real persistence, real auth, or real integrations** (email, payments, etc.) — that's explicitly out of scope per `DEMO-SATORI.md` §2, and screens are designed not to over-promise what the paid phase would add.

## Commands

```bash
pnpm install
pnpm dev      # dev server, http://localhost:3000 (redirects to /login)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

No test suite is configured. Login accepts any credentials (including empty) — there's no real auth to test against.

## Architecture

**Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 (CSS-first config via `@theme inline` in `app/globals.css`, no `tailwind.config.*` file) + pnpm. No UI or drag-and-drop libraries — the Kanban board uses native HTML5 Drag and Drop.

**All state is in-memory and resets on page reload.** This is intentional (see README "⚠️ Importante"), not a bug. There is no localStorage, no API routes, no server persistence anywhere in the app.

### Data flow

- `lib/types.ts` — the entire domain model: `Client`, `Production`, `Budget`, `BudgetTemplate`, `Reminder`, `Note`, plus the union types for stages/statuses/categories (`PipelineStage`, `BudgetStatus`, `ProductionCategory`, `ClientType`).
- `lib/mock-data.ts` — hardcoded seed data (`INITIAL_CLIENTS`, `INITIAL_PRODUCTIONS`, `INITIAL_BUDGETS`, `INITIAL_BUDGET_TEMPLATES`, `INITIAL_REMINDERS`), reset to this on every reload.
- `context/demo-data-context.tsx` — single `useReducer`-based context (`DemoDataProvider` / `useDemoData()`) that is the *only* source of truth for all app data. All CRUD across clients, productions, budgets, templates, reminders, and notes goes through this one reducer. When adding a new mutation, add an `Action` variant + reducer case + a wrapped dispatch method on the context value — follow the existing pattern (e.g. `ADD_CLIENT`/`addClient`) rather than introducing separate local state or another context.
- Cross-entity cascades live in the reducer, not in components — e.g. `DELETE_CLIENT` also strips that client's productions/budgets/reminders; `DELETE_PRODUCTION` unlinks (not deletes) associated budgets. Keep this cascade logic centralized here when adding new relations.
- IDs for new entities are generated client-side as `` `${prefix}-${Date.now()}` `` inside the context's dispatch wrappers (e.g. `cli-`, `prod-`, `rem-`, `tpl-`, `note-`).

### Routing / layout

- `app/(app)/layout.tsx` wraps every authenticated route in `DemoDataProvider` and the `SidebarShell` — this is the only place the provider is mounted, so any route outside the `(app)` group (e.g. `/login`) has no access to `useDemoData()`.
- `app/(app)/` route tree mirrors the screen map in `README.md` (CRM listing/detail/new/edit, embudo Kanban, producciones, recordatorios; presupuestos listing/new/edit, cliente-facing view, plantillas).
- `app/page.tsx` is just a redirect to `/login`.

### Components

- `components/crm/`, `components/presupuestos/`, `components/dashboard/`, `components/sidebar/` — feature-scoped components consumed by their matching route group.
- `components/ui/` — shared primitives (`Button`, `Card`, `Input`, `ConfirmDialog`, `RowAction`, `PlaceholderImage`, `icons.tsx`). Prefer these over ad-hoc markup for consistency.
- `hooks/useDialogA11y.ts` — shared accessibility behavior for dialogs/modals (e.g. `ConfirmDialog`).
- `lib/format.ts` — shared formatting helpers (dates, currency, etc.) — check here before writing new formatting logic.

### Visual identity

Acromatic by design (see `DEMO-SATORI.md` §4): white-dominant background with black/gray accents, no saturated colors — color comes from the media placeholders, not the UI. Headings use Oswald (`--font-oswald` / `.font-heading`, uppercase, condensed), body text uses Inter. Theme tokens (`--background`, `--surface`, `--primary`, `--secondary`, `--accent`, `--border`) are defined in `app/globals.css` and exposed to Tailwind via `@theme inline` — use the corresponding `bg-*`/`text-*`/`border-*` utility classes rather than hardcoding hex values.
