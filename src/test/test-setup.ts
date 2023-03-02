import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

const mockParse = vi.fn();
export const mockPoints = [
  {
    lat: 63.10822,
    lon: 21.608385,
    ele: 17.3,
    time: '2016-11-17T16:47:51.000Z',
  },
  {
    lat: 63.10827,
    lon: 21.608235,
    ele: 17.3,
    time: '2016-11-17T16:47:53.000Z',
  },
  {
    lat: 63.108333,
    lon: 21.608047,
    ele: 17.3,
    time: '2016-11-17T16:47:56.000Z',
  },
];

vi.mock('~/config/browser-env', () => ({
  browserEnv: { NEXT_PUBLIC_SITE_ENV: 'test' },
}));

vi.mock('gpxparser', () => ({
  default: vi.fn(() => ({
    parse: mockParse,
    tracks: [{ points: mockPoints }],
  })),
}));

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
