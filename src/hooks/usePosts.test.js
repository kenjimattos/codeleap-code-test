import { renderHook, act, waitFor } from '@testing-library/react';
import { usePosts } from './usePosts';

describe('usePosts', () => {
  test('loads initial posts', async () => {
    const { result } = renderHook(() => usePosts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toHaveLength(10);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.error).toBeNull();
  });

  test('loads more posts on loadMore', async () => {
    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.posts).toHaveLength(20);
  });

  test('creates new post at top of list', async () => {
    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.createPost('testuser', 'New Post', 'Content');
    });

    expect(result.current.posts[0].title).toBe('New Post');
    expect(result.current.posts[0].username).toBe('testuser');
  });

  test('updates existing post', async () => {
    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const postToUpdate = result.current.posts[0];

    await act(async () => {
      await result.current.updatePost(postToUpdate.id, 'Updated Title', 'Updated Content');
    });

    // After refetch, find the updated post
    const updatedPost = result.current.posts.find(p => p.id === postToUpdate.id);
    expect(updatedPost.title).toBe('Updated Title');
  });

  test('deletes post from list', async () => {
    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Create a post first to delete
    await act(async () => {
      await result.current.createPost('testuser', 'To Delete', 'Content');
    });

    const postToDelete = result.current.posts.find(p => p.title === 'To Delete');

    await act(async () => {
      await result.current.deletePost(postToDelete.id);
    });

    // After refetch, post should not exist
    const deletedPost = result.current.posts.find(p => p.id === postToDelete.id);
    expect(deletedPost).toBeUndefined();
  });

  test('refetch reloads posts', async () => {
    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const initialFirstPost = result.current.posts[0];

    // Create a new post
    await act(async () => {
      await result.current.createPost('testuser', 'Refetch Test', 'Content');
    });

    // First post should now be different
    expect(result.current.posts[0].title).toBe('Refetch Test');
    expect(result.current.posts[0].id).not.toBe(initialFirstPost.id);
  });
});
