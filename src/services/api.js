// ============================================
// MOCK MODE
// - Tests (npm test): always uses mock for deterministic results
// - Development (npm start): uses mock only if REACT_APP_USE_MOCK=true
// - Production (npm run build): never uses mock
// ============================================

const USE_MOCK = process.env.NODE_ENV === 'test' ||
  (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK === 'true');

// Mock data is only imported when needed (not included in production bundle)
let mockModule = null;
let mockIdCounter = 1000; // Counter for unique mock IDs

async function getMockModule() {
  if (!mockModule) {
    mockModule = await import('./mockData');
  }
  return mockModule;
}

function generateMockId() {
  return ++mockIdCounter;
}

// ============================================
// REAL API
// ============================================

const API_URL = process.env.REACT_APP_API_URL;

// Custom error for configuration issues
export class ConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

function validateApiUrl() {
  if (!API_URL) {
    throw new ConfigurationError('API URL not configured. Please check your environment settings.');
  }
}

export async function getPosts(url = API_URL, signal = null) {
  if (USE_MOCK) {
    const { delay, getMockPaginatedPosts } = await getMockModule();
    await delay(800); // Simulates network latency

    // Check if request was aborted
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    // Parse offset from mock URL
    let offset = 0;
    if (url && url.startsWith('mock://')) {
      const params = new URL(url).searchParams;
      offset = parseInt(params.get('offset') || '0', 10);
    }

    console.log(`[MOCK] Fetching posts at offset ${offset}`);
    return getMockPaginatedPosts(offset);
  }

  // Validate URL before making request
  if (!url) {
    validateApiUrl();
  }

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function createPost(username, title, content) {
  if (USE_MOCK) {
    const { delay, mockPosts } = await getMockModule();
    await delay(500);
    const newPost = {
      id: generateMockId(),
      username,
      title,
      content,
      created_datetime: new Date().toISOString()
    };
    mockPosts.unshift(newPost);
    console.log('[MOCK] Created post:', newPost);
    return newPost;
  }

  validateApiUrl();
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
  if (USE_MOCK) {
    const { delay, mockPosts } = await getMockModule();
    await delay(500);
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], title, content };
      console.log('[MOCK] Updated post:', mockPosts[index]);
      return mockPosts[index];
    }
    throw new Error('Post not found');
  }

  validateApiUrl();
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
  if (USE_MOCK) {
    const { delay, mockPosts } = await getMockModule();
    await delay(500);
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = mockPosts.splice(index, 1);
      console.log('[MOCK] Deleted post:', deleted[0]);
      return true;
    }
    throw new Error('Post not found');
  }

  validateApiUrl();
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return true;
}
