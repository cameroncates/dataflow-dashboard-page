import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Jest-compat alias so developers can use `jest.fn()` etc.
// This is still Vitest under the hood.
(globalThis as unknown as { jest: typeof vi }).jest = vi;

afterEach(() => {
  cleanup();
});

