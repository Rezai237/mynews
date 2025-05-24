# Contributing to Techsy.News

Thank you for your interest in contributing to Techsy.News! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git for version control
- Supabase account for database access
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/Rezai237/mynews.git
   cd mynews
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Project Structure

### Key Directories
- `app/routes/` - Page components and routing
- `app/components/` - Reusable UI components
- `app/store/` - Zustand state management
- `app/lib/` - Utilities and configurations
- `public/` - Static assets

### Admin System
- `app/routes/admin/` - Admin dashboard and management pages
- `app/components/ui/` - UI components including ImageUpload
- `app/store/articlesStore.ts` - Article management logic

## 🛠️ Development Guidelines

### Code Style
- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS with responsive design
- **State**: Zustand for global state management
- **Forms**: React Hook Form with Zod validation

### Component Structure
```typescript
// Example component structure
interface ComponentProps {
  // Define props with TypeScript
}

export default function Component({ prop }: ComponentProps) {
  // Hooks at the top
  // Event handlers
  // Render logic
  return (
    <div className="responsive-classes">
      {/* JSX content */}
    </div>
  );
}
```

### Admin Features
When working on admin functionality:
- Use role-based access control
- Include proper loading states
- Add error handling with toast notifications
- Ensure mobile responsiveness
- Follow existing patterns for consistency

## 📝 Commit Guidelines

### Commit Message Format
Follow conventional commits:
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions
- `chore:` - Maintenance tasks

### Examples
```bash
feat(admin): add article bulk operations
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## 🔄 Pull Request Process

### Before Submitting
1. **Test your changes**
   - Run `npm run dev` and test functionality
   - Check responsive design on mobile
   - Verify admin features work correctly

2. **Code quality**
   - Follow TypeScript best practices
   - Use proper error handling
   - Add loading states for async operations

3. **Documentation**
   - Update README.md if needed
   - Add comments for complex logic
   - Update CHANGELOG.md

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Admin functionality verified

## Screenshots
Add screenshots for UI changes
```

## 🎯 Areas for Contribution

### High Priority
- **File Upload Enhancement**: Implement Supabase Storage for direct file uploads
- **Advanced Analytics**: Add more detailed performance metrics
- **Email System**: Newsletter and notification improvements
- **SEO Optimization**: Enhanced meta tags and structured data

### Medium Priority
- **Comment System**: Threading and moderation improvements
- **Search Enhancement**: Full-text search with advanced filters
- **Performance**: Image optimization and caching
- **Accessibility**: ARIA labels and keyboard navigation

### Low Priority
- **PWA Features**: Offline support and push notifications
- **Social Features**: User profiles and social sharing
- **Internationalization**: Multi-language support
- **Theme Customization**: Advanced theme options

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Reproduce the bug
3. Test in different browsers

### Bug Report Template
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
Add screenshots if applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 2.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution**
Clear description of what you want

**Additional context**
Any other context or screenshots
```

## 📚 Resources

### Documentation
- [React Router v7 Docs](https://reactrouter.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Project Specific
- Admin system architecture in `app/routes/admin/`
- State management patterns in `app/store/`
- UI component library in `app/components/ui/`

## 🤝 Community

### Communication
- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Pull Requests for code contributions

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

Thank you for contributing to Techsy.News! 🚀
