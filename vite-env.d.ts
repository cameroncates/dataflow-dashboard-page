/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare global {
  /**
   * Jest-compat alias for Vitest's `vi` (runtime is assigned in `vitest.setup.ts`).
   * Allows `jest.fn()` etc without adding Jest to the repo.
   */
  var jest: typeof import('vitest')['vi'];
}

export {};

