import { normalizeError } from './errorMessages';

describe('normalizeError', () => {
  test('handles null/undefined', () => {
    expect(normalizeError(null)).toBe('An unexpected error occurred. Please try again.');
    expect(normalizeError(undefined)).toBe('An unexpected error occurred. Please try again.');
  });

  test('normalizes network errors', () => {
    expect(normalizeError('Failed to fetch')).toBe('Unable to connect. Please check your internet connection.');
    expect(normalizeError(new Error('NetworkError'))).toBe('Unable to connect. Please check your internet connection.');
  });

  test('normalizes API errors', () => {
    expect(normalizeError('Failed to fetch posts')).toBe('Unable to load posts. Please try again.');
    expect(normalizeError('Failed to create post')).toBe('Unable to create post. Please try again.');
    expect(normalizeError('Failed to update post')).toBe('Unable to update post. Please try again.');
    expect(normalizeError('Failed to delete post')).toBe('Unable to delete post. Please try again.');
  });

  test('normalizes configuration errors', () => {
    const configError = new Error('API URL not configured');
    configError.name = 'ConfigurationError';
    expect(normalizeError(configError)).toBe('API URL not configured. Please check your environment settings.');
  });

  test('normalizes abort errors', () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    expect(normalizeError(abortError)).toBe('Request was cancelled.');
  });

  test('passes through user-friendly messages', () => {
    expect(normalizeError('This post no longer exists.')).toBe('This post no longer exists.');
    expect(normalizeError('Please try again later.')).toBe('Please try again later.');
  });

  test('handles timeout errors', () => {
    expect(normalizeError('Request timeout')).toBe('Request timed out. Please try again.');
  });

  test('provides fallback for unknown technical errors', () => {
    expect(normalizeError('undefined is not a function')).toBe('Something went wrong. Please try again.');
    expect(normalizeError('null pointer exception')).toBe('Something went wrong. Please try again.');
  });
});
