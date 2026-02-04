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

#### Step 24: Accessibility
- [ ] **Modal accessibility:** Add `role="dialog"`, `aria-modal="true"`, focus trap, and Escape key handler to `Modal.jsx`
- [ ] **Input labels:** Add proper `<label>` associations in `CommentSection.jsx`
- [ ] **Focus states:** Add visible `:focus` styles to buttons in `Button.module.css`

#### Step 25: Testing (Optional)
- [ ] Unit tests for `usePosts`, `useLikes`, `useComments` hooks
- [ ] Unit tests for `timeAgo` utility
- [ ] Component tests for critical UI (Modal, Button)

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
