# Ozark Web Works - Web Design Business Website

## Overview

Ozark Web Works is a web design and development agency serving businesses in Springfield, Missouri and the greater Ozarks region. The application is a professional marketing website showcasing web design services including simple websites, portfolio sites, logo design, and maintenance plans. It features a blog system for sharing web design insights and a contact form for lead generation.

The application is built as a full-stack web application with a React frontend and Express backend, using TypeScript throughout. It's designed to be deployed on Replit with a focus on local SEO optimization and community engagement for the Springfield, MO market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for UI components
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with shadcn/ui component library for styling

**Design System:**
- Custom theme using CSS variables with light/dark mode support
- Color palette featuring forest green (primary), sky blue (secondary), and warm beige (accent) to reflect Ozark regional identity
- Typography using Google Fonts: Poppins for headings, Lato for body text
- Component library based on Radix UI primitives with custom styling
- Responsive design with mobile-first approach

**Page Structure:**
- Single-page home with sections: Hero, Services, About, Blog preview, Contact
- Dedicated blog listing page (`/blog`)
- Individual blog post pages (`/blog/:slug`)
- 404 error page for unmatched routes

**State Management:**
- React Query for API data fetching and caching
- Local component state for UI interactions
- Theme context for dark/light mode toggle

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Custom middleware for request logging and error handling
- RESTful API endpoints for blog functionality

**API Structure:**
- `GET /api/blog` - Returns list of all blog posts with metadata
- `GET /api/blog/:slug` - Returns single blog post with full content
- Blog posts stored as Markdown files with YAML frontmatter in `/blog` directory
- Uses `gray-matter` to parse frontmatter and `marked` to convert Markdown to HTML

**Session & Storage:**
- In-memory storage implementation (`MemStorage`) for user data
- Designed to be easily swapped with database implementation
- User schema defined with Drizzle ORM for future PostgreSQL integration

**Build & Deployment:**
- Development: Vite dev server proxied through Express
- Production: Static assets served from `dist/public`, server bundle in `server-dist`
- Client built to `dist/public` relative to repository root
- Server bundled with esbuild targeting Node.js ESM format

### Data Storage

**Current Implementation:**
- Blog content: Markdown files with YAML frontmatter
- User data: In-memory storage (development/prototype)

**Planned Database (via Drizzle configuration):**
- PostgreSQL database configured via Drizzle Kit
- Schema defined in `shared/schema.ts` with user table
- Connection via Neon serverless driver
- Migrations output to `./migrations` directory

**Schema Design:**
- Users table with id (UUID), username (unique), and password fields
- Extensible schema structure for future features (blog posts, contact submissions, etc.)

### Content Management

**Blog System:**
- Markdown-based blog posts with frontmatter (title, date, thumbnail)
- Server-side rendering of Markdown to HTML
- File-based CMS with Netlify CMS admin interface at `/admin`
- Posts stored in `/blog` directory and served via API

**Static Assets:**
- Images stored in `attached_assets` directory
- Logo and generated images served from assets
- Vite static copy plugin for admin interface

### SEO & Analytics

**SEO Implementation:**
- Meta tags for local search (Springfield MO, Ozarks region)
- Geo-location meta tags with coordinates
- Structured data ready (LocalBusiness schema mentioned in docs)
- Google Analytics 4 tracking (GA4 ID: G-HM4EDRZN5G)
- Robots.txt for crawler control
- Sitemap configuration referenced

**Local Business Optimization:**
- Chamber of Commerce integration messaging
- Location-specific keywords throughout content
- Service area targeting (Springfield, Branson, southwest Missouri)

### Authentication & Security

**Current State:**
- User schema defined but authentication not fully implemented
- Password field in schema suggests planned authentication
- Session management scaffolding with connect-pg-simple for future PostgreSQL sessions

**Planned Features:**
- User authentication for admin/CMS access
- Protected routes for blog management
- Session-based authentication with PostgreSQL session store

### Development & Testing

**Development Workflow:**
- TypeScript configuration with strict mode enabled
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)
- Hot module replacement via Vite in development
- Separate client and server compilation

**Code Quality:**
- TypeScript for type safety across stack
- ESLint/Prettier configuration implied via components.json
- Component examples in `client/src/components/examples/` for development

## External Dependencies

### Third-Party Services

**Analytics & Tracking:**
- Google Analytics 4 (gtag.js) - Web analytics and conversion tracking
- Google Search Console (referenced in SEO setup docs)
- Google My Business (referenced for local SEO)

**Database:**
- Neon Serverless PostgreSQL (`@neondatabase/serverless`) - Planned database backend
- Currently using in-memory storage as placeholder

**Content Management:**
- Netlify CMS - Git-based CMS for blog post management (admin UI at `/admin`)

### NPM Packages

**Core Framework:**
- `express` - Server framework
- `react` & `react-dom` - UI framework
- `vite` - Build tool and dev server
- `typescript` & `tsx` - TypeScript runtime

**Database & ORM:**
- `drizzle-orm` - TypeScript ORM
- `drizzle-kit` - Schema management and migrations
- `drizzle-zod` - Schema validation
- `connect-pg-simple` - PostgreSQL session store

**UI Components:**
- `@radix-ui/*` - Headless UI primitives (20+ components)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` & `clsx` - Conditional styling utilities
- `lucide-react` - Icon library

**State & Data Fetching:**
- `@tanstack/react-query` - Server state management
- `wouter` - Lightweight routing
- `react-hook-form` & `@hookform/resolvers` - Form handling
- `zod` - Schema validation

**Content Processing:**
- `marked` - Markdown to HTML conversion
- `gray-matter` - YAML frontmatter parsing
- `date-fns` - Date formatting utilities

**Build Tools:**
- `esbuild` - Server bundling
- `vite-plugin-static-copy` - Static asset copying
- `autoprefixer` & `postcss` - CSS processing

### Design Resources

**Fonts:**
- Google Fonts: Poppins (headings), Lato (body text)

**Design System:**
- shadcn/ui configuration (New York style variant)
- Custom color tokens based on HSL values
- Tailwind with CSS variables for theming