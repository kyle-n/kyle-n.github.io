import { act } from '@testing-library/svelte';

export async function whenStable() {
  await act(async () => await new Promise(resolve => setTimeout(resolve, 1)));
}
