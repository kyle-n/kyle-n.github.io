import { cleanup } from '@testing-library/svelte';
import { afterEach } from 'vitest';
import 'vitest-dom/extend-expect';

afterEach(() => {
  cleanup();
});
