# CodeLeap Network

**Technical Assessment** - This project was developed by **Kenji Mattos Kinoshita** as part of a technical evaluation for CodeLeap.

CodeLeap Network is a simple social posting application built with React where users can create, read, update, and delete posts.

### The Journey

What started as a straightforward technical assessment evolved into something much more ambitious. The initial proposition was simple: build a basic CRUD application following the provided requirements. However, powered by generative AI collaboration, the project quickly scaled beyond its original scope. Through iterative phases of development, we added social features (likes and comments), comprehensive accessibility support, a full test suite, performance optimizations, and professional-grade code quality tooling. This journey demonstrates how AI-assisted development can transform a simple exercise into a production-ready application while maintaining clean architecture and best practices.

## Features

### Core Features
- User authentication with username (persisted in localStorage)
- Create new posts with title and content
- View all posts from the community
- Edit your own posts
- Delete your own posts with confirmation
- Relative time display (e.g., "5 minutes ago")
- Pagination with "Load more" button

### Social Features
- **Like posts** - Toggle likes on any post
- **Comment on posts** - Add comments with username and timestamp

> **Note:** Likes and comments are stored in localStorage because the CodeLeap API doesn't support these features. This allows demonstrating the functionality without backend changes. Data persists per browser but is not shared across users/devices.

### UX & Accessibility
- Mobile responsive design with touch-friendly targets
- Error banner for API failures
- Accessible modal with focus trap and Escape key support
- Screen reader friendly labels
- Visible focus states for keyboard navigation

## Tech Stack

- **React 19** - UI library
- **React Router** - Client-side routing
- **CSS Modules** - Scoped component styling
- **Lucide React** - Icon library
- **Jest + React Testing Library** - Unit testing

## Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── TextInput/
│   └── posts/               # Post-related components
│       ├── Header/
│       ├── CreatePost/
│       ├── PostCard/
│       ├── PostList/
│       ├── EditModal/
│       ├── DeleteModal/
│       └── CommentSection/
├── pages/
│   ├── Login/
│   └── Main/
├── services/
│   ├── api.js               # API service with mock mode
│   └── mockData.js          # Mock data (dev/test only)
├── hooks/
│   ├── usePosts.js          # Posts data management
│   ├── useLikes.js          # Likes state (localStorage)
│   └── useComments.js       # Comments state (localStorage)
├── context/
│   └── UserContext.jsx      # User authentication context
├── utils/
│   ├── timeAgo.js           # Time formatting utility
│   └── errorMessages.js     # Error message normalization
├── App.js
├── setupTests.js            # Jest configuration
└── index.css                # Global styles & CSS variables
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeleap-code-test
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode |
| `npm test` | Launch the test runner in watch mode |
| `npm test -- --coverage` | Run tests with coverage report |
| `npm run build` | Build the app for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Run ESLint and fix auto-fixable issues |
| `npm run format` | Format code with Prettier |

## Testing

The project includes unit tests for hooks, utilities, and components.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm test -- --coverage --watchAll=false
```

### Test Coverage

**37 tests** across 7 test files:

| File | Tests | Description |
|------|-------|-------------|
| `api.test.js` | 7 | CRUD operations, pagination, abort signal |
| `usePosts.test.js` | 6 | Hook lifecycle, loading, mutations |
| `useLikes.test.js` | 3 | Like toggle, cleanup |
| `useComments.test.js` | 3 | Comment add, unique IDs, cleanup |
| `timeAgo.test.js` | 4 | Time formatting |
| `errorMessages.test.js` | 9 | Error normalization |
| `Button.test.js` | 4 | Component rendering, variants |

### Mock Mode

The API service includes a mock mode for testing and development:

```javascript
// In api.js
// - Tests (npm test): always uses mock for deterministic results
// - Development (npm start): uses mock only if REACT_APP_USE_MOCK=true
// - Production (npm run build): never uses mock
```

To enable mock mode in development:
```bash
# Add to .env
REACT_APP_USE_MOCK=true
```

Mock mode provides 35 deterministic posts with simulated pagination, useful for:
- Testing pagination (4 pages of 10 posts)
- Testing CRUD operations without network
- Consistent UI development

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Base URL for the CodeLeap API | Yes |
| `REACT_APP_USE_MOCK` | Enable mock mode in development | No |

Copy `.env.example` to `.env` and configure as needed.

## API

The application connects to the CodeLeap careers API.

**Endpoint:** Configured via `REACT_APP_API_URL`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/?limit=10&offset=0` | Fetch posts (paginated) |
| POST | `/` | Create a new post |
| PATCH | `/{id}/` | Update a post |
| DELETE | `/{id}/` | Delete a post |

**Data Structure:**
```json
{
  "count": 100,
  "next": "https://api.url/?limit=10&offset=10",
  "previous": null,
  "results": [
    {
      "id": "number",
      "username": "string",
      "created_datetime": "datetime",
      "title": "string",
      "content": "string"
    }
  ]
}
```

## Design Decisions

- **Pure React with CSS Modules**: Chosen over UI libraries like Material UI to keep the bundle size small and demonstrate React fundamentals clearly.
- **CSS Variables**: Used for consistent design tokens (colors, spacing, typography).
- **Component Organization**: Split into `common` (reusable) and `posts` (domain-specific) directories.
- **localStorage for social features**: Likes and comments are stored locally since the API doesn't support these features. This demonstrates the functionality while acknowledging backend limitations.
- **AbortController**: Used to prevent memory leaks and state updates on unmounted components.
- **Accessible Modal**: Implements ARIA attributes, focus trap, and keyboard navigation.

### Implementation Phases

1. **Phase 1-2**: Core CRUD functionality and API integration
2. **Phase 3**: Social features (likes, comments)
3. **Phase 4**: Bug fixes, error handling, pagination
4. **Phase 5**: Accessibility and testing
5. **Phase 6**: Technical debt fixes and quality improvements
6. **Phase 7**: Performance optimizations and code quality tooling

See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for detailed implementation history.

## License

This project was created as part of a technical assessment for CodeLeap.
