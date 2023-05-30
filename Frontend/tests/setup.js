import {afterEach, expect} from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react';

//extends functionality from expect so we can use functions such as .toBeVisible etc.
expect.extend(matchers);

//cleans up jsdom after each test
afterEach(() => {
    cleanup()
})