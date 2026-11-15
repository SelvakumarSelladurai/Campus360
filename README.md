# Campus360

Campus360 is planned as a multi-tenant College ERP SaaS platform for institution operations, academic workflows, and student, faculty, and parent services.

## Frontend architecture proposal

This section records the proposed frontend architecture for product and technical review. It is a design proposal, not a description of implemented or verified functionality.

### Repository discovery

At the time of this proposal, the repository has no frontend source files or package configuration. The `frontend/`, `backend/`, `docs/`, `infrastructure/`, `scripts/`, and `tests/` directories are empty. The root `README.md`, `LICENSE`, and `docker-compose.yml` were empty. Git metadata was not available in the workspace, so a Git status could not be inspected.

### Architectural direction

Use a feature-based React application with a small shared platform layer:

- `app/` assembles providers, routes, configuration, and global client stores.
- `features/` owns domain workflows, pages, API contracts, forms, and feature tests.
- Shared components and utilities are limited to concerns used across features.
- API and authorization boundaries are explicit. Frontend permissions guide the user experience; the backend remains the security boundary.
- Implement domain modules incrementally instead of creating empty placeholders for every future module.

Features expose intentional public exports through `index.ts`. Other features should use those exports rather than importing internal files. Cross-feature orchestration belongs in application or route composition, or in a deliberately shared domain service.

### Proposed structure

```text
frontend/
├── public/
├── e2e/
│   ├── auth/
│   ├── students/
│   ├── attendance/
│   ├── examinations/
│   └── fixtures/
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── providers/
│   │   ├── query/
│   │   ├── router/
│   │   └── store/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── data-display/
│   │   ├── feedback/
│   │   ├── forms/
│   │   └── overlays/
│   ├── layouts/
│   ├── features/
│   ├── services/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   ├── styles/
│   ├── test/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── eslint.config.js
└── .env.example
```

### Layer responsibilities and boundaries

| Layer | Responsibility | Boundary |
|---|---|---|
| `app/` | App providers, configuration, route assembly, and global stores | Composes features and layouts; does not own domain workflows or API collections |
| `features/<domain>/` | Domain pages, components, API/query modules, schemas, types, utilities, and tests | Feature-owned behavior stays inside the feature; exports only a deliberate public API |
| `components/` | Design-system primitives and cross-feature presentation patterns | No domain API calls, tenant assumptions, or business authorization policy |
| `layouts/` | Responsive page framing and navigation slots | No domain data fetching or duplicated permission policy |
| `services/` | HTTP transport, request configuration, and normalized errors | No feature endpoint definitions or presentation logic |
| `hooks/`, `utils/`, `lib/` | App-wide hooks, pure domain-neutral helpers, and small adapters | Feature-specific behavior belongs in the feature; keep dependencies low-level |
| `types/`, `constants/` | Truly app-wide contracts and stable constants | Domain types and schemas stay with their owning feature |
| `test/`, `e2e/` | Shared test setup, factories, helpers, and end-to-end journeys | Tests use public interfaces and controlled API boundaries |

A feature such as `students/` should organize `api/`, `components/`, `hooks/`, `pages/`, `schemas/`, `types/`, `utils/`, tests, and `index.ts`. API functions own endpoint paths and request/response types; query hooks use those functions; UI components consume hooks and callbacks rather than calling the transport directly. Endpoint paths will follow the eventual FastAPI contract and must not be invented in advance.

### State management

| State category | Owner | Examples |
|---|---|---|
| Global client state | Zustand | Session UI state, selected institution context, sidebar state, theme and user preferences |
| Server state | TanStack Query | Students, attendance, fees, institution settings, dashboard metrics, loading and error state |
| Local interaction state | React state | Dialog visibility, current tab, expanded filters, temporary selections |

Zustand should contain small client-owned state, not copies of API collections. Persist only suitable preferences; do not persist credentials or treat cached permission data as authoritative. Use narrow selectors and reset tenant-scoped state on logout or institution switch.

TanStack Query keys should be stable and hierarchical, for example `['students', institutionId, 'list', filters]`. Colocate query factories with feature APIs. Prefer server pagination and filtering for large collections, targeted invalidation after mutations, and optimistic updates only when rollback is well-defined. Retry transient failures only; validation and authorization failures should not be retried automatically.

### Routing

Use React Router 7 Data Mode with nested route groups and lazy-loaded pages:

- `/auth/*` — login, forgot password, and reset password.
- `/super-admin/*` — platform administration.
- `/app/*` — institution workspace.
- `/student/*`, `/faculty/*`, `/parent/*` — role-oriented portals.

Route groups own layouts, pending and error UI, and route metadata such as breadcrumbs and required permissions. Feature route modules contribute routes through public exports. Not-found and unauthorized states have distinct screens. Route guards and hidden navigation are usability controls; the backend must enforce every operation.

### Design system and accessibility

Use Tailwind CSS 4 design tokens in centralized CSS variables for semantic colors, typography, spacing, radii, shadows, focus, and light/dark themes. Compose Radix UI primitives into Campus360 controls; installing primitives alone does not provide a complete design system. Use one React Icons family with consistent sizing. Keep domain-specific display components in their feature unless multiple real consumers establish a shared need.

Target WCAG 2.2 AA with keyboard operation, visible focus, semantic landmarks, accessible labels and errors, sufficient contrast, reduced-motion support, and responsive desktop, tablet, and mobile layouts. Essential actions must not depend on hover.

### API integration and security

Use one typed HTTP client configured from `VITE_API_BASE_URL`, with feature API modules layered above it. The client should support request/response typing, cancellation through `AbortSignal`, timeout handling, normalized HTTP and network errors, and request IDs when supported. Keep mock adapters separate from production API functions and select them explicitly for development or tests.

The proposed session contract is backend-issued `HttpOnly`, `Secure`, `SameSite` cookies with a backend-defined CSRF mechanism. The frontend sends credentialed requests and coordinates session restoration or client state clearing on unauthorized responses. The backend must define refresh behavior and CSRF token handling. Access tokens should not be stored in localStorage by default. Vite-prefixed environment variables are public browser configuration and must never contain secrets.

The frontend institution context is for UX and request context only. Load the user's authorized institution list and current context during session restoration. On institution switch, update context, clear tenant-scoped query caches, load new institution settings, and navigate to an allowed landing page. The backend independently validates tenant access for every request; a browser-supplied institution ID is never proof of authorization.

Authentication answers who the user is; authorization answers what they may do. Represent authorization through backend-provided permissions and a centralized `can(permission)` helper, not role-name checks spread through components. Role can guide default navigation, while permission controls individual actions. Backend enforcement is mandatory even when a route or action is hidden in the UI.

### Forms and dashboards

Use React Hook Form, Zod, and `@hookform/resolvers`. Keep schemas in their owning feature, type form values from schemas, map server validation errors to fields, and provide accessible field errors, submission states, dirty-state handling, and reset behavior.

The institution dashboard can present student and faculty totals, department counts, attendance, fee collection and pending amounts, upcoming examinations, activities, attendance trends, enrollment, placements, quick actions, and notifications. Use Recharts with typed data, accessible labels/tooltips, responsive containers, and explicit loading and empty states. Keep mock data separate from API-backed data until endpoints are available.

### Testing and quality

Use Vitest, React Testing Library, and user-event for behavior-focused component, hook, store, schema, utility, permission, and query-hook tests. Mock at API boundaries or use controlled adapters so tests do not depend on backend availability. Use Playwright for critical user journeys: login/session restoration, protected navigation, student creation and search, attendance, examinations, role-specific experiences, responsive navigation, and important error cases.

Run unit/integration and E2E suites separately in CI with deterministic fixtures. Define coverage expectations after the initial feature establishes a meaningful baseline; coverage percentage alone is not a quality gate. Use strict TypeScript, ESLint, formatting conventions, route-based code splitting, pagination for large datasets, and virtualization only for genuinely large lists. Memoize only when measurement or a clear rendering need justifies it.

### Dependency set and compatibility

The proposed stack is React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7, Zustand, TanStack Query, React Hook Form, Zod, `@hookform/resolvers`, Radix UI, React Icons, Recharts, Vitest, React Testing Library, user-event, and Playwright. Add ESLint and compatible TypeScript/React plugins for code quality.

Select stable versions together at installation time, verify Node and peer-dependency requirements, and commit the lockfile. Confirm the browser support baseline before adopting Tailwind 4: its documented baseline is Safari 16.4+, Chrome 111+, and Firefox 128+. Current upstream release information should be rechecked before installation: [React versions](https://react.dev/versions), [Vite releases](https://vite.dev/releases), and [Tailwind CSS updates](https://tailwindcss.com/blog).

### Proposed architecture decisions

1. **Feature modules with public exports:** supports incremental domain growth; requires export and dependency discipline.
2. **Zustand for client state and TanStack Query for server state:** clarifies state ownership; requires avoiding duplicated state.
3. **React Router 7 Data Mode:** supports nested layouts and route boundaries in a Vite SPA; requires consistent route conventions.
4. **Cookie session and CSRF contract:** avoids default browser storage for tokens; requires a coordinated backend contract.
5. **Tenant context is UX/request context only:** supports switching and branding; backend must authorize all operations independently.
6. **Tailwind tokens and composed Radix controls:** supports a consistent UI; requires browser baseline confirmation and shared component ownership rules.

These decisions should be recorded as ADRs during the documentation stage, with context, alternatives, consequences, and migration notes.

### Risks and open assumptions

- The FastAPI schema, permission vocabulary, cookie/CSRF behavior, refresh strategy, and tenant request context are not yet available.
- Tailwind 4's browser baseline may exclude older institutional devices; support requirements need confirmation.
- Weak tenant scoping in query keys can show stale data after switching institutions.
- Frontend permissions can drift from backend policy and must never be treated as authorization enforcement.
- No Git metadata was available in this workspace; establish or restore Git history before implementation if reviewable change history is required.

### Implementation roadmap

1. Review and approve the architecture and resolve backend/browser assumptions.
2. Create the requested frontend architecture documents and ADRs.
3. Configure the Vite/React foundation, strict TypeScript, Tailwind, routing, Zustand, TanStack Query, forms, Radix, icons, tests, lint/format, providers, and initial tokens.
4. Implement the responsive shell, authentication UI, session restoration, and permission-aware navigation.
5. Build the institution dashboard, then student workflows to establish conventions.
6. Add faculty, academics, attendance, examinations, fees, placements, and remaining domains incrementally.
7. For each implementation cycle, run type checks, lint, unit tests, build, relevant Playwright workflows, responsive review, and accessibility checks.

No frontend implementation is represented as complete by this proposal. Implementation should begin after architecture review and approval.
# Campus360
