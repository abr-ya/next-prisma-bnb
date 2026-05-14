# Next.js 15 + Prisma BnB Project

## Overview
Full-stack travel planning and accommodation booking application built with Next.js 15, combining Airbnb-like home rentals with trip planning features including maps, pins, and image galleries.

## Tech Stack

### Core
- **Next.js 15.2.8** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Prisma 6.4.1** - ORM with PostgreSQL
- **Tailwind CSS 3.4** - Styling

### Authentication & Storage
- **Kinde Auth** (@kinde-oss/kinde-auth-nextjs) - Authentication provider
- **Supabase** - File storage and additional backend services

### UI Components
- **Radix UI** - Accessible component primitives (Dialog, Dropdown, Select, Tooltip, etc.)
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **Sonner** - Toast notifications
- **shadcn/ui** - Component system (components.json configured)

### Forms & Validation
- **React Hook Form 7.55** - Form management
- **Zod 3.24** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Maps & Location
- **Mapbox GL 3.9.4** - Primary map provider
- **React Map GL 7.0.23** - React wrapper for Mapbox
- **Leaflet 1.9.4** - Alternative map library
- **React Leaflet 5.0** - React wrapper for Leaflet
- **world-countries 5.0** - Country data

### State Management
- **Zustand 5.0** - Lightweight state management

### AI Integration
- **@google/generative-ai 0.24** - Google AI integration

### Development Tools
- **ESLint 8** - Linting with TypeScript, React, and Prettier configs
- **Prettier 3.2** - Code formatting
- **Husky 9.1** - Git hooks
- **lint-staged 16.4** - Pre-commit linting
- **Vitest 4.1** - Fast unit testing framework
- **React Testing Library 16.3** - Component testing utilities

## Project Structure

```
app/
├── _actions/          # Server actions
│   ├── createBooking.ts
│   ├── createHome.ts
│   ├── createPin.ts
│   ├── createTrip.ts
│   ├── getHome.ts
│   ├── getTrips.ts
│   ├── images.ts
│   └── likeActions.ts
├── _api/              # API utilities
│   └── supabase.ts
├── _components/       # Shared components
├── _hooks/            # Custom React hooks
├── _interfaces/       # TypeScript interfaces
├── _tempData/         # Temporary/mock data
├── api/               # API routes
├── (maps)/            # Map-related pages (route group)
│   └── paris/
├── home/              # Home listing pages
│   └── [id]/
├── trips/             # Trip planning pages
│   ├── [id]/
│   └── new/
├── user/              # User profile pages
│   ├── homes/
│   └── images/
├── resumes/           # Resume builder feature
├── food/              # Food-related feature
├── new/               # New listing creation
├── lib/               # Utility libraries
│   ├── db.ts          # Prisma client
│   ├── utils.ts       # General utilities
│   └── getCountries.ts
├── constants.ts
├── globals.css
├── layout.tsx
├── page.tsx
└── loading.tsx

components/            # UI components (shadcn/ui)
prisma/
├── schema.prisma      # Database schema
└── migrations/
zod/                   # Zod schemas
lib/                   # Additional utilities
public/                # Static assets
```

## Environment Variables

Required variables (see `.env.spec`):
```
# Kinde Auth
KINDE_CLIENT_ID
KINDE_CLIENT_SECRET
KINDE_ISSUER_URL
KINDE_SITE_URL
KINDE_POST_LOGOUT_REDIRECT_URL
KINDE_POST_LOGIN_REDIRECT_URL

# Database
DATABASE_URL          # PostgreSQL connection
DIRECT_URL           # Direct database connection

# Supabase
SUPABASE_URL
SUPABASE_KEY
SUPA_BUCKET_NAME

# External Services
MAPBOX_TOKEN         # Mapbox API key
AI_KEY              # Google AI API key
```

## Scripts

```bash
# Development
yarn dev              # Start dev server
yarn build            # Build for production (includes prisma generate)
yarn start            # Start production server

# Code Quality
yarn lint             # Lint app directory (quiet mode)
yarn lint:staged      # Run lint-staged (pre-commit)
yarn fix              # Fix app directory
yarn fix-cmp          # Fix components directory
yarn tsc              # Type check

# Testing
yarn test             # Run tests in watch mode
yarn test:run         # Run tests once
yarn test:ui          # Run tests with UI interface
yarn test:coverage    # Run tests with coverage report

# Database
yarn postinstall                        # Auto-generate Prisma client
yarn db:migrate:deploy                  # Deploy migrations
yarn db:migrate:resolve:baseline        # Resolve baseline migration
yarn db:migrate:resolve:pin-unique      # Resolve pin uniqueness migration
```

## Git Hooks

**Pre-commit** (Husky + lint-staged):
- Runs ESLint on staged `.js`, `.jsx`, `.ts`, `.tsx` files
- Configured in `package.json` lint-staged section

## Testing

The project uses **Vitest** with **React Testing Library** for fast, modern component testing.

### Test Configuration
- **Framework**: Vitest 4.1 with jsdom environment
- **Testing Library**: React Testing Library 16.3 with jest-dom matchers
- **Config**: `vitest.config.ts` with React plugin and path aliases
- **Setup**: `vitest.setup.ts` imports jest-dom matchers globally

### Running Tests
```bash
yarn test              # Watch mode - reruns tests on file changes
yarn test:run          # Single run - useful for CI/CD
yarn test:ui           # Interactive UI - visual test explorer
yarn test:coverage     # Coverage report - shows untested code
```

### Writing Tests
Tests are colocated with components using the `.test.tsx` extension:
```
app/_components/
├── ImgLinks.tsx
└── ImgLinks.test.tsx
```

Example test structure:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Key Features

1. **Home Rentals** - Airbnb-style property listings with multi-step creation
2. **Trip Planning** - Create trips with dates, members, and location pins
3. **Map Integration** - Dual map support (Mapbox primary, Leaflet fallback)
4. **Image Management** - Upload, organize with folders and tags
5. **Location Pins** - Mark places on trips with coordinates and photos
6. **Reservations** - Book homes with date ranges
7. **Favorites** - Save preferred listings
8. **Resume Builder** - Create and style professional resumes
9. **Food Feature** - Additional food-related functionality

## Development Notes

- **Next.js 15 App Router** - Uses server components by default
- **Prisma Migrations** - Production baseline established (2026-05-11)
- **Pin Uniqueness** - Trip pins must have unique titles per trip
- **Image Storage** - Supabase bucket for file uploads
- **Auth Flow** - Kinde handles OAuth, redirects configured
- **Map Resilience** - Mapbox primary with English error UX fallback

