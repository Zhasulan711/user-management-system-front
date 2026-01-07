# User Management System

A modern web application for managing user lists with full CRUD operations. The application loads users from an API and provides capabilities for viewing, adding, editing, and deleting users.

## 📋 Project Requirements

### Core Requirements
1. ✅ **React.js and TypeScript** for interface development
2. ✅ **React Router** for navigation between pages (user list, user edit page)
3. ✅ **User table** with columns: ID, First Name, Last Name, Email, Skills, Registration Date
4. ✅ **Add new user** via form with fields: First Name, Last Name, Email, Skills (array with add/remove functionality)
5. ✅ **Edit existing user** via form with pre-filled current user data
6. ✅ **Delete user** by ID
7. ✅ **React Hook Form** for form management
8. ✅ **Git** for version control

### Additional Features (Optional - All Implemented)
- ✅ **Form field validation** (required fields, email format validation)
- ✅ **Pagination** for user list (10 users per page)
- ✅ **Sorting** users by various fields (ID, First Name, Last Name, Email, Registration Date)
- ✅ **State management** (Redux Toolkit + RTK Query)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server

### State Management & Data Fetching
- **Redux Toolkit 2.11** - State management
- **RTK Query** - Data fetching and caching (integrated with Redux Toolkit)
- **React Redux 9.2** - React bindings for Redux

### Routing
- **React Router DOM 7.11** - Client-side routing

### Forms & Validation
- **React Hook Form 7.70** - Form management
- **Zod 4.3** - Schema validation
- **@hookform/resolvers 5.2** - Zod integration with React Hook Form

### UI & Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library built on Radix UI
- **Lucide React 0.562** - Icon library
- **Sonner 2.0** - Toast notifications
- **Radix UI** - Unstyled, accessible component primitives

### Additional Libraries
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Conditional class name utilities

## 📁 Project Architecture

```
src/
├── components/           # Shared components
│   ├── layout/          # Layout components
│   │   ├── Header.tsx   # Application header
│   │   ├── Footer.tsx   # Application footer
│   │   └── Layout.tsx   # Main layout wrapper
│   └── ui/              # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── table.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── select.tsx
│       └── sonner.tsx
│
├── features/            # Feature-based modules
│   └── users/          # User management feature
│       ├── api/        # API layer (RTK Query)
│       │   └── users-api.ts
│       ├── components/ # Feature-specific components
│       │   ├── UsersTable.tsx
│       │   ├── UsersTableHeader.tsx
│       │   ├── UserTableRow.tsx
│       │   ├── UserActions.tsx
│       │   ├── UserForm.tsx
│       │   ├── UserFormHeader.tsx
│       │   ├── FormField.tsx
│       │   ├── FormActions.tsx
│       │   ├── SkillsInput.tsx
│       │   ├── SortButton.tsx
│       │   ├── Pagination.tsx
│       │   ├── LoadingSpinner.tsx
│       │   ├── EmptyUsersState.tsx
│       │   └── UserNotFoundError.tsx
│       ├── hooks/      # Custom hooks
│       │   ├── useUsersList.ts
│       │   └── useUserFormPage.ts
│       ├── types/      # TypeScript types
│       │   └── index.ts
│       ├── utils/      # Utility functions
│       │   ├── date.ts
│       │   ├── form.ts
│       │   ├── pagination.ts
│       │   ├── skills.ts
│       │   ├── sort.ts
│       │   ├── storage.ts
│       │   ├── userId.ts
│       │   └── userTransform.ts
│       └── constants/  # Constants
│           └── index.ts
│
├── pages/              # Page components
│   ├── UsersList.tsx   # User list page
│   └── UserFormPage.tsx # User form page (create/edit)
│
├── schemas/            # Validation schemas
│   └── userSchema.ts   # Zod schema for user form
│
├── store/              # Redux store configuration
│   └── index.ts       # Store setup
│
├── lib/               # Library utilities
│   └── utils.ts       # General utilities (cn function)
│
├── styles/            # Global styles
│   └── globals.css    # Tailwind CSS and custom styles
│
├── App.tsx            # Root component with routing
└── main.tsx           # Application entry point
```

## 🎨 Component Structure

### Layout Components
- **Header** - Application header with logo and navigation
- **Footer** - Application footer with copyright and tech stack info
- **Layout** - Main layout wrapper that combines Header, main content, and Footer

### User Management Components

#### Table Components
- **UsersTable** - Main table container for displaying users
- **UsersTableHeader** - Table header with sortable columns
- **UserTableRow** - Individual user row component
- **UserActions** - Edit and delete action buttons with confirmation dialog
- **SortButton** - Reusable sortable column header button
- **EmptyUsersState** - Empty state when no users are found

#### Form Components
- **UserForm** - Main form container for create/edit operations
- **UserFormHeader** - Form title and description
- **FormField** - Reusable form field with label and error display
- **SkillsInput** - Dynamic skills array input with add/remove functionality
- **FormActions** - Form submit and cancel buttons

#### Utility Components
- **Pagination** - Pagination controls for user list
- **LoadingSpinner** - Loading state indicator
- **UserNotFoundError** - Error state for user not found

### Custom Hooks
- **useUsersList** - Encapsulates user list logic (sorting, pagination, deletion)
- **useUserFormPage** - Encapsulates user form page logic (loading, mutations, error handling)

### Utility Functions
- **date.ts** - Date formatting utilities
- **form.ts** - Form default values generation
- **pagination.ts** - Pagination calculation utilities
- **skills.ts** - Skills array manipulation (add, remove, update, filter)
- **sort.ts** - Sorting utilities and icons
- **storage.ts** - localStorage operations for user persistence
- **userId.ts** - User ID generation logic
- **userTransform.ts** - API response transformation utilities

## 📄 Pages

### Users List Page (`/users`)
- Displays all users in a sortable table
- Pagination (10 users per page)
- Add new user button
- Delete user functionality with confirmation
- Edit user navigation
- Loading and error states

### User Form Page (`/users/new`, `/users/:id/edit`)
- Create new user form
- Edit existing user form (pre-filled)
- Form validation with error messages
- Dynamic skills input
- Cancel and submit actions
- Loading and error states

## 🔄 Data Flow

1. **Initial Load**: RTK Query fetches users from RandomUser API
2. **Data Transformation**: API responses are transformed to match application User interface
3. **Storage**: Mutations (create, update, delete) are persisted to localStorage
4. **State Management**: Redux store manages user data and API cache
5. **UI Updates**: Components react to state changes via React Redux hooks

## 🗄️ API Implementation

### Data Source

The application uses the **RandomUser API** for fetching initial user data:
- **API Endpoint**: `https://randomuser.me/api/?results=30&nat=us`
- **Method**: GET only (the API only supports read operations)
- **Response**: Returns 30 random users from the United States

### Data Transformation

Since the RandomUser API has a different data structure than required by the application, data transformation is performed:

**Fields Added:**
- `skills` - Array of skills (randomly generated from available skills list)
- `registrationDate` - Registration date (randomly generated or current date)

**Fields Removed:**
- All location data (street, city, state, coordinates, timezone)
- Login credentials (username, password, salt, hashes)
- Date of birth details
- Phone and cell numbers
- Picture URLs
- Nationality and ID information
- Other metadata not needed for the application

**Fields Mapped:**
- `name.first` → `firstName`
- `name.last` → `lastName`
- `email` → `email`
- Sequential ID assignment (1-30 for API users)

### Hybrid Approach: API + localStorage

Due to the limitation that RandomUser API only supports GET requests, a hybrid approach is implemented:

**GET Operations (Read):**
- Initial user data is fetched from RandomUser API
- Data is transformed to match the application's User interface
- API users are merged with locally stored users

**Mutations (Create, Update, Delete):**
- All create, update, and delete operations are handled via **localStorage**
- New users created through the form are stored locally
- Edits to existing users (both API and local) are saved to localStorage
- Deleted users are removed from localStorage
- Changes persist across page reloads within the same browser session

### Why This Approach?

1. **API Limitations**: RandomUser API is read-only and doesn't support POST, PUT, or DELETE operations
2. **Full CRUD Functionality**: localStorage enables complete CRUD operations for demonstration purposes
3. **Data Persistence**: Changes persist across page reloads without requiring a backend server
4. **Seamless Integration**: API users and locally created users are merged and displayed together
5. **ID Management**: New users receive IDs starting from 31 (after API users 1-30), ensuring no conflicts

## 🎯 Features

### User Management
- ✅ View all users in a table
- ✅ Sort by ID, First Name, Last Name, Email, Registration Date
- ✅ Pagination (10 users per page)
- ✅ Create new users with validation
- ✅ Edit existing users
- ✅ Delete users with confirmation
- ✅ Dynamic skills management (add/remove)

### Form Validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Skills array validation (at least one skill required)
- ✅ Real-time error messages

### User Experience
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications for actions
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Accessible components (Radix UI)

## 📝 Git Workflow

This project follows **Git Flow** methodology:

- **main/master** - Production-ready code
- **develop** - Integration branch for features
- **feature/** - Feature branches
- **hotfix/** - Critical bug fixes

### Commit Convention

This project uses **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples:
```
feat(users): add user creation form
fix(api): correct ID generation for new users
refactor(components): extract SortButton to separate component
docs(readme): update project architecture documentation
```

## 🏗️ Architecture Decisions

### Feature-Based Structure
The project uses a feature-based folder structure, grouping related components, hooks, types, and utilities together. This improves maintainability and scalability.

### Separation of Concerns
- **API Layer**: RTK Query handles all data fetching and caching
- **Business Logic**: Custom hooks encapsulate complex component logic
- **Presentation**: Components focus on rendering and user interaction
- **Utilities**: Pure functions for reusable operations

### Type Safety
Full TypeScript coverage ensures type safety across the application, reducing runtime errors and improving developer experience.

### Component Composition
Small, focused components are composed together to build complex UIs, following React best practices.

## 📦 Build & Deployment

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The production build will be in the `dist/` directory, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📄 License

This project is private and created for demonstration purposes.

## 👤 Author

Built as a technical assessment project demonstrating modern React development practices.
