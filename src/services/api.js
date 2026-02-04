const API_URL = process.env.REACT_APP_API_URL;

export async function getPosts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function createPost(username, title, content) {
  const newPost = {
    id: nextId++,
    username,
    title,
    content,
    created_datetime: new Date().toISOString()
  };
  mockPosts.unshift(newPost);
  return newPost;
}

export async function updatePost(id, title, content) {

  const index = mockPosts.findIndex(post => post.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  mockPosts[index] = { ...mockPosts[index], title, content };
  return mockPosts[index];
}

export async function deletePost(id) {

  const index = mockPosts.findIndex(post => post.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  mockPosts.splice(index, 1);
  return true;
}
