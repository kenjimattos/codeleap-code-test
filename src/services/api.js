// ============================================
// MOCK MODE
// - Tests (npm test): always uses mock for deterministic results
// - Development (npm start): uses mock only if REACT_APP_USE_MOCK=true
// - Production (npm run build): never uses mock
// ============================================

const USE_MOCK = process.env.NODE_ENV === 'test' ||
  (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK === 'true');
const POSTS_PER_PAGE = 10;

// Mock data - 35 posts para testar paginação
const mockPosts = [
  { id: 1, username: 'alice', created_datetime: '2024-02-04T10:00:00Z', title: 'Welcome to CodeLeap!', content: 'This is my first post on the platform. Excited to be here!' },
  { id: 2, username: 'bob', created_datetime: '2024-02-04T09:30:00Z', title: 'React Best Practices', content: 'Always use functional components and hooks. Class components are outdated.' },
  { id: 3, username: 'charlie', created_datetime: '2024-02-04T09:00:00Z', title: 'CSS Modules vs Styled Components', content: 'I prefer CSS Modules for simplicity, but styled-components has its advantages.' },
  { id: 4, username: 'diana', created_datetime: '2024-02-04T08:30:00Z', title: 'JavaScript Tips', content: 'Use optional chaining (?.) to avoid undefined errors. Its a game changer!' },
  { id: 5, username: 'eve', created_datetime: '2024-02-04T08:00:00Z', title: 'API Design Patterns', content: 'RESTful APIs should use proper HTTP methods and status codes.' },
  { id: 6, username: 'frank', created_datetime: '2024-02-04T07:30:00Z', title: 'Testing with Jest', content: 'Write tests for your components. It saves time in the long run.' },
  { id: 7, username: 'grace', created_datetime: '2024-02-04T07:00:00Z', title: 'Git Workflow', content: 'Always create feature branches and make small, atomic commits.' },
  { id: 8, username: 'henry', created_datetime: '2024-02-04T06:30:00Z', title: 'TypeScript Advantages', content: 'Type safety prevents bugs at compile time. Highly recommended!' },
  { id: 9, username: 'iris', created_datetime: '2024-02-04T06:00:00Z', title: 'Code Review Tips', content: 'Be constructive, not critical. Focus on the code, not the person.' },
  { id: 10, username: 'jack', created_datetime: '2024-02-04T05:30:00Z', title: 'Performance Optimization', content: 'Use React.memo and useMemo wisely to prevent unnecessary re-renders.' },
  { id: 11, username: 'karen', created_datetime: '2024-02-04T05:00:00Z', title: 'Clean Code Principles', content: 'Functions should do one thing and do it well. Keep them small.' },
  { id: 12, username: 'leo', created_datetime: '2024-02-04T04:30:00Z', title: 'Debugging Strategies', content: 'Console.log is fine, but learn to use the browser DevTools properly.' },
  { id: 13, username: 'maria', created_datetime: '2024-02-04T04:00:00Z', title: 'State Management', content: 'Context API is enough for most apps. You might not need Redux.' },
  { id: 14, username: 'nathan', created_datetime: '2024-02-04T03:30:00Z', title: 'Accessibility Matters', content: 'Use semantic HTML and proper ARIA attributes. Everyone deserves access.' },
  { id: 15, username: 'olivia', created_datetime: '2024-02-04T03:00:00Z', title: 'Mobile First Design', content: 'Start with mobile layouts and progressively enhance for larger screens.' },
  { id: 16, username: 'peter', created_datetime: '2024-02-04T02:30:00Z', title: 'Error Handling', content: 'Always handle errors gracefully. Show user-friendly messages.' },
  { id: 17, username: 'quinn', created_datetime: '2024-02-04T02:00:00Z', title: 'Documentation', content: 'Write documentation as you code. Your future self will thank you.' },
  { id: 18, username: 'rachel', created_datetime: '2024-02-04T01:30:00Z', title: 'Code Organization', content: 'Group files by feature, not by type. It scales better.' },
  { id: 19, username: 'steve', created_datetime: '2024-02-04T01:00:00Z', title: 'Security Basics', content: 'Never trust user input. Always validate and sanitize.' },
  { id: 20, username: 'tina', created_datetime: '2024-02-04T00:30:00Z', title: 'Async/Await', content: 'Prefer async/await over .then() chains. Much more readable.' },
  { id: 21, username: 'uma', created_datetime: '2024-02-03T23:30:00Z', title: 'Custom Hooks', content: 'Extract reusable logic into custom hooks. Keep components clean.' },
  { id: 22, username: 'victor', created_datetime: '2024-02-03T23:00:00Z', title: 'Environment Variables', content: 'Never commit secrets to git. Use .env files properly.' },
  { id: 23, username: 'wendy', created_datetime: '2024-02-03T22:30:00Z', title: 'Lazy Loading', content: 'Use React.lazy and Suspense for code splitting. Improves initial load.' },
  { id: 24, username: 'xavier', created_datetime: '2024-02-03T22:00:00Z', title: 'Form Handling', content: 'Consider using react-hook-form for complex forms. Less re-renders.' },
  { id: 25, username: 'yara', created_datetime: '2024-02-03T21:30:00Z', title: 'HTTP Status Codes', content: '200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error.' },
  { id: 26, username: 'zack', created_datetime: '2024-02-03T21:00:00Z', title: 'Component Composition', content: 'Favor composition over inheritance. Use children prop effectively.' },
  { id: 27, username: 'alice', created_datetime: '2024-02-03T20:30:00Z', title: 'Naming Conventions', content: 'Use descriptive names. handleClick is better than hc or onClick1.' },
  { id: 28, username: 'bob', created_datetime: '2024-02-03T20:00:00Z', title: 'ESLint Config', content: 'Set up ESLint with Prettier. Consistent code style across the team.' },
  { id: 29, username: 'charlie', created_datetime: '2024-02-03T19:30:00Z', title: 'Folder Structure', content: 'Keep it simple. Complexity should grow with the project.' },
  { id: 30, username: 'diana', created_datetime: '2024-02-03T19:00:00Z', title: 'useEffect Cleanup', content: 'Always return a cleanup function to prevent memory leaks.' },
  { id: 31, username: 'eve', created_datetime: '2024-02-03T18:30:00Z', title: 'PropTypes vs TypeScript', content: 'TypeScript is better for large projects. PropTypes work for small ones.' },
  { id: 32, username: 'frank', created_datetime: '2024-02-03T18:00:00Z', title: 'localStorage Tips', content: 'Remember to wrap in try/catch. It can throw in private browsing.' },
  { id: 33, username: 'grace', created_datetime: '2024-02-03T17:30:00Z', title: 'Key Prop in Lists', content: 'Always use unique IDs for keys, not array indices. Prevents bugs.' },
  { id: 34, username: 'henry', created_datetime: '2024-02-03T17:00:00Z', title: 'Conditional Rendering', content: 'Use && for simple conditions, ternary for if-else, early return for complex.' },
  { id: 35, username: 'iris', created_datetime: '2024-02-03T16:30:00Z', title: 'Last Post!', content: 'You reached the end of the mock data. Pagination is working correctly!' },
];

// Simula delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para simular paginação
function getMockPaginatedPosts(offset = 0) {
  const results = mockPosts.slice(offset, offset + POSTS_PER_PAGE);
  const nextOffset = offset + POSTS_PER_PAGE;
  const hasNext = nextOffset < mockPosts.length;

  return {
    count: mockPosts.length,
    next: hasNext ? `mock://page?offset=${nextOffset}` : null,
    previous: offset > 0 ? `mock://page?offset=${Math.max(0, offset - POSTS_PER_PAGE)}` : null,
    results
  };
}

// ============================================
// API REAL (descomentada quando USE_MOCK = false)
// ============================================

const API_URL = process.env.REACT_APP_API_URL;

if (!USE_MOCK && !API_URL) {
  console.error('REACT_APP_API_URL is not configured. Please check your .env file.');
}

export async function getPosts(url = API_URL, signal = null) {
  if (USE_MOCK) {
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

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function createPost(username, title, content) {
  if (USE_MOCK) {
    await delay(500);
    const newPost = {
      id: Date.now(),
      username,
      title,
      content,
      created_datetime: new Date().toISOString()
    };
    mockPosts.unshift(newPost);
    console.log('[MOCK] Created post:', newPost);
    return newPost;
  }

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
    await delay(500);
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], title, content };
      console.log('[MOCK] Updated post:', mockPosts[index]);
      return mockPosts[index];
    }
    throw new Error('Post not found');
  }

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
    await delay(500);
    const index = mockPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = mockPosts.splice(index, 1);
      console.log('[MOCK] Deleted post:', deleted[0]);
      return true;
    }
    throw new Error('Post not found');
  }

  const response = await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
  return true;
}
