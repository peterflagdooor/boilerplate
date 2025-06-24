# Next.js Resizable Layout Boilerplate

A modern, production-ready Next.js boilerplate featuring a four-pane resizable layout built with TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

- **🎯 Four-Pane Resizable Layout**: Ultra-narrow global nav, collapsible secondary menu, responsive central area, and contextual right sidebar
- **🎨 Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **📱 Responsive Design**: Fully responsive layout that works on all screen sizes
- **💾 Persistent State**: Layout preferences saved to localStorage
- **🔧 TypeScript**: Full type safety throughout the application
- **⚡ Fast Development**: Hot reload, ESLint, Prettier, and more
- **🎭 Drag-to-Resize**: Custom resizable panels with visual feedback
- **📌 Pin/Unpin Panels**: Keep important panels always visible

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm, npm, or yarn

### Installation

1. **Clone or download this boilerplate**
   ```bash
   git clone <your-repo-url>
   cd nextjs-resizable-layout-boilerplate
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout with GridLayout wrapper
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Layout-related components
│   │   ├── GridLayout.tsx      # Main grid layout + context provider
│   │   ├── CentralArea.tsx     # Central content area with breadcrumbs
│   │   ├── useResizable.ts     # Custom hook for drag-to-resize
│   │   └── SidebarHandle.tsx   # Draggable resize handle
│   ├── sidebar/           # Sidebar components
│   │   ├── GlobalNav.tsx       # Ultra-narrow left navigation
│   │   ├── AltMenu.tsx         # Secondary collapsible menu
│   │   └── RightSidebar.tsx    # Contextual right panel
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── scroll-area.tsx
├── lib/
│   ├── utils.ts           # Utility functions (cn helper)
│   └── persistence.ts     # localStorage state management
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎛️ Layout Components

### GlobalNav (Ultra-narrow sidebar)
- Fixed 64px width when open, 0px when collapsed
- Icon-based navigation with labels below icons
- Toggle button for AltMenu
- Fully collapsible

### AltMenu (Secondary sidebar)
- Default 280px width, resizable (200px - 480px)
- Pin/unpin functionality
- Vertical menu list with placeholder items
- Smooth show/hide animations

### CentralArea (Main content)
- Responsive main content region
- Sticky breadcrumb + action buttons bar
- Outlet-style children rendering
- Toggle button for right sidebar

### RightSidebar (Context panel)
- Default 360px width, resizable (260px - 520px)
- Pin/unpin functionality
- Contextual information display
- Properties and quick actions

## 🔧 Customization

### Adding New Pages

Create new pages in the `app/` directory:

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Your content here */}
    </div>
  )
}
```

### Modifying Navigation

Update the navigation items in `components/sidebar/GlobalNav.tsx`:

```tsx
const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/search' },
  // Add your navigation items here
]
```

### Adding shadcn/ui Components

Install additional components as needed:

```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
```

### Customizing Layout Behavior

Modify default layout state in `lib/persistence.ts`:

```tsx
const defaultState: LayoutState = {
  globalNav: { isOpen: true },
  altMenu: {
    isOpen: false,
    width: 280,        // Change default width
    isPinned: false,
  },
  rightSidebar: {
    isOpen: false,
    width: 360,        // Change default width
    isPinned: false,
  },
}
```

## 🎨 Styling

### CSS Variables

The layout uses CSS custom properties for dynamic sizing:
- `--global-nav-w`: Global navigation width
- `--altmenu-w`: Alt menu width  
- `--rightbar-w`: Right sidebar width

### Tailwind Configuration

The project includes:
- Custom color palette with CSS variables
- Dark mode support
- Typography plugin
- Responsive breakpoints

### Component Styling

All components use:
- Tailwind utility classes
- shadcn/ui design tokens
- Consistent spacing and typography
- Smooth transitions and animations

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm typecheck    # Run TypeScript compiler check
```

## 🔧 Configuration Files

- **`next.config.js`**: Next.js configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`components.json`**: shadcn/ui configuration
- **`.eslintrc.json`**: ESLint rules
- **`.prettierrc`**: Prettier formatting rules

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide React](https://lucide.dev/) - Icon library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components

---

**Happy coding! 🎉**
