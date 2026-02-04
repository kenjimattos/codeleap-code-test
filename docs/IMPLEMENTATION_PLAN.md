# CodeLeap Network - Implementation Plan

## Overview

A simple social posting application where users can create, read, update, and delete posts.

**API Endpoint:** `https://dev.codeleap.co.uk/careers/`

**Data Structure:**
```json
{
  "id": number,
  "username": "string",
  "created_datetime": "datetime",
  "title": "string",
  "content": "string"
}
```

---

## Technology Decision

**Pure React with CSS Modules**

Reasons:
- Material UI adds unnecessary bundle size for this simple UI
- The design is minimal and custom - no complex components needed
- CSS Modules provide scoped styling without extra dependencies
- Clean, readable code is the priority for this technical assessment
- Easier to demonstrate React fundamentals without library abstractions

**Dependencies:**
- `react-router-dom` - For routing between Login and Main pages

---

## Project Structure

```
src/
├── components/
│   ├── common/                 # Reusable UI components
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── TextInput/
│   └── posts/                  # Post-related components
│       ├── Header/
│       ├── CreatePost/
│       ├── PostCard/
│       ├── PostList/
│       ├── EditModal/
│       └── DeleteModal/
├── pages/
│   ├── Login/
│   └── Main/
├── services/
│   └── api.js                  # Mock API (to be replaced with real API)
├── hooks/
│   └── usePosts.js
├── context/
│   └── UserContext.jsx
├── utils/
│   └── timeAgo.js
├── App.js
├── App.css
├── index.js
└── index.css                   # Global styles and CSS variables
```

---

## Implementation Progress

### Phase 1: Frontend Development (COMPLETED)

#### Step 1: Base Setup & Global Styles ✅
- [x] Set up global CSS variables (colors, fonts, spacing, borders)
- [x] Configure Roboto font
- [x] Create design tokens system

#### Step 2: Reusable UI Components ✅
- [x] **Button** - Primary, secondary, danger, success variants with disabled state
- [x] **TextInput** - Text input and textarea with placeholder styling
- [x] **Modal** - Overlay with centered content box

#### Step 3: User Context & Login Page ✅
- [x] Create UserContext to store username
- [x] Build Login page with username input
- [x] Store username in localStorage for persistence
- [x] Redirect to main page after login

#### Step 4: Mock API Service ✅
- [x] Mock data
- [x] GET, POST, PATCH, DELETE operations
- [x] Ready to be replaced with real API calls

#### Step 5: Posts Hook ✅
- [x] usePosts hook for data management
- [x] Handle loading and error states
- [x] Implement create, update, delete operations

#### Step 6: Header Component ✅
- [x] Blue background (#7695EC)
- [x] "CodeLeap Network" title

#### Step 7: CreatePost Component ✅
- [x] Card with "What's on your mind?" title
- [x] Title input field
- [x] Content textarea
- [x] Create button (disabled when fields empty)

#### Step 8: PostCard Component ✅
- [x] Blue header with post title
- [x] Delete/Edit icons (visible only for own posts)
- [x] Username and relative time display
- [x] Post content

#### Step 9: PostList Component ✅
- [x] Render list of PostCard components
- [x] Loading state
- [x] Empty state

#### Step 10: Edit Modal ✅
- [x] Modal with "Edit item" title
- [x] Pre-filled title and content fields
- [x] Cancel and Save buttons

#### Step 11: Delete Modal ✅
- [x] Modal with confirmation message
- [x] Cancel and Delete buttons

#### Step 12: Main Page Assembly ✅
- [x] Combine Header, CreatePost, PostList
- [x] Wire up modals for edit/delete
- [x] Handle all CRUD operations

#### Step 13: App Routing ✅
- [x] Set up routing (Login → Main)
- [x] Protected route (redirect to login if no username)
- [x] Public route (redirect to main if logged in)

---

### Phase 2: Polish & Integration (COMPLETED)

#### Step 14: Responsive Design ✅
- [x] Mobile breakpoints (max-width: 768px)
- [x] Fluid container widths
- [x] Touch-friendly button sizes

#### Step 15: Real API Integration ✅
- [x] Replace mock API with real endpoint
- [x] GET, POST, PATCH, DELETE operations

---

### Phase 3: Social Features

> **Note:** These features require local state management since the API doesn't support likes/comments.

#### Step 16: Like Button
- [x] Add heart icon to PostCard
- [x] Toggle like state on click
- [x] Display like count
- [x] Store likes in localStorage (per post ID)

#### Step 17: Comments Section
- [x] Add comments area below post content
- [x] Comment input field with submit button
- [x] Display list of comments (username + text)
- [x] Store comments in localStorage (per post ID)

---

### Phase 4: Bug Fixes & Improvements (COMPLETED)

#### Step 18: Critical Fixes ✅
- [x] **Fix posts fetching:** `usePosts.js` assumes paginated response with `results` property, but API returns array directly. Change `setPosts(data.results)` to `setPosts(data)`
- [x] **Validate API URL:** Add validation for `REACT_APP_API_URL` in `api.js` - show friendly error if undefined

#### Step 19: Error Handling & UX ✅
- [x] **Display errors in UI:** Add error banner in `Main.jsx` to show `error` state from `usePosts`
- [x] **localStorage try/catch:** Wrap localStorage operations in `useLikes.js`, `useComments.js`, and `UserContext.jsx` with try/catch and fallback

#### Step 20: Data Integrity ✅
- [x] **Unique comment IDs:** Replace `Date.now()` with more robust ID generation in `useComments.js`
- [x] **Orphan cleanup:** Clean up comments/likes when a post is deleted

#### Step 21: Request Management ✅
- [x] **Abort controller:** Add request cancellation in `usePosts.js` to prevent setState on unmounted components

#### Step 22: Input Validation ✅
- [x] **Field length limits:** Add max length validation for title/content in `CreatePost.jsx`, `EditModal.jsx`, and `CommentSection.jsx`

#### Step 23: Pagination ✅
- [x] **Update `api.js`:** Add optional `url` parameter to `getPosts()` to support fetching next pages
- [x] **Update `usePosts.js`:**
  - Add `nextUrl` state to track next page URL
  - Add `hasMore` computed from `nextUrl !== null`
  - Add `loadMore()` function to fetch and append next page
  - Add `loadingMore` state for "Load more" button feedback
- [x] **Update `PostList.jsx`:** Add "Load more" button when `hasMore` is true
- [x] **Update `PostList.module.css`:** Style the "Load more" button

> **Technical Note:** The CodeLeap API uses offset/limit pagination (Django REST Framework default). This approach has O(n) performance degradation at scale because the database must scan all preceding records to reach the offset. For production systems with millions of records, cursor-based pagination would be preferable as it provides O(1) performance by using indexed lookups. However, since we don't control the backend, we follow the `next` URL provided by the API response.

---

### Phase 5: Accessibility & Testing (COMPLETED)

#### Step 24: Accessibility ✅
- [x] **Modal accessibility:** Add `role="dialog"`, `aria-modal="true"`, focus trap, and Escape key handler to `Modal.jsx`
- [x] **Input labels:** Add proper `<label>` associations in `CommentSection.jsx`
- [x] **Focus states:** Add visible `:focus` styles to buttons in `Button.module.css`

#### Step 25: Testing

> **Note:** The mock mode in `api.js` provides 35 deterministic posts with simulated network latency, enabling reliable automated tests without network dependency.

##### 25.1 API & Pagination Tests
```javascript
// src/services/api.test.js
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
});

describe('deletePost', () => {
  test('deletes post successfully', async () => {
    const created = await createPost('user', 'To Delete', 'Content');
    const result = await deletePost(created.id);
    expect(result).toBe(true);
  });
});
```

##### 25.2 usePosts Hook Tests
```javascript
// src/hooks/usePosts.test.js
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
      await result.current.createPost('user', 'New Post', 'Content');
    });

    expect(result.current.posts[0].title).toBe('New Post');
  });
});
```

##### 25.3 useLikes Hook Tests
```javascript
// src/hooks/useLikes.test.js
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
```

##### 25.4 useComments Hook Tests
```javascript
// src/hooks/useComments.test.js
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
```

##### 25.5 timeAgo Utility Tests
```javascript
// src/utils/timeAgo.test.js
import { timeAgo } from './timeAgo';

describe('timeAgo', () => {
  test('returns "just now" for recent dates', () => {
    const now = new Date().toISOString();
    expect(timeAgo(now)).toBe('just now');
  });

  test('returns minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe('5 minutes ago');
  });

  test('returns hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe('3 hours ago');
  });

  test('returns days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(date)).toBe('2 days ago');
  });
});
```

##### 25.6 Component Tests
```javascript
// src/components/common/Button/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText('Delete')).toHaveClass('danger');
  });
});
```

##### Test Setup ✅
- [x] Install testing dependencies: `npm install --save-dev @testing-library/react @testing-library/jest-dom`
- [x] Configure Jest in `package.json` or `jest.config.js`
- [x] Create test files following the examples above

---

## Design Tokens

```css
/* Colors */
--color-primary: #7695EC;
--color-danger: #FF5151;
--color-success: #47B960;
--color-text: #000000;
--color-text-muted: #777777;
--color-text-white: #FFFFFF;
--color-border: #999999;
--color-input-border: #777777;
--color-placeholder: #CCCCCC;
--color-background: #FFFFFF;
--color-page-background: #DDDDDD;

/* Typography */
--font-family: 'Roboto', sans-serif;
--font-weight-regular: 400;
--font-weight-bold: 700;
--font-size-title: 22px;
--font-size-body: 18px;
--font-size-label: 16px;
--font-size-small: 14px;

/* Spacing */
--spacing-xxs: 4px;
--spacing-xs: 8px;
--spacing-sm: 12px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-xxl: 48px;

/* Borders */
--border-width: 1px;
--border-radius-card: 16px;
--border-radius-button: 8px;
--border-radius-input: 8px;
```

---

## Notes

- Username stored in localStorage (simple persistence)
- Edit/Delete icons only shown when `post.username === currentUser`
- Button disabled state: reduced opacity + not-allowed cursor
- Time display: relative format ("25 minutes ago")
- No external UI library - pure CSS for clean, readable code
- All CSS values use design tokens for consistency
- Components organized by domain (common, posts)
