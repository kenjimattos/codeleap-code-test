// Mock data for frontend development
// TODO: Replace with real API calls later

let mockPosts = [
  {
    id: 1,
    username: 'Victor',
    created_datetime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    title: 'My First Post at CodeLeap Network!',
    content: 'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.\n\nDuis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.'
  },
  {
    id: 2,
    username: 'Vini',
    created_datetime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    title: 'My Second Post at CodeLeap Network!',
    content: 'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.\n\nDuis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.'
  }
];

let nextId = 3;

export async function getPosts() {
  return {
    results: [...mockPosts].sort((a, b) =>
      new Date(b.created_datetime) - new Date(a.created_datetime)
    )
  };
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
