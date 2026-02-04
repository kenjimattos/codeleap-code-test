import { renderHook, act } from '@testing-library/react';
import { useComments } from './useComments';

describe('useComments', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('addComment adds comment to post', () => {
    const { result } = renderHook(() => useComments());

    act(() => {
      result.current.addComment(1, 'user', 'Test comment');
    });

    const comments = result.current.getComments(1);
    expect(comments).toHaveLength(1);
    expect(comments[0].text).toBe('Test comment');
    expect(comments[0].username).toBe('user');
  });

  test('generates unique IDs for comments', () => {
    const { result } = renderHook(() => useComments());

    act(() => {
      result.current.addComment(1, 'user', 'Comment 1');
      result.current.addComment(1, 'user', 'Comment 2');
    });

    const comments = result.current.getComments(1);
    expect(comments[0].id).not.toBe(comments[1].id);
  });

  test('removeComments cleans up post data', () => {
    const { result } = renderHook(() => useComments());

    act(() => {
      result.current.addComment(1, 'user', 'Comment');
      result.current.removeComments(1);
    });

    expect(result.current.getComments(1)).toHaveLength(0);
  });
});
