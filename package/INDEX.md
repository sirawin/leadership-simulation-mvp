# Package Management

This folder contains package management and dependency files.

## 📁 Files

- **[package.json](./package.json)** - Project dependencies and scripts
- **[package-lock.json](./package-lock.json)** - Dependency lock file

## 📦 Dependencies

### Production Dependencies
- `@anthropic-ai/sdk` - Claude AI integration
- `@radix-ui/*` - UI primitives for shadcn/ui
- `next` - React framework
- `react` & `react-dom` - React library
- `tailwind-merge` - Tailwind utility merging
- `lucide-react` - Icon library

### Development Dependencies
- `typescript` - TypeScript compiler
- `@types/*` - TypeScript type definitions
- `eslint` - Code linting
- `tailwindcss` - CSS framework

## 🔗 Symlinks

Files are symlinked to root directory for npm/node compatibility:
```bash
package.json -> package/package.json
package-lock.json -> package/package-lock.json
```