# Podium des Concours — Nuit de l'Info 2025

## Overview

A real-time competition leaderboard and podium dashboard for "Nuit de l'Info 2025". This full-stack web application displays team rankings, scores, and progress with an elegant, animated interface inspired by modern dashboard aesthetics from Linear and Vercel.

The application features a celebratory podium for the top 3 teams, a comprehensive leaderboard table, live score updates, and visual feedback including confetti animations for leadership changes. Built with a focus on clarity, visual hierarchy, and celebration of achievement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (Dashboard and 404 pages)

**UI Component Library**
- shadcn/ui component system (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming support (light/dark modes)
- Custom animation system using Tailwind animations and CSS transitions

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- Automatic refetching every 5 seconds for real-time updates
- Optimistic updates and mutation handling for score changes
- Query client configured with custom fetch functions for API communication

**Key UI Features**
- Animated podium component with staggered entrance animations for top 3 teams
- Sortable leaderboard table with rank-based visual treatment (gold/silver/bronze)
- Progress bars with animated fill on mount
- Achievement badge system with tooltips
- Confetti celebration effects on leadership changes
- Theme toggle for light/dark mode support
- Countdown timer component for event tracking
- Particle background for visual appeal

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Node.js HTTP server with middleware-based request handling
- Custom logging middleware for request/response tracking
- JSON body parsing with raw body preservation for webhook support

**API Structure**
- RESTful API endpoints under `/api` prefix
- `GET /api/teams` - Fetch all teams with scores
- `POST /api/teams/update` - Update individual team scores
- Request validation using Zod schemas
- Proper error handling with appropriate HTTP status codes

**Data Storage**
- In-memory storage implementation (`MemStorage`) for development/demo
- Interface-based storage abstraction (`IStorage`) allowing future database implementations
- Mock team data initialized on server start
- Team schema: `{ id: number, name: string, score: number }`

**Production Build**
- ESBuild for server bundling with selective dependency bundling
- Static file serving from `dist/public` directory
- SPA fallback routing to `index.html`
- Development vs production mode handling

### Database Design

**Schema Definition (Drizzle ORM)**
- PostgreSQL dialect configuration
- `users` table: id (UUID), username (unique), password
- `teams` table: id (integer primary key), name (text), score (integer with 0 default)
- Zod schema generation for type-safe validation
- Schema located in `shared/schema.ts` for client/server sharing

**Current Implementation**
- In-memory storage with mock data for immediate deployment
- Database configuration present but not actively used in current codebase
- Migration support configured via Drizzle Kit (`npm run db:push`)
- Connection string expected via `DATABASE_URL` environment variable

**Migration Strategy**
- When database is needed, the existing `IStorage` interface allows swapping implementations
- Drizzle ORM queries can replace in-memory map operations
- No frontend code changes required due to abstraction layer

### External Dependencies

**UI & Styling Libraries**
- Radix UI primitives (accordion, dialog, dropdown, select, etc.) for accessible component foundations
- Tailwind CSS with PostCSS for styling
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional className composition

**Form & Validation**
- React Hook Form with Hookform Resolvers for form state management
- Zod for runtime schema validation
- drizzle-zod for schema-to-validator generation

**Utilities & Effects**
- canvas-confetti for celebration animations
- date-fns for date formatting and manipulation
- lucide-react for icon components
- wouter for routing

**Developer Experience**
- Replit-specific plugins for development (cartographer, dev banner, runtime error modal)
- TypeScript with strict mode enabled
- Path aliases configured (`@/`, `@shared/`, `@assets/`)

**Database (Configured but Optional)**
- Drizzle ORM for type-safe database queries
- pg (node-postgres) as PostgreSQL client
- connect-pg-simple for session store (when using PostgreSQL)

**Session Management (Available but Not Active)**
- express-session infrastructure present
- Currently not required as no authentication is implemented
- Can be enabled when user management features are added