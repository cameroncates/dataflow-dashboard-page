## DataFlow Dashboard

### Project overview
DataFlow Dashboard is a responsive analytics dashboard UI built with React and Vite. It demonstrates a clean component architecture, typed data models, simulated data fetching, and a polished sidebar navigation with desktop collapse + mobile/tablet overlay behavior.

### Tech stack
- **UI**: React, Tailwind CSS
- **Charts**: Recharts
- **Icons**: lucide-react
- **Build tooling**: Vite
- **Language**: TypeScript
- **Linting**: ESLint (flat config)
- **Unit tests**: Vitest + Testing Library + jest-dom
- **CI/Deploy**: GitHub Actions (`.github/workflows/ci.yml`), Netlify (`netlify.toml`)

### Setup instructions

**Prerequisites**
- Node.js 20+ (20.19.0)

**Install**
```bash
npm install
```

**Run the app (dev server)**
```bash
npm run dev
```

**Other useful commands**
```bash
npm run lint
npm run test
npm run build
npm run preview
```

### Key decisions and trade-offs
- **Vitest for unit tests**: fast, Vite-native test runner. To reduce friction for devs used to Jest, `jest.fn()` is supported via a small compatibility alias (without adding Jest).
- **Component organization**: components live under `components/<ComponentName>/` and tests live next to them under `__tests__/*.spec.tsx` for scalable growth.
- **Simulated API/data**: the dashboard uses a local service layer to mock data loading/refreshing. This keeps the repo runnable without backend dependencies, at the cost of not exercising real network/auth flows.

### What I would improve with more time
- **Routing & URL state**: add React Router so the active tab is reflected in the URL and is shareable/bookmarkable.
- **More test coverage**:  add a small set of E2E tests (e.g., Playwright) for sidebar + core flows.
- **Performance**: code-splitting for heavy chart routes, memoization for expensive renders, and better loading skeletons for perceived performance.
- **Accessibility**: stronger keyboard navigation, focus management for the mobile drawer, and improved ARIA patterns.
- **Real data integration**: swap the mock service with real APIs, add error boundaries, retry/backoff, and caching.
