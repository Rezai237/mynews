# 🚀 Techsy.News - Modern Technology News Platform

A comprehensive, feature-rich technology news and blog platform built with React Router v7, Tailwind CSS, and Supabase.

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion for delightful interactions
- **Custom Components**: Reusable UI components with consistent design

### 📝 Content Management
- **Rich Text Editor**: TipTap editor for creating and editing articles
- **Media Library**: Image upload and management system
- **Category & Tag System**: Organize content with hierarchical categories and tags
- **Content Scheduling**: Schedule articles for future publication
- **SEO Optimization**: Meta tags, Open Graph, and structured data

### 👥 User Management
- **Authentication**: Secure user registration and login with Supabase Auth
- **User Profiles**: Customizable user profiles with avatars and bios
- **Role-based Access**: User, Author, and Admin roles with different permissions
- **Social Features**: Comments, likes, bookmarks, and sharing

### 🔍 Advanced Features
- **Full-text Search**: Powerful search with filters and autocomplete
- **Analytics Dashboard**: Real-time analytics and insights
- **Newsletter System**: Email subscription and management
- **Web3 Section**: Dedicated area for blockchain and cryptocurrency content
- **PWA Support**: Progressive Web App capabilities
- **RSS Feed**: Auto-generated RSS for content syndication

### 🎛️ Admin Management System
- **Complete Article Management**: Full CRUD operations with search and filtering
- **Professional Image Upload**: URL-based uploads with validation and preview
- **Real-time Statistics**: Accurate counts including drafts and published articles
- **Category Management**: Color-coded categories with inline editing
- **Tag Management**: Tag cloud visualization with bulk operations
- **Comment Moderation**: Review and manage user comments with user details
- **Site Settings**: Comprehensive configuration for all platform features
- **Quick Actions Dashboard**: Direct access to all management functions
- **Draft System**: Save articles as drafts before publishing
- **Preview Mode**: Toggle between edit and preview while writing

### 🛡️ Security & Performance
- **Row Level Security**: Supabase RLS for data protection
- **Optimized Images**: Automatic image optimization and lazy loading
- **Caching**: Intelligent caching strategies
- **Error Boundaries**: Graceful error handling

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **React Router v7**: File-based routing with SSR support
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Zustand**: Lightweight state management

### Backend & Database
- **Supabase**: PostgreSQL database with real-time subscriptions
- **Supabase Auth**: Authentication and user management
- **Supabase Storage**: File storage and CDN
- **Row Level Security**: Database-level security policies

### Development Tools
- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/techsy-news.git
cd techsy-news
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

Run the SQL migrations in your Supabase SQL editor:

1. Copy and run `supabase/migrations/001_initial_schema.sql`
2. Copy and run `supabase/migrations/002_rls_policies.sql`
3. Copy and run `supabase/migrations/003_functions.sql`
4. Copy and run `supabase/migrations/004_seed_data.sql`

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your application!
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## 📈 Recent Updates

### Latest Features (v2.0)
- **Complete Admin System**: Full-featured admin dashboard with all management tools
- **Article Editor**: Rich text editor with preview mode and complete CRUD operations
- **Image Upload System**: Professional image upload with URL validation and preview
- **SSR Compatibility**: Fixed hydration issues for proper server-side rendering
- **Enhanced Statistics**: Real-time analytics with accurate article counts
- **Professional UI**: Improved design with animations and responsive layouts

### Commit History
The project maintains a clean Git history with descriptive commits:
- `fix: resolve image upload form integration issues`
- `feat: implement complete article editing functionality`
- `feat: enhance admin dashboard with accurate statistics and working links`
- `feat: add comprehensive admin management system`
- `feat: enhance articles store with admin functionality`
- `feat: add professional ImageUpload component and enhance utilities`
- `fix: resolve SSR hydration issues and add professional placeholder image`

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
