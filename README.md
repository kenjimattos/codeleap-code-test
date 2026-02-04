# CodeLeap Network

A simple social posting application built with React where users can create, read, update, and delete posts.

## Features

- User authentication with username (persisted in localStorage)
- Create new posts with title and content
- View all posts from the community
- Edit your own posts
- Delete your own posts with confirmation
- Relative time display (e.g., "5 minutes ago")
- Mobile responsive design with touch-friendly targets

## Tech Stack

- **React** - UI library
- **React Router** - Client-side routing
- **CSS Modules** - Scoped component styling
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── TextInput/
│   └── posts/            # Post-related components
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
│   └── api.js            # API service
├── hooks/
│   └── usePosts.js       # Posts data management
├── context/
│   └── UserContext.jsx   # User authentication context
├── utils/
│   └── timeAgo.js        # Time formatting utility
├── App.js
└── index.css             # Global styles & CSS variables
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

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode |
| `npm test` | Launch the test runner |
| `npm run build` | Build the app for production |

## API

The application connects to the CodeLeap careers API.

**Endpoint:** `https://dev.codeleap.co.uk/careers/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Fetch all posts |
| POST | `/` | Create a new post |
| PATCH | `/{id}/` | Update a post |
| DELETE | `/{id}/` | Delete a post |

**Data Structure:**
```json
{
  "id": "number",
  "username": "string",
  "created_datetime": "datetime",
  "title": "string",
  "content": "string"
}
```

## Design Decisions

- **Pure React with CSS Modules**: Chosen over UI libraries like Material UI to keep the bundle size small and demonstrate React fundamentals clearly.
- **CSS Variables**: Used for consistent design tokens (colors, spacing, typography).
- **Component Organization**: Split into `common` (reusable) and `posts` (domain-specific) directories.
- **localStorage**: Used for simple username persistence without backend authentication.

## License

This project was created as part of a technical assessment for CodeLeap.
