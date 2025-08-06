# Configuration Files

This folder contains all project configuration files.

## 📁 Files

### Build & Development
- **[next.config.ts](./next.config.ts)** - Next.js configuration
- **[tsconfig.json](./tsconfig.json)** - TypeScript compiler configuration
- **[eslint.config.mjs](./eslint.config.mjs)** - ESLint configuration

### Styling & UI
- **[tailwind.config.ts](./tailwind.config.ts)** - Tailwind CSS configuration
- **[postcss.config.mjs](./postcss.config.mjs)** - PostCSS configuration
- **[components.json](./components.json)** - shadcn/ui components configuration

## 📝 Notes

All configuration files are symlinked to the root directory for tool compatibility:
```bash
# Symlinks in root directory point to files here
next.config.ts -> config/next.config.ts
tailwind.config.ts -> config/tailwind.config.ts
# etc.
```

This keeps the root directory clean while maintaining tool functionality.