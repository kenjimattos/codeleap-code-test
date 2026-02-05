import { getPosts, createPost, updatePost, deletePost } from './api';

describe('getPosts', () => {
  test('returns first page with 10 posts', async () => {
    const data = await getPosts();
    expect(data.results).toHaveLength(10);
    expect(data.count).toBe(35);
    expect(data.next).not.toBeNull();
    expect(data.previous).toBeNull();
  });

  test('returns second page when given next URL', async () => {
    const page1 = await getPosts();
    const page2 = await getPosts(page1.next);
    expect(page2.results[0].id).toBe(11);
    expect(page2.previous).not.toBeNull();
  });

  test('returns null next on last page', async () => {
    let data = await getPosts();
    while (data.next) {
      data = await getPosts(data.next);
    }
    expect(data.next).toBeNull();
    expect(data.results.length).toBeLessThanOrEqual(10);
  });

  test('respects abort signal', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(getPosts(undefined, controller.signal)).rejects.toThrow('Aborted');
  });
});

describe('createPost', () => {
  test('creates post with correct data', async () => {
    const post = await createPost('testuser', 'Test Title', 'Test content');
    expect(post.username).toBe('testuser');
    expect(post.title).toBe('Test Title');
    expect(post.content).toBe('Test content');
    expect(post.id).toBeDefined();
    expect(post.created_datetime).toBeDefined();
  });
});

describe('updatePost', () => {
  test('updates post title and content', async () => {
    const created = await createPost('user', 'Original', 'Content');
    const updated = await updatePost(created.id, 'Updated Title', 'Updated content');
    expect(updated.title).toBe('Updated Title');
    expect(updated.content).toBe('Updated content');
  });

  test('throws error for non-existent post', async () => {
    await expect(updatePost(999999, 'Title', 'Content')).rejects.toThrow('Post not found');
  });
});

describe('deletePost', () => {
  test('deletes post successfully', async () => {
    const created = await createPost('user', 'To Delete', 'Content');
    const result = await deletePost(created.id);
    expect(result).toBe(true);
  });

  test('throws error for non-existent post', async () => {
    await expect(deletePost(999999)).rejects.toThrow('Post not found');
  });
});
