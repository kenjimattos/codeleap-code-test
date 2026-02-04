const API_URL = process.env.REACT_APP_API_URL;

export async function getPosts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function createPost(username, title, content) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, title, content }),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
}

export async function updatePost(id, title, content) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return true;
}
