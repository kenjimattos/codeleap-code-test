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

export async function getPosts() {
  return {
    results: [...mockPosts].sort((a, b) =>
      new Date(b.created_datetime) - new Date(a.created_datetime)
    )
  };
}

export async function createPost(username, title, content) {
  const newPost = {
    id: Date.now(),
    username,
    title,
    content,
    created_datetime: new Date().toISOString()
  };
  mockPosts.unshift(newPost);
  return newPost;
}

