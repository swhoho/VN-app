# Visual Novel Hub - replit.md

## Overview
Visual Novel Hub is a mobile-first web application for discovering and reading visual novels across multiple genres. The platform combines social features with content discovery, offering both free and premium content through a points-based system. Users can browse, search, and read interactive stories while tracking their reading progress and engaging with community features.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React Context for global state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with dark mode support
- **Animations**: Framer Motion for smooth interactions
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **Authentication**: Passport.js with Google OAuth2 strategy
- **Session Management**: express-session with secure cookie configuration
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)

### Mobile-First Design
- Responsive design optimized for mobile devices
- Bottom navigation for primary user actions
- Touch-optimized interface with swipe gestures
- Progressive Web App (PWA) capabilities

## Key Components

### Authentication System
- **OAuth Integration**: Google OAuth2 for seamless user onboarding
- **Session Management**: Secure session handling with HTTP-only cookies
- **User Profiles**: Comprehensive user data including reading statistics and preferences
- **Authorization**: Route-level authentication checks

### Content Management
- **Visual Novel Catalog**: Complete item management with metadata
- **Genre Categorization**: Tag-based filtering system
- **Featured Content**: Promotional highlighting system
- **Rating System**: Star ratings and engagement metrics

### Search and Discovery
- **Real-time Search**: Debounced search with instant results
- **Genre Filtering**: Multiple genre categories (Romance, Horror, Sci-Fi, Fantasy, Drama, Mystery)
- **Ranking System**: Weekly popularity rankings with trend indicators
- **Recommendation Engine**: Featured content and personalized suggestions

### Monetization
- **Points System**: Virtual currency for premium content access
- **Stripe Integration**: Secure payment processing for point purchases
- **Membership Tiers**: Free and premium user experiences
- **Package Options**: Multiple point purchase tiers with discount incentives

### Internationalization
- **Multi-language Support**: 15 languages including English, Korean, Japanese, Chinese
- **Language Selector**: Dynamic language switching with persistent preferences
- **Localized Content**: Translated titles and descriptions
- **Cultural Adaptation**: Region-appropriate content presentation

## Data Flow

### User Authentication Flow
1. User initiates Google OAuth login
2. Passport.js handles OAuth callback
3. User data is stored/updated in PostgreSQL
4. Session cookie is set for subsequent requests
5. Frontend receives user data for state management

### Content Discovery Flow
1. Frontend queries items via TanStack Query
2. Express routes handle API requests
3. Drizzle ORM executes PostgreSQL queries
4. Results are cached and returned to client
5. UI updates reactively with new data

### Search Implementation
1. User input triggers debounced search (300ms delay)
2. Search query is sent to backend API
3. PostgreSQL performs ILIKE pattern matching
4. Results are returned and displayed instantly
5. Empty queries show all available content

### Payment Processing
1. User selects points package
2. Stripe PaymentIntent is created
3. Frontend collects payment information
4. Payment is processed securely via Stripe
5. User points balance is updated in database

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL for data persistence
- **Authentication**: Google OAuth2 for user login
- **Payments**: Stripe for secure payment processing
- **Email**: Not currently implemented
- **File Storage**: Local storage for assets

### Development Tools
- **Database Management**: Drizzle Kit for migrations
- **Code Quality**: TypeScript for type safety
- **Bundling**: Vite for optimized builds
- **Deployment**: Replit for hosting and development

### Frontend Libraries
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for interactive animations
- **Forms**: React Hook Form with Zod validation

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module provisioned
- **Hot Reload**: Vite dev server with HMR
- **Environment Variables**: Configured via Replit secrets

### Production Build
- **Frontend Build**: Vite builds React app to `dist/public`
- **Backend Build**: esbuild bundles Express server to `dist/index.js`
- **Static Assets**: Served via Express static middleware
- **Database**: Production Neon PostgreSQL instance

### Scaling Considerations
- **Autoscale Deployment**: Configured for automatic scaling
- **Static Asset Optimization**: Vite handles asset optimization
- **Database Pooling**: Connection pooling via Neon
- **Caching Strategy**: TanStack Query provides client-side caching

## Changelog
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.