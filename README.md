# Idea Management System

A React-based application for employee idea submission and management with role-based access control (Admin/Employee).

## Features

### Current (Phase 1 - Foundation) ✅
- **Project Setup**: Vite + React 18
- **Design System**: Custom CSS variables matching brand colors (turquoise/cyan on dark navy)
- **Common Components**: Button, Card, Input, Textarea, Modal, Badge, Loader
- **Layout Components**: Sidebar, Header, MainLayout, AuthLayout
- **Routing**: React Router v6 with protected routes
- **Toast Notifications**: react-toastify integration

### Upcoming Features
- **Phase 2**: SSO/OAuth Authentication
- **Phase 3**: Idea Submission & Viewing
- **Phase 4**: Admin Review & Comments
- **Phase 5**: Employee Invitations
- **Phase 6**: In-app & Email Notifications
- **Phase 7**: Polish & Enhancements

## Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router v6
- **State Management**: React Query + Zustand (planned)
- **Forms**: React Hook Form + Yup (planned)
- **Styling**: CSS Modules + CSS Variables
- **Backend (Prototype)**: JSON Server (planned)
- **UI**: Custom components (no UI library)

## Getting Started

### Prerequisites
- Node.js v20.11.1 or higher
- npm 10.2.4 or higher

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at [http://localhost:5173/](http://localhost:5173/)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server (Phase 3+)
- `npm run dev:all` - Run both dev server and JSON Server concurrently (Phase 3+)

## Project Structure

```
test-suggestions-app/
├── public/                # Static assets
├── src/
│   ├── api/              # API client & endpoints (Phase 3+)
│   ├── assets/           # Images, icons
│   ├── components/
│   │   ├── common/       # Reusable UI components
│   │   ├── layout/       # Layout components (Sidebar, Header, etc.)
│   │   ├── ideas/        # Idea-related components (Phase 3+)
│   │   ├── comments/     # Comment components (Phase 4+)
│   │   ├── notifications/# Notification components (Phase 6+)
│   │   ├── invitations/  # Invitation components (Phase 5+)
│   │   └── auth/         # Auth components (Phase 2+)
│   ├── contexts/         # React contexts (Phase 2+)
│   ├── hooks/            # Custom React hooks (Phase 2+)
│   ├── pages/            # Page components
│   ├── services/         # Business logic services (Phase 2+)
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles & design system
│   ├── App.jsx           # Main app component
│   └── index.jsx         # Entry point
├── server/               # JSON Server mock API (Phase 3+)
├── .env.example          # Environment variables template
├── package.json
└── vite.config.js        # Vite configuration
```

## Design System

### Color Palette
- **Primary**: `#00E5CC` (Turquoise/Cyan)
- **Background Dark**: `#2C3E50` (Navy)
- **Background Light**: `#ECF0F1` (Light Gray)
- **Success**: `#27AE60` (Green)
- **Warning**: `#F39C12` (Orange)
- **Danger**: `#E74C3C` (Red)
- **Info**: `#3498DB` (Blue)

### Components Built
- **Button**: Primary, Secondary, Ghost, Danger variants
- **Card**: Default and dark variants with hover effects
- **Input/Textarea**: With validation states and labels
- **Modal**: Closable with keyboard support (ESC key)
- **Badge**: Status indicators with multiple variants
- **Loader**: Spinner with size and color variants

### Layout
- **Sidebar**: Fixed navigation with turquoise active states
- **Header**: Top bar with notification bell and user menu
- **MainLayout**: Authenticated page layout
- **AuthLayout**: Login page layout

## User Roles (Planned)

### Admin
- Invite employees to submit ideas for topics
- Review submissions
- Approve/decline ideas
- Comment and ask questions

### Employee
- Submit ideas
- View own ideas
- Receive notifications
- Respond to admin questions

## Routes

### Public
- `/login` - Login with SSO

### Protected
- `/` - Dashboard
- `/submit-idea` - Submit new idea
- `/my-ideas` - View own ideas
- `/notifications` - View notifications

### Admin
- `/admin` - Admin dashboard
- `/admin/review` - Review ideas
- `/admin/invite` - Invite employees

## Development Roadmap

### ✅ Phase 1: Foundation (Complete)
- [x] Initialize Vite React project
- [x] Install dependencies
- [x] Create folder structure
- [x] Set up CSS variables with design system colors
- [x] Build common components
- [x] Build layout components
- [x] Configure React Router with basic routes

### 🔄 Phase 2: Authentication (Next)
- [ ] Set up JSON Server with json-server-auth
- [ ] Create authService for OAuth flow
- [ ] Build AuthContext
- [ ] Create ProtectedRoute component
- [ ] Implement login/logout

### 📋 Phase 3: Ideas Module
- [ ] Set up JSON Server database
- [ ] Build IdeaForm component
- [ ] Create idea submission flow
- [ ] Build IdeaCard and IdeaList
- [ ] Implement filtering and sorting
- [ ] Create idea detail view

### 📋 Phase 4: Admin Review
- [ ] Build admin dashboard
- [ ] Create review interface
- [ ] Implement approve/decline actions
- [ ] Build comment system

### 📋 Phase 5: Invitations
- [ ] Create topic management
- [ ] Build invitation form
- [ ] Implement multi-select user picker

### 📋 Phase 6: Notifications
- [ ] Build notification bell component
- [ ] Implement notification polling
- [ ] Create email service (mock)
- [ ] Add notification triggers

### 📋 Phase 7: Polish
- [ ] Add loading states
- [ ] Improve responsive design
- [ ] Add search functionality
- [ ] Implement pagination
- [ ] Enhance accessibility

## Contributing

This is a private project. For questions or suggestions, please contact the development team.

## License

Proprietary - All rights reserved
