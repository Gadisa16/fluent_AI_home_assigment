# MultiDirectionTooltip

A production-ready, highly customizable React tooltip component supporting multiple directions, hover/click interactions, auto-flip, accessibility, and rich content. Built with TypeScript, Bun, Tailwind CSS, shadcn/ui, and framer-motion.

![React Tooltip Sandbox](https://img.shields.io/badge/React-18+-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue?logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.0+-yellow?logo=bun)
![Vite](https://img.shields.io/badge/Vite-7.1+-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-cyan?logo=tailwindcss)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >=18.0.0
- **Bun**: >=1.0.0 (recommended) or npm
- **Git**: For cloning the repository

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Fluent_AI

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

### Development

```bash
# Start development server with Bun
bun run dev

# Or with npm
npm run dev
```

### Production Build

```bash
# Build for production with Bun
bun run build

# Or with npm
npm run build
```

---

## 📦 Package Manager Configuration

This project is configured to use **Bun** as the primary package manager for faster installations and builds.

### Bun Configuration

- **Package Manager**: Bun (recommended)
- **Lock File**: `bun.lock`
- **Install Command**: `bun install`
- **Build Command**: `bun run build`

### Fallback to npm

If you prefer npm, the project is fully compatible:

```bash
# Remove Bun lock file
rm bun.lock

# Install with npm
npm install

# Run commands with npm
npm run dev
npm run build
```

---

## 🎯 Features

### ✨ Core Features

- **Multi-directional positioning**: Top, Bottom, Left, Right
- **Auto-flip**: Automatically repositions when near viewport edges
- **Hover & Click interactions**: Configurable delays and callbacks
- **Rich content support**: React components, HTML, and custom renderers
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **TypeScript**: Full type safety and IntelliSense support

### 🎨 UI/UX Features

- **Smooth animations**: Powered by Framer Motion
- **Responsive design**: Works on all screen sizes
- **Dark mode support**: Automatic theme detection
- **Professional styling**: Tailwind CSS with shadcn/ui components
- **Interactive sandbox**: Live demo with all features

### 🔧 Technical Features

- **Performance optimized**: Memoized components and efficient rendering
- **Bundle optimized**: Tree-shaking and code splitting
- **Hot reload**: Fast development with Vite
- **Linting**: ESLint and Biome for code quality
- **Type checking**: Strict TypeScript configuration

---

## 🏗️ Project Structure

```
src/
├── components/
│   └── MultiDirectionTooltip/
│       ├── types.ts                 # TypeScript interfaces
│       ├── MultiDirectionTooltip.tsx # Main component
│       └── hooks/
│           ├── useTooltipInteraction.ts # Interaction logic
│           └── useTooltipPosition.ts    # Positioning logic
├── examples/
│   └── Sandbox.tsx                  # Interactive demo
├── styles/
│   └── index.css                    # Global styles
└── main.tsx                         # App entry point
```

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

This project is configured for seamless deployment on Vercel:

#### Configuration Files

- `vercel.json` - Vercel deployment configuration
- `package.json` - Build scripts and dependencies
- `vite.config.ts` - Vite build configuration

#### Deployment Steps

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Auto-deploy**: Vercel will automatically detect the Vite configuration
3. **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `bun run build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `bun install` (or `npm install`)

#### Environment Variables

No environment variables required for basic deployment.

#### Troubleshooting

If you encounter build issues:

1. **Clear cache**: Remove `node_modules` and lock files
2. **Reinstall**: Run `bun install` or `npm install`
3. **Rebuild**: Run `bun run build` or `npm run build`

### Other Deployment Platforms

The project can be deployed to any platform that supports Node.js:

- **Netlify**: Configure build command and output directory
- **GitHub Pages**: Use GitHub Actions for deployment
- **AWS Amplify**: Connect repository and configure build settings
- **Railway**: Deploy directly from GitHub

---

## 📚 API Reference

### `<MultiDirectionTooltip />` Props

| Prop               | Type                                                                 | Description                                                            |
| ------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `disableFlip`      | `boolean`                                                            | Disable auto-flip if tooltip would overflow viewport. Default: `false` |
| `defaultOffset`    | `number`                                                             | Default offset in pixels. Default: `8`                                 |
| `triggerClassName` | `string`                                                             | Custom class for trigger element.                                      |
| `config`           | `MultiDirectionPopupConfig`                                          | Tooltip configuration for each direction/type.                         |
| `trigger`          | `React.ReactNode \| (props: { isOpen: boolean }) => React.ReactNode` | Trigger element or render function.                                    |
| `triggerCallbacks` | `{ onClick?, onMouseEnter?, onMouseLeave? }`                         | Optional callbacks for trigger events.                                 |
| ...rest            | `HTMLAttributes<HTMLDivElement>`                                     | Other div props.                                                       |

### `MultiDirectionPopupConfig`

```ts
export type MultiDirectionPopupConfig = Partial<
  Record<
    PopupPlacement,
    {
      [PopupType.CLICK]?: BasePopupMetadata;
      [PopupType.HOVER]?: HoverPopupMetadata;
    }
  >
>;
```

#### `BasePopupMetadata`

- `offset?`: number
- `onMouseEnter?`, `onMouseLeave?`, `onOpenCallback?`, `onCloseCallback?`: () => void
- `applyDefaultClassNames?`: boolean
- `element`: React.ReactNode | (({ closePopup }) => React.ReactNode)

#### `HoverPopupMetadata` (extends BasePopupMetadata)

- `openDelay?`: number
- `closeDelay?`: number
- `enterable?`: boolean

#### `PopupPlacement`

- `TOP`, `BOTTOM`, `LEFT`, `RIGHT`

#### `PopupType`

- `HOVER`, `CLICK`

---

## 💡 Usage Examples

### Basic Hover Tooltip

```tsx
import { MultiDirectionTooltip } from "./src/components/MultiDirectionTooltip/MultiDirectionTooltip";
import {
  PopupPlacement,
  PopupType,
} from "./src/components/MultiDirectionTooltip/types";

const basicHoverConfig = {
  [PopupPlacement.TOP]: {
    [PopupType.HOVER]: {
      element: "This is a simple hover tooltip",
      offset: 8,
      openDelay: 200,
      closeDelay: 100,
    },
  },
};

<MultiDirectionTooltip
  config={basicHoverConfig}
  trigger={<button>Hover Me (Top)</button>}
/>;
```

### Click Tooltip with Rich Content

```tsx
const richClickConfig = {
  [PopupPlacement.BOTTOM]: {
    [PopupType.CLICK]: {
      element: ({ closePopup }) => (
        <div>
          <h3>Rich Content</h3>
          <p>This tooltip contains rich content with multiple elements.</p>
          <button onClick={closePopup}>Close</button>
        </div>
      ),
      offset: 12,
      applyDefaultClassNames: false,
    },
  },
};

<MultiDirectionTooltip
  config={richClickConfig}
  trigger={<button>Click Me (Bottom)</button>}
/>;
```

### All Placements, Hover vs Click, Custom Offsets

```tsx
const allPlacementsConfig = {
  [PopupPlacement.TOP]: {
    [PopupType.HOVER]: { element: "Top Hover", offset: 8 },
    [PopupType.CLICK]: { element: "Top Click", offset: 8 },
  },
  [PopupPlacement.BOTTOM]: {
    [PopupType.HOVER]: { element: "Bottom Hover", offset: 12 },
    [PopupType.CLICK]: { element: "Bottom Click", offset: 12 },
  },
  [PopupPlacement.LEFT]: {
    [PopupType.HOVER]: { element: "Left Hover", offset: 10 },
  },
  [PopupPlacement.RIGHT]: {
    [PopupType.CLICK]: { element: "Right Click", offset: 10 },
  },
};
```

---

## 🎨 Configuration Options

- **Placement**: Choose direction (`TOP`, `BOTTOM`, `LEFT`, `RIGHT`).
- **Type**: Hover or Click.
- **Delays**: `openDelay`, `closeDelay` for hover tooltips.
- **Offset**: Space between trigger and tooltip.
- **Custom Content**: Pass React nodes or render functions.
- **Class Names**: Use `applyDefaultClassNames` to enable/disable default styling.

---

## ♿ Accessibility Features

- **ARIA attributes**: `aria-describedby`, `role="tooltip"`
- **Keyboard navigation**: ESC to close, tabIndex for focus
- **Screen reader friendly**: Proper semantic markup
- **Focus management**: Handles focus for interactive content
- **High contrast support**: Works with accessibility themes

---

## ⚡ Performance Considerations

- **Memoized components**: Uses `useMemo` and `useCallback` for optimal rendering
- **Conditional rendering**: Only renders tooltip when open (via `AnimatePresence`)
- **Minimal DOM updates**: Efficient event listeners and state management
- **Code quality**: Strict TypeScript and Biome linting
- **Bundle optimization**: Tree-shaking and code splitting

---

## 🛠️ Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint
bun run type-check   # TypeScript type checking

# Package management
bun install          # Install dependencies
bun add <package>    # Add new dependency
bun remove <package> # Remove dependency
```

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Biome**: Fast formatter and linter
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (via Biome)

### Testing

```bash
# Run tests (if configured)
bun test

# Run tests in watch mode
bun test --watch
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React** team for the amazing framework
- **Vite** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **shadcn/ui** for beautiful UI components
- **Bun** for the fast JavaScript runtime and package manager

---

## 📞 Support

If you have any questions or need help:

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Documentation**: Check this README and inline code comments

---

**Made with ❤️ using modern web technologies**
