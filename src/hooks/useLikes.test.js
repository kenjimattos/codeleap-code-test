import { renderHook, act } from '@testing-library/react';
import { useLikes } from './useLikes';

describe('useLikes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('toggleLike adds like', () => {
    const { result } = renderHook(() => useLikes('testuser'));

    act(() => {
      result.current.toggleLike(1);
    });

    expect(result.current.isLiked(1)).toBe(true);
    expect(result.current.getLikes(1)).toBe(1);
  });

  test('toggleLike removes like on second call', () => {
    const { result } = renderHook(() => useLikes('testuser'));

    act(() => {
      result.current.toggleLike(1);
      result.current.toggleLike(1);
    });

    expect(result.current.isLiked(1)).toBe(false);
    expect(result.current.getLikes(1)).toBe(0);
  });

  test('removeLikes cleans up post data', () => {
    const { result } = renderHook(() => useLikes('testuser'));

    act(() => {
      result.current.toggleLike(1);
      result.current.removeLikes(1);
    });

    expect(result.current.getLikes(1)).toBe(0);
  });
});
