import { timeAgo } from './timeAgo';

describe('timeAgo', () => {
  test('returns "just now" for recent dates', () => {
    const now = new Date().toISOString();
    expect(timeAgo(now)).toBe('just now');
  });

  test('returns minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe('5 minutes ago');
  });

  test('returns hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe('3 hours ago');
  });

  test('returns days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe('2 days ago');
  });
});
