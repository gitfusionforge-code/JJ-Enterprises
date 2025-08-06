# JJ Enterprises - Full-Stack E-commerce Website

## Overview

JJ Enterprises is a modern, full-stack e-commerce website built for a furniture company. The application features a beautiful, responsive frontend showcasing furniture products with categories like sofas, chairs, tables, bedroom, and office furniture. It includes product galleries, featured collections, company information, customer testimonials, and a contact form. The backend provides RESTful APIs for managing products, handling contact submissions, and processing e-commerce transactions.

## Recent Changes (Latest Update: January 2025)

### E-commerce Functionality Added
- **Shopping Cart System**: Complete cart management with add, update, remove, and clear functionality
- **Test Payment Processing**: Mock payment system for testing checkout flow without real transactions
- **Order Management**: Order creation and tracking system for completed purchases
- **Session-based Cart**: Cart persistence using browser session storage
- **Currency Conversion**: All prices converted from USD to Indian Rupees (INR) with ₹ symbol
- **Responsive Cart UI**: Mobile-friendly cart and checkout pages with proper accessibility

## User Preferences

Preferred communication style: Simple, everyday language.

## Business Information
- **Business Name**: JJ Enterprises
- **Address**: 115/NA, Anbu Nagar, Kuruchi, Coimbatore – 641023, Tamil Nadu, India
- **Phone**: +91 95663 20512
- **Email**: sjr8585@gmail.com

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom color palette (rich brown, cream beige, dark slate, charcoal)
- **Typography**: Google Fonts integration (Playfair Display for headings, Lato for body text)
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript throughout the entire application stack
- **API Design**: RESTful endpoints for products, contacts, cart management, and order processing with proper HTTP status codes
- **Request/Response**: JSON-based communication with structured error handling
- **E-commerce APIs**: Cart operations (add, update, remove, clear) and test payment processing
- **Development**: tsx for TypeScript execution in development mode

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless) for serverless PostgreSQL
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for rapid development and testing
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Data Models
- **Products**: Complete product catalog with id, name, description, price (in INR), category, image URLs, and featured status
- **Contacts**: Customer inquiry system capturing personal information, interests, and messages
- **Cart Items**: Shopping cart items with product references, quantities, and session management
- **Orders**: Order records with customer information, total amounts, order status, and item details
- **Categories**: Organized product categorization (sofas, chairs, tables, bedroom, office)

### Authentication and Authorization
- **Session-based**: Cookie-based session management using Express sessions
- **CORS**: Configured for cross-origin requests with credentials support
- **Security**: Express middleware for request parsing and security headers

### Development and Build Process
- **Development Server**: Vite dev server with HMR for rapid frontend development
- **Build Process**: Separate build commands for frontend (Vite) and backend (esbuild)
- **Production**: Node.js server serving static assets and API endpoints
- **TypeScript**: Comprehensive type checking across frontend, backend, and shared schemas

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Node.js web framework for API development
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management and caching

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating type-safe component variants
- **clsx**: Conditional className utility

### Development and Build Tools
- **vite**: Modern build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Form and Validation
- **react-hook-form**: Performant form library with validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: Schema validation for type-safe data handling
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Additional Integrations
- **wouter**: Lightweight routing for React applications
- **date-fns**: Date manipulation and formatting utilities
- **cmdk**: Command palette component for enhanced UX
- **embla-carousel-react**: Touch-friendly carousel component